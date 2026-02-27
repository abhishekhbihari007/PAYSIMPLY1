import { useState } from "react";
import { AuthComponent } from "@/components/ui/sign-up";
import { useNavigate } from "react-router-dom";

export default function AuthPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  async function handleGoogleSignIn() {
    setError(null);
    setLoading(true);
    try {
      // TODO: Hook your real auth provider here (Supabase, Auth0, Firebase, etc.)
      await new Promise((r) => setTimeout(r, 1500));
      setError("Authentication coming soon! We're launching shortly.");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthComponent
      onGoogleLogin={handleGoogleSignIn}
      onGoogleSignUp={handleGoogleSignIn}
      loading={loading}
      error={error}
    />
  );
}
