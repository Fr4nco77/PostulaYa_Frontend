import SideNavbar from "@/components/ui/sidebar/sidebar";
import ListItems from "@/components/ui/sidebar/listItems";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SideNavbar>
          <ListItems />
        </SideNavbar>
        <main>{children}</main>
      </body>
    </html>
  );
}
