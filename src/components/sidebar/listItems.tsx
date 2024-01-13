import Item from "./item";
import { BarChart, Bird, Book } from "lucide-react";

export default function ListItems() {
  return (
    <>
      <Item icon={<BarChart />} text="Dashboard" to="/app" />
      <Item icon={<Book />} text="Bitacora" to="/app/book" />
      {/* <Item icon={<Bird />} text="Nosotros" to="/app/about" /> */}
    </>
  );
}
