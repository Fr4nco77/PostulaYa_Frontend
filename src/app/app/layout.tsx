import SideNavbar from "@/components/sidebar/sidebar";
import ListItems from "@/components/sidebar/listItems";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-screen">
      <SideNavbar className="h-full w-auto">
        <ListItems />
      </SideNavbar>
      <main>{children}</main>
    </div>
  );
}
