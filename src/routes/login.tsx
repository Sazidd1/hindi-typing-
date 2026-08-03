import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Keyboard } from "lucide-react";
import { useState } from "react";
import { GlassCard } from "@/components/kit/GlassCard";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  const [name, setName] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      login(name);
      navigate({ to: "/lessons" });
    }
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <GlassCard className="w-full max-w-md p-8 sm:p-10 text-center">
        <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 text-primary">
          <Keyboard className="size-8" />
        </div>
        <h1 className="mb-2 text-2xl font-bold tracking-tight text-foreground">
          Welcome to Abhyas
        </h1>
        <p className="mb-8 font-hindi text-muted-foreground">
          कृपया अपना नाम दर्ज करें
        </p>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Enter Name..."
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl border border-input bg-background/50 px-4 py-3 text-center text-lg font-medium text-foreground outline-none transition-all placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
          <button
            type="submit"
            disabled={!name.trim()}
            className="w-full rounded-xl px-4 py-3 font-semibold text-primary-foreground shadow-sm transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            style={{ background: "var(--gradient-primary)" }}
          >
            Login
          </button>
        </form>
      </GlassCard>
    </div>
  );
}
