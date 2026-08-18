import { createFileRoute } from '@tanstack/react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getSiteContent, updateSiteContent } from '@/lib/admin.functions';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

export const Route = createFileRoute('/admin/content')({
  component: AdminContent,
});

function AdminContent() {
  const queryClient = useQueryClient();
  const { data: content, isLoading } = useQuery({
    queryKey: ['adminContent'],
    queryFn: () => getSiteContent(),
  });

  const mutation = useMutation({
    mutationFn: updateSiteContent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminContent'] });
      toast.success('Content updated');
    },
  });

  if (isLoading) return <div className="p-8 text-center text-[#3B2922]/60">Loading content...</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[#3B2922]">Website Content</h2>
      
      <div className="grid grid-cols-1 gap-6">
        {content?.map((item: any) => (
          <Card key={item.id} className="border-[#3B2922]/10">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-[#3B2922]">{item.key}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Content Value</Label>
                {typeof item.value === 'string' && item.value.length > 100 ? (
                  <Textarea 
                    defaultValue={item.value} 
                    className="min-h-[120px]"
                    onBlur={(e) => {
                      if (e.target.value !== item.value) {
                        mutation.mutate({ id: item.id, value: e.target.value });
                      }
                    }}
                  />
                ) : (
                  <Input 
                    defaultValue={typeof item.value === 'string' ? item.value : JSON.stringify(item.value)} 
                    onBlur={(e) => {
                      if (e.target.value !== (typeof item.value === 'string' ? item.value : JSON.stringify(item.value))) {
                        let value = e.target.value;
                        try {
                          if (typeof item.value !== 'string') value = JSON.parse(e.target.value);
                        } catch (e) {}
                        mutation.mutate({ id: item.id, value });
                      }
                    }}
                  />
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
