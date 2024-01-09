import { GoogleOAuthProvider } from "@react-oauth/google";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <GoogleOAuthProvider clientId={`${process.env.GOOGLE_CLIENT_ID}`}>
        {children}
      </GoogleOAuthProvider>
    </div>
  );
}
