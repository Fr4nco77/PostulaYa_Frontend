import Item from "./item";
import {
  BarChart,
  Book,
  MessageSquare,
  Newspaper,
  Rocket,
  StickyNote,
} from "lucide-react";

export default function ListItems() {
  return (
    <>
      <Item icon={<BarChart />} text="Dashboard" to="/app" />
      <Item icon={<Book />} text="Bitácora" to="/app/book" />
      <Item icon={<StickyNote />} text="Notas" to="/app/notes" />
      <Item icon={<Newspaper />} text="Vacantes" to="/app/applications" />
      <Item icon={<MessageSquare />} text="Entrevistas" to="/app/interviews" />
      <Item icon={<Rocket />} text="Apóyanos" to="/app/feedback" />
    </>
  );
}
