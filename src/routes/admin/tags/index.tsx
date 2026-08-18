import { createFileRoute } from '@tanstack/react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getTags, upsertTag, deleteTag } from '@/lib/admin.functions';
import { Button } from '@/components/ui/button';
import { Plus, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

export const Route = createFileRoute('/admin/tags/')({
  component: AdminTags,
});

function AdminTags() {
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [tagName, setTagName] = useState('');

  const { data: tags, isLoading } = useQuery({
    queryKey: ['adminTags'],
    queryFn: () => getTags(),
  });

  const upsertMutation = useMutation({
    mutationFn: (name: string) => {
      const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      return upsertTag({ data: { name, slug } });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminTags'] });
      setIsDialogOpen(false);
      setTagName('');
      toast.success('Tag added');
    },
    onError: (err: any) => toast.error(err.message),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteTag({ data: id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminTags'] });
      toast.success('Tag deleted');
    },
    onError: (err: any) => toast.error(err.message),
  });

  if (isLoading) return <div className="p-8 text-center text-[#3B2922]/60">Loading tags...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#3B2922]">Tags</h2>
        <Button onClick={() => setIsDialogOpen(true)} className="bg-[#087F6D] hover:bg-[#066657]">
          <Plus className="w-4 h-4 mr-2" /> Add Tag
        </Button>
      </div>

      <div className="bg-white p-6 rounded-xl border border-[#3B2922]/10 shadow-sm min-h-[200px]">
        <div className="flex flex-wrap gap-2">
          {tags?.map((tag: any) => (
            <Badge 
              key={tag.id} 
              variant="secondary" 
              className="px-3 py-1.5 bg-[#FBF7F0] text-[#3B2922] border-[#3B2922]/10 flex items-center gap-2 hover:bg-[#F5EFE6]"
            >
              {tag.name}
              <button 
                className="hover:text-red-500"
                onClick={() => {
                  if (confirm('Delete this tag?')) {
                    deleteMutation.mutate(tag.id);
                  }
                }}
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
          {tags?.length === 0 && (
            <p className="text-[#3B2922]/60 italic">No tags created yet.</p>
          )}
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Tag</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Label>Tag Name</Label>
            <Input 
              value={tagName} 
              onChange={(e) => setTagName(e.target.value)} 
              placeholder="e.g., Handmade" 
              onKeyDown={(e) => e.key === 'Enter' && upsertMutation.mutate(tagName)}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button 
              className="bg-[#087F6D] hover:bg-[#066657]"
              onClick={() => upsertMutation.mutate(tagName)}
              disabled={upsertMutation.isPending || !tagName}
            >
              Add Tag
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
