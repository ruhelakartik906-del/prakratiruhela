import { createFileRoute } from '@tanstack/react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getProducts, deleteProduct, getCategories, getTags, upsertProduct } from '@/lib/admin.functions';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Edit, Trash2, Package, X, Loader2, Upload } from 'lucide-react';
import { toast } from 'sonner';
import { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';

export const Route = createFileRoute('/admin/products/')({
  component: AdminProducts,
});

function AdminProducts() {
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: products, isLoading } = useQuery({
    queryKey: ['adminProducts'],
    queryFn: () => getProducts(),
  });

  const { data: categories } = useQuery({
    queryKey: ['adminCategories'],
    queryFn: () => getCategories(),
  });

  const { data: tags } = useQuery({
    queryKey: ['adminTags'],
    queryFn: () => getTags(),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteProduct({ data: id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminProducts'] });
      toast.success('Product deleted');
    },
    onError: (err: any) => toast.error(err.message),
  });

  const upsertMutation = useMutation({
    mutationFn: (data: any) => upsertProduct({ data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminProducts'] });
      setIsDialogOpen(false);
      setEditingProduct(null);
      toast.success(editingProduct ? 'Product updated' : 'Product created');
    },
    onError: (err: any) => toast.error(err.message),
  });

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `products/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('website-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('website-images')
        .getPublicUrl(filePath);

      setEditingProduct({ ...editingProduct, image_url: publicUrl });
      toast.success('Image uploaded');
    } catch (error: any) {
      toast.error('Upload failed: ' + error.message);
    } finally {
      setIsUploading(false);
    }
  };

  const openAddDialog = () => {
    setEditingProduct({
      name: '',
      description: '',
      price: 0,
      category_id: '',
      active: true,
      bestseller: false,
      tag_ids: [],
    });
    setIsDialogOpen(true);
  };

  const openEditDialog = (product: any) => {
    setEditingProduct({
      ...product,
      tag_ids: product.tags?.map((t: any) => t.tag?.id || t.id).filter(Boolean) || [],
    });
    setIsDialogOpen(true);
  };

  if (isLoading) return <div className="p-8 text-center text-[#3B2922]/60">Loading products...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#3B2922]">Products</h2>
        <Button onClick={openAddDialog} className="bg-[#087F6D] hover:bg-[#066657]">
          <Plus className="w-4 h-4 mr-2" /> Add Product
        </Button>
      </div>

      <div className="bg-white rounded-xl border border-[#3B2922]/10 overflow-hidden shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 hover:bg-gray-50 border-b border-[#3B2922]/10">
              <TableHead className="w-[80px]">Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products?.map((product: any) => (
              <TableRow key={product.id} className="border-b border-[#3B2922]/5 last:border-0">
                <TableCell>
                  {product.image_url ? (
                    <img src={product.image_url} alt={product.name} className="w-10 h-10 rounded-md object-cover border border-gray-100" />
                  ) : (
                    <div className="w-10 h-10 rounded-md bg-gray-100 flex items-center justify-center">
                      <Package className="w-5 h-5 text-gray-400" />
                    </div>
                  )}
                </TableCell>
                <TableCell className="font-medium text-[#3B2922]">
                  {product.name}
                  {product.bestseller && (
                    <Badge variant="secondary" className="ml-2 bg-orange-100 text-orange-700 hover:bg-orange-100 text-[10px] py-0">Best</Badge>
                  )}
                </TableCell>
                <TableCell className="text-[#3B2922]/70">{product.category?.name || 'Uncategorized'}</TableCell>
                <TableCell className="font-semibold text-[#3B2922]">₹{product.price}</TableCell>
                <TableCell>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    product.active !== false ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {product.active !== false ? 'Active' : 'Inactive'}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="h-8 w-8 text-blue-600 border-blue-100 hover:bg-blue-50"
                      onClick={() => openEditDialog(product)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="h-8 w-8 text-red-600 border-red-100 hover:bg-red-50"
                      onClick={() => {
                        if (confirm('Are you sure you want to delete this product?')) {
                          deleteMutation.mutate(product.id);
                        }
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingProduct?.id ? 'Edit Product' : 'Add New Product'}</DialogTitle>
          </DialogHeader>
          
          {editingProduct && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Product Name</Label>
                  <Input 
                    id="name" 
                    value={editingProduct.name} 
                    onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="price">Price (₹)</Label>
                  <Input 
                    id="price" 
                    type="number" 
                    value={editingProduct.price} 
                    onChange={(e) => setEditingProduct({...editingProduct, price: parseFloat(e.target.value)})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select 
                    value={editingProduct.category_id || "none"} 
                    onValueChange={(val) => setEditingProduct({...editingProduct, category_id: val === "none" ? null : val})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      {categories?.map((cat: any) => (
                        <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="space-y-0.5">
                    <Label>Active Status</Label>
                    <p className="text-xs text-muted-foreground">Visible on public site</p>
                  </div>
                  <Switch 
                    checked={editingProduct.active !== false} 
                    onCheckedChange={(checked) => setEditingProduct({...editingProduct, active: checked})}
                  />
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="space-y-0.5">
                    <Label>Bestseller</Label>
                    <p className="text-xs text-muted-foreground">Show bestseller badge</p>
                  </div>
                  <Switch 
                    checked={editingProduct.bestseller === true} 
                    onCheckedChange={(checked) => setEditingProduct({...editingProduct, bestseller: checked})}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Product Image</Label>
                  <div 
                    className="aspect-square w-full rounded-lg border-2 border-dashed border-gray-200 flex flex-col items-center justify-center relative overflow-hidden group cursor-pointer hover:border-[#087F6D]/50 transition-colors"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {editingProduct.image_url ? (
                      <>
                        <img src={editingProduct.image_url} alt="Preview" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                          <Upload className="w-8 h-8 text-white" />
                        </div>
                      </>
                    ) : (
                      <div className="text-center p-4">
                        {isUploading ? <Loader2 className="w-8 h-8 mx-auto animate-spin text-[#087F6D]" /> : <Plus className="w-8 h-8 mx-auto text-gray-400" />}
                        <p className="mt-2 text-sm text-gray-500">Click to upload image</p>
                      </div>
                    )}
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      className="hidden" 
                      accept="image/*" 
                      onChange={handleFileUpload}
                      disabled={isUploading}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="desc">Description</Label>
                  <Textarea 
                    id="desc" 
                    rows={4}
                    value={editingProduct.description || ''} 
                    onChange={(e) => setEditingProduct({...editingProduct, description: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Tags</Label>
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {editingProduct.tag_ids?.map((tagId: string) => {
                      const tag = (tags as any[])?.find((t: any) => t.id === tagId);
                      return tag ? (
                        <Badge key={tagId} variant="secondary" className="flex items-center gap-1">
                          {tag.name}
                          <X 
                            className="w-3 h-3 cursor-pointer hover:text-red-500" 
                            onClick={() => setEditingProduct({
                              ...editingProduct, 
                              tag_ids: editingProduct.tag_ids.filter((id: string) => id !== tagId)
                            })}
                          />
                        </Badge>
                      ) : null;
                    })}
                  </div>
                  <Select onValueChange={(val) => {
                    if (!editingProduct.tag_ids.includes(val)) {
                      setEditingProduct({
                        ...editingProduct,
                        tag_ids: [...editingProduct.tag_ids, val]
                      });
                    }
                  }}>
                    <SelectTrigger>
                      <SelectValue placeholder="Add Tag" />
                    </SelectTrigger>
                    <SelectContent>
                      {tags?.filter((t: any) => !editingProduct.tag_ids.includes(t.id)).map((tag: any) => (
                        <SelectItem key={tag.id} value={tag.id}>{tag.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button 
              className="bg-[#087F6D] hover:bg-[#066657]"
              onClick={() => upsertMutation.mutate(editingProduct)}
              disabled={upsertMutation.isPending || isUploading}
            >
              {upsertMutation.isPending ? 'Saving...' : 'Save Product'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
