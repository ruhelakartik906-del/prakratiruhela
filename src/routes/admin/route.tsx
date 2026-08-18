import { createFileRoute, Outlet, Link, redirect, useRouter } from '@tanstack/react-router';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, Package, Tags, Layers, FileText, LogOut, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';

export const Route = createFileRoute('/admin')({
  beforeLoad: async () => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error || !session) {
        throw redirect({ to: '/admin/login' as any });
      }
      return { session };
    } catch (err) {
      // TanStack redirect is an object with a status or special symbol
      if (err && typeof err === 'object' && ('status' in err || 'isRedirect' in err)) throw err;
      console.error('Admin Auth Error:', err);
      throw redirect({ to: '/admin/login' as any });
    }
  },
  component: AdminLayout,
});

function AdminLayout() {
  const router = useRouter();
  
  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success('Logged out successfully');
    router.navigate({ to: '/admin/login' as any });
  };

  const navItems = [
    { label: 'Dashboard', icon: LayoutDashboard, to: '/admin' },
    { label: 'Products', icon: Package, to: '/admin/products' },
    { label: 'Categories', icon: Layers, to: '/admin/categories' },
    { label: 'Tags', icon: Tags, to: '/admin/tags' },
    { label: 'Site Content', icon: FileText, to: '/admin/content' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-[#3B2922] text-white hidden md:flex flex-col">
        <div className="p-6">
          <h1 className="text-xl font-bold font-display">Admin Panel</h1>
          <p className="text-xs text-white/60 mt-1">Prakrati Ruhela</p>
        </div>
        
        <nav className="flex-1 px-4 py-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to as any}
              activeProps={{ className: "bg-white/10 text-white" }}
              inactiveProps={{ className: "text-white/70 hover:bg-white/5 hover:text-white" }}
              className="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm font-medium"
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10 space-y-2">
          <Link 
            to="/" 
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-white/70 hover:bg-white/5 hover:text-white text-sm font-medium transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            View Website
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-red-400 hover:bg-red-400/10 transition-colors text-sm font-medium"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile Header */}
        <header className="md:hidden bg-[#3B2922] text-white p-4 flex items-center justify-between">
          <h1 className="font-bold font-display">Admin</h1>
          <button onClick={handleLogout} className="text-red-400">
            <LogOut className="w-5 h-5" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
