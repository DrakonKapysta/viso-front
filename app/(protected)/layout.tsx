import Navigation from "@/components/Navigation";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-red-50">
      <Navigation />
      <main>{children}</main>
    </div>
  );
}
