// High-level auth route that mounts the
// animated sign-up experience defined in AuthComponent.

import { useState } from "react";
import { AuthComponent } from "@/components/ui/sign-up";

export default function AuthPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleGoogleSignIn() {
    setError(null);
    setLoading(true);
    try {
      // Hook your real auth provider here (Supabase, Auth0, Firebase, etc.)
      setError("Sign-in is not configured.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthComponent
      // Use the built-in default logo and brandName from AuthComponent
      logo={undefined}
      brandName={undefined}
      hideTopBar
      onGoogleLogin={handleGoogleSignIn}
      onGoogleSignUp={handleGoogleSignIn}
      loading={loading}
      error={error}
    />
  );
}

