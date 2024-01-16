import Item from "./item";
import { BarChart, Bird, Book, StickyNote } from "lucide-react";

export default function ListItems() {
  return (
    <>
      <Item icon={<BarChart />} text="Dashboard" to="/app" />
      <Item icon={<Book />} text="Bitacora" to="/app/book" />
      <Item icon={<StickyNote />} text="Notas" to="/app/notes" />
      {/* <Item icon={<Bird />} text="Nosotros" to="/app/about" /> */}
    </>
  );
}
