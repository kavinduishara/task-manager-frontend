import TopBar from "@/components/TopBar";

export default function DashboardLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <TopBar />
      <div>
        {children}
      </div>
    </>
  );
}
