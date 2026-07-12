import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function FleetManagerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar />
        <main className="flex-1 px-4 py-6 lg:px-8 lg:py-8 max-w-[1400px] w-full mx-auto">{children}</main>
      </div>
    </div>
  );
}
