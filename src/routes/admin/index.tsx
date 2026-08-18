import { createFileRoute } from '@tanstack/react-router';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, Tags, Layers } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getAdminStats } from '@/lib/admin.functions';

export const Route = createFileRoute('/admin/')({
  component: AdminDashboard,
});

function AdminDashboard() {
  const { data, isLoading } = useQuery({
    queryKey: ['adminStats'],
    queryFn: () => getAdminStats(),
  });

  if (isLoading) return <div className="p-8 text-center text-[#3B2922]/60">Loading dashboard...</div>;

  const stats = [
    { title: 'Total Products', value: data?.productsCount || 0, icon: Package },
    { title: 'Total Categories', value: data?.categoriesCount || 0, icon: Layers },
    { title: 'Total Tags', value: data?.tagsCount || 0, icon: Tags },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[#3B2922]">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="bg-white border-[#3B2922]/10 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#3B2922]/70">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-[#C94F32]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#3B2922]">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
