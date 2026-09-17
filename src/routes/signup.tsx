import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { Keyboard, Eye, EyeOff, Loader2, Sparkles } from "lucide-react";
import { useState } from "react";
import { GlassCard } from "@/components/kit/GlassCard";
import { useAuth } from "@/lib/auth";
import { useLanguage } from "@/lib/useLanguage";

export const Route = createFileRoute("/signup")({
  component: SignupPage,
});

function SignupPage() {
  const { isEnglish } = useLanguage();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim() || !email.trim() || !password.trim()) {
      setError("Please fill out all fields.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsLoading(true);

    try {
      const result = await signup(name, email, password);

      if (result.error) {
        setError(result.error);
        setIsLoading(false);
      } else {
        // Successful signup -> Home
        navigate({ to: "/" });
      }
    } catch (err) {
      setError("An unexpected error occurred.");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center p-4">
      <GlassCard className="w-full max-w-md p-8 sm:p-10 text-center animate-rise-in">
        <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 text-primary">
          <Sparkles className="size-8" />
        </div>
        <h1 className="mb-2 text-2xl font-bold tracking-tight text-foreground">
          {isEnglish ? "Create an Account" : "खाता बनाएं"}
        </h1>
        <p className="mb-8 font-hindi text-muted-foreground">{isEnglish ? "Create a new account" : "नया खाता बनाएँ"}</p>

        {error && (
          <div className="mb-6 rounded-xl bg-danger/10 px-4 py-3 text-sm font-medium text-danger text-left">
            {error}
          </div>
        )}

        <form onSubmit={handleSignup} className="flex flex-col gap-4 text-left">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground ml-1">{isEnglish ? "Display Name" : "पूरा नाम"}</label>
            <input
              type="text"
              placeholder={isEnglish ? "e.g. Rahul" : "उदाहरण: राहुल"}
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-input bg-background/50 px-4 py-3 text-lg font-medium text-foreground outline-none transition-all placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground ml-1">{isEnglish ? "Email" : "ईमेल"}</label>
            <input
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-input bg-background/50 px-4 py-3 text-lg font-medium text-foreground outline-none transition-all placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="space-y-1.5 relative">
            <label className="text-sm font-medium text-foreground ml-1">{isEnglish ? "Password" : "पासवर्ड"}</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder={isEnglish ? "Create a password" : "पासवर्ड बनाएं"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-input bg-background/50 px-4 py-3 pr-12 text-lg font-medium text-foreground outline-none transition-all placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
              >
                {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
              </button>
            </div>
          </div>

          <div className="space-y-1.5 relative">
            <label className="text-sm font-medium text-foreground ml-1">{isEnglish ? "Confirm Password" : "पासवर्ड की पुष्टि करें"}</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder={isEnglish ? "Confirm your password" : "पासवर्ड की पुष्टि करें"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full rounded-xl border border-input bg-background/50 px-4 py-3 text-lg font-medium text-foreground outline-none transition-all placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={!name.trim() || !email.trim() || !password.trim() || isLoading}
            className="w-full mt-4 flex justify-center items-center rounded-xl px-4 py-3 font-semibold text-primary-foreground shadow-sm transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            style={{ background: "var(--gradient-primary)" }}
          >
            {isLoading ? <Loader2 className="size-5 animate-spin" /> : isEnglish ? "Create Account" : "खाता बनाएं"}
          </button>

          <p className="mt-4 text-center text-sm text-muted-foreground">
            {isEnglish ? "Already have an account? " : "क्या आपके पास पहले से खाता है? "}
            <Link to="/login" className="font-semibold text-primary hover:underline">
              {isEnglish ? "Log in" : "लॉगिन"}
            </Link>
          </p>
        </form>
      </GlassCard>
    </div>
  );
}
