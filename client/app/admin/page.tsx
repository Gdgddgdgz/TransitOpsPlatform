import AdminLayout from "@/features/admin/shared/components/AdminLayout";
import DashboardView from "@/features/admin/dashboard/views/DashboardView";

export default function AdminDashboardPage() {
  return (
    <AdminLayout>
      <DashboardView />
    </AdminLayout>
  );
}
