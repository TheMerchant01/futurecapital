import AdminNav from "../../components/admin/AdminNav/AdminNav";

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNav />
      <main className="pt-20 sm:pt-24 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
