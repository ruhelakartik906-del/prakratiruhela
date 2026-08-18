import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { getTags } from '@/lib/admin.functions';
import { Button } from '@/components/ui/button';
import { Plus, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const Route = createFileRoute('/admin/tags')({
  component: AdminTags,
});

function AdminTags() {
  const { data: tags, isLoading } = useQuery({
    queryKey: ['adminTags'],
    queryFn: () => getTags(),
  });

  if (isLoading) return <div className="p-8 text-center text-[#3B2922]/60">Loading tags...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#3B2922]">Tags</h2>
        <Button className="bg-[#087F6D] hover:bg-[#066657]">
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
              <button className="hover:text-red-500">
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
          {tags?.length === 0 && (
            <p className="text-[#3B2922]/60 italic">No tags created yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
