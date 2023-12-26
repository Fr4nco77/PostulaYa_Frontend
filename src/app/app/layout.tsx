import SideNavbar from "@/components/sidebar/sidebar";
import ListItems from "@/components/sidebar/listItems";
import { Toaster } from "@/components/ui/toaster";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SideNavbar>
          <ListItems />
        </SideNavbar>
        <main className="ml-[72px]">{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
