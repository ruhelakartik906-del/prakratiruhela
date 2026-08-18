import { createFileRoute, redirect, useRouter } from '@tanstack/react-router';
import { supabase } from '@/integrations/supabase/client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

export const Route = createFileRoute('/admin/login')({
  beforeLoad: async () => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (session && !error) {
        throw redirect({ to: '/admin' as any });
      }
    } catch (err) {
      if (err instanceof Error && (err as any).status === 307) throw err;
      // Continue to login if session fetch fails or is not a redirect
    }
  },
  component: AdminLogin,
});

function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      
      toast.success('Logged in successfully');
      router.navigate({ to: '/admin' as any });
    } catch (error: any) {
      toast.error(error.message || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FBF7F0] px-4">
      <Card className="w-full max-w-md border-[#3B2922]/10">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-[#3B2922]">Admin Login</CardTitle>
          <CardDescription>
            Enter your email and password to access the admin panel
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              type="submit" 
              className="w-full bg-[#087F6D] hover:bg-[#066657]" 
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
