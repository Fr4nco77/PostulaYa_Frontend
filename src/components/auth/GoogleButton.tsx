// "use client";
import { useGoogleLogin } from "@react-oauth/google";
import { Button } from "@/components/ui/button";
import GoogleLogo from "./GoogleLogo";
import { cn } from "@/lib/utils";


interface ButtonProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function GoogleButton({
  className,
  ...props
}: ButtonProps) {
  // const router = useRouter();

  // const googleLogin = useGoogleLogin({
  // onSuccess: async ({ code }) => {
  //   //en caso de exito hace la peticion
  //   try {
  //     const response = await fetch(
  //       `${process.env.NEXT_PUBLIC_BACKEND}/user/authenticateByGoogle`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({code}),
  //       },
  //     );
  //     const { success, data } = await response.json();
  //     //maneja la respuesta
  //     if (success) {
  //       toast.success(data.message, {
  //         duration: 3000,
  //         position: "top-center",
  //       });

  //       localStorage.setItem("authorization", data.response);
  //       setTimeout(() => router.push("/"), 3000);
  //     } else {
  //       toast.error(data.name, {
  //         description: data.message,
  //         position: "top-center",
  //       });
  //     }
  //   } catch (error) {
  //     toast.error("INTERNAL ERROR", {
  //       description:
  //         "Ha ocurrido un error. Por favor, inténtalo nuevamente. Si el problema persiste, comunícate con el administrador.",
  //       position: "top-center",
  //     });
  //   }
  // },
  // onError: (err) => {
  //   //en caso de error se lo hace saber al usuario
  //   toast.error(err.name, {
  //     description: err.message,
  //     position: "top-center",
  //   });
  // },
  // flow: "auth-code",
  // });

  return (
    <div className={cn(className)} {...props}>
      <Button variant="outline" type="button" className="border-slate-600">
        <GoogleLogo/>
        <span className="ml-2">Continue whith Google</span>
      </Button>
    </div>
  );
}
