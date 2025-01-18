
import Sidebar from '@/components/Sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen flex flex-shrink-0 flex-row justify-start ">
      <Sidebar />
      <div className="flex-1 overflow-y-auto p-4">{children}</div>
    </div>
  );
}

