import SideNavbar from "@/components/sidebar/sidebar";
import ListItems from "@/components/sidebar/listItems";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen w-screen lg:flex">
      <SideNavbar className="h-auto w-full lg:h-full lg:w-auto">
        <ListItems />
      </SideNavbar>
      <div className="flex h-auto w-full items-center justify-center p-5 lg:h-full">
        {children}
      </div>
    </div>
  );
}
