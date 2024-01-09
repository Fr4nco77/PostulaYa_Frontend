import SideNavbar from "@/components/sidebar/sidebar";
import ListItems from "@/components/sidebar/listItems";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen w-screen md:flex">
      <SideNavbar className="h-auto w-full md:h-full md:w-auto">
        <ListItems />
      </SideNavbar>
      <main>{children}</main>
    </div>
  );
}
