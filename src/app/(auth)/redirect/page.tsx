import { redirect } from "next/navigation";

export default function Redirect() {
  //Debido a que hasta donde se no se puede enviar más de una respuesta
  //en un mismo middleware, el middleware se encarga de setear las cookies
  // de acceso y esta page se encarga unicamente de redireccionar redirecciona
  redirect("/app");
}
