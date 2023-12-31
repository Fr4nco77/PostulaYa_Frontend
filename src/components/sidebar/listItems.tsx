import Item from "./item";
import { BarChart, Bird, Book, Rocket, User } from "lucide-react";

export default function ListItems() {
  return (
    <>
      <Item icon={<BarChart />} text="Dashboard" to="/app" />
      <Item icon={<Book />} text="Bitacora" to="/app/book" />
      <Item icon={<User />} text="Perfil" to="/app/user" />
      <Item icon={<Rocket />} text="Sugerencias" to="/app/feedback" />
      <Item icon={<Bird />} text="Nosotros" to="/app/about" />
    </>
  );
}
