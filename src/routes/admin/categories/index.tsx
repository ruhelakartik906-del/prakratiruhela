import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { getCategories } from '@/lib/admin.functions';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2 } from 'lucide-react';

export const Route = createFileRoute('/admin/categories/')({
  component: AdminCategories,
});

function AdminCategories() {
  const { data: categories, isLoading } = useQuery({
    queryKey: ['adminCategories'],
    queryFn: () => getCategories(),
  });

  if (isLoading) return <div className="p-8 text-center text-[#3B2922]/60">Loading categories...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#3B2922]">Categories</h2>
        <Button className="bg-[#087F6D] hover:bg-[#066657]">
          <Plus className="w-4 h-4 mr-2" /> Add Category
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories?.map((category: any) => (
          <div key={category.id} className="bg-white p-4 rounded-xl border border-[#3B2922]/10 flex items-center justify-between shadow-sm">
            <div>
              <h3 className="font-bold text-[#3B2922]">{category.name}</h3>
              <p className="text-sm text-[#3B2922]/60">/{category.slug}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600 hover:bg-blue-50">
                <Edit className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600 hover:bg-red-50">
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
