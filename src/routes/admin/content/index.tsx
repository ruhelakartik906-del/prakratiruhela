import { createFileRoute } from '@tanstack/react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getSiteContent, updateSiteContent } from '@/lib/admin.functions';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

export const Route = createFileRoute('/admin/content/')({
  component: AdminContent,
});

function AdminContent() {
  const queryClient = useQueryClient();
  const { data: content, isLoading } = useQuery({
    queryKey: ['adminContent'],
    queryFn: () => getSiteContent(),
  });

  const mutation = useMutation({
    mutationFn: (data: { id: string; content_value: string }) => updateSiteContent({ data }),
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
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold text-[#3B2922]">
                  {item.content_key.split('_').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                </CardTitle>
                <span className="text-[10px] font-mono text-[#3B2922]/40 bg-[#3B2922]/5 px-2 py-0.5 rounded">
                  {item.section}
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-xs text-[#3B2922]/60 uppercase tracking-wider">Content Value</Label>
                {item.content_value && item.content_value.length > 80 ? (
                  <Textarea 
                    defaultValue={item.content_value} 
                    className="min-h-[100px] border-[#3B2922]/10 focus-visible:ring-[#087F6D]"
                    onBlur={(e) => {
                      if (e.target.value !== item.content_value) {
                        mutation.mutate({ id: item.id, content_value: e.target.value });
                      }
                    }}
                  />
                ) : (
                  <Input 
                    defaultValue={item.content_value || ''} 
                    className="border-[#3B2922]/10 focus-visible:ring-[#087F6D]"
                    onBlur={(e) => {
                      if (e.target.value !== item.content_value) {
                        mutation.mutate({ id: item.id, content_value: e.target.value });
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
