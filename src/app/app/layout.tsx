import SideNavbar from "@/components/sidebar/sidebar";
import ListItems from "@/components/sidebar/listItems";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen w-screen lg:flex bg-slate-100">
      <SideNavbar className="w-full lg:h-full lg:w-auto">
        <ListItems />
      </SideNavbar>
      <div className="flex w-full grow items-center justify-center p-5 lg:h-full lg:w-auto">
        {children}
      </div>
    </div>
  );
}
