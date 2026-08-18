import { createFileRoute } from '@tanstack/react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getCategories, upsertCategory, deleteCategory } from '@/lib/admin.functions';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2, Loader2, Upload } from 'lucide-react';
import { toast } from 'sonner';
import { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';

export const Route = createFileRoute('/admin/categories')({
  component: AdminCategories,
});

function AdminCategories() {
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: categories, isLoading } = useQuery({
    queryKey: ['adminCategories'],
    queryFn: () => getCategories(),
  });

  const upsertMutation = useMutation({
    mutationFn: (data: any) => upsertCategory({ data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminCategories'] });
      setIsDialogOpen(false);
      setEditingCategory(null);
      toast.success('Category saved');
    },
    onError: (err: any) => toast.error(err.message),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteCategory({ data: id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminCategories'] });
      toast.success('Category deleted');
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
      const filePath = `categories/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('website-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('website-images')
        .getPublicUrl(filePath);

      setEditingCategory({ ...editingCategory, image_url: publicUrl });
      toast.success('Image uploaded');
    } catch (error: any) {
      toast.error('Upload failed: ' + error.message);
    } finally {
      setIsUploading(false);
    }
  };

  const openAddDialog = () => {
    setEditingCategory({ name: '', slug: '', image_url: '' });
    setIsDialogOpen(true);
  };

  const openEditDialog = (category: any) => {
    setEditingCategory({ ...category });
    setIsDialogOpen(true);
  };

  if (isLoading) return <div className="p-8 text-center text-[#3B2922]/60">Loading categories...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#3B2922]">Categories</h2>
        <Button onClick={openAddDialog} className="bg-[#087F6D] hover:bg-[#066657]">
          <Plus className="w-4 h-4 mr-2" /> Add Category
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories?.map((category: any) => (
          <div key={category.id} className="bg-white p-4 rounded-xl border border-[#3B2922]/10 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-md bg-gray-100 overflow-hidden border border-gray-100">
                {category.image_url ? (
                  <img src={category.image_url} alt={category.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <Plus className="w-4 h-4" />
                  </div>
                )}
              </div>
              <div>
                <h3 className="font-bold text-[#3B2922]">{category.name}</h3>
                <p className="text-sm text-[#3B2922]/60">/{category.slug}</p>
              </div>
            </div>
            <div className="flex gap-1">
              <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600 hover:bg-blue-50" onClick={() => openEditDialog(category)}>
                <Edit className="w-4 h-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 text-red-600 hover:bg-red-50"
                onClick={() => {
                  if (confirm('Delete this category?')) {
                    deleteMutation.mutate(category.id);
                  }
                }}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingCategory?.id ? 'Edit Category' : 'Add Category'}</DialogTitle>
          </DialogHeader>
          
          {editingCategory && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Category Name</Label>
                <Input 
                  value={editingCategory.name} 
                  onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                  placeholder="e.g., Raksha Bandhan"
                />
              </div>
              <div className="space-y-2">
                <Label>Slug</Label>
                <Input 
                  value={editingCategory.slug} 
                  onChange={(e) => setEditingCategory({ ...editingCategory, slug: e.target.value })}
                  placeholder="e.g., raksha-bandhan"
                />
              </div>
              <div className="space-y-2">
                <Label>Image</Label>
                <div 
                  className="h-32 w-full rounded-lg border-2 border-dashed border-gray-200 flex flex-col items-center justify-center relative overflow-hidden group cursor-pointer hover:border-[#087F6D]/50 transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {editingCategory.image_url ? (
                    <img src={editingCategory.image_url} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-center">
                      {isUploading ? <Loader2 className="w-6 h-6 mx-auto animate-spin text-[#087F6D]" /> : <Upload className="w-6 h-6 mx-auto text-gray-400" />}
                      <p className="mt-1 text-xs text-gray-500">Upload Image</p>
                    </div>
                  )}
                  <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileUpload} />
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button 
              className="bg-[#087F6D] hover:bg-[#066657]"
              onClick={() => upsertMutation.mutate(editingCategory)}
              disabled={upsertMutation.isPending || isUploading}
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
