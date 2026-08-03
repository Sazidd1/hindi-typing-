import { Link } from "@tanstack/react-router";
import { Keyboard, Menu, X } from "lucide-react";
import { useState, type ReactNode } from "react";
import { useAuth } from "@/lib/auth";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/practice", label: "Practice" },
  { to: "/lessons", label: "Lessons" },
  { to: "/speed-test", label: "Speed Test" },
  { to: "/accuracy-test", label: "Accuracy Test" },
  { to: "/leaderboard", label: "Leaderboard" },
  { to: "/dashboard", label: "Dashboard" },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const { currentUser, logout } = useAuth();

  return (
    <div className="surface-grid min-h-screen">
      <header className="sticky top-0 z-50 border-b border-white/50 bg-white/60 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3">
          <Link to="/" className="flex items-center gap-2.5">
            <span
              className="flex size-10 items-center justify-center rounded-xl text-primary-foreground"
              style={{ background: "var(--gradient-primary)" }}
            >
              <Keyboard className="size-5" />
            </span>
            <span className="leading-tight">
              <span className="block font-hindi text-base font-semibold text-foreground">
                हिंदी टाइपिंग
              </span>
              <span className="block text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
                Abhyas Studio
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                activeProps={{ className: "bg-primary text-primary-foreground" }}
                inactiveProps={{ className: "text-muted-foreground hover:bg-white/80" }}
                className="rounded-full px-3.5 py-2 text-sm font-medium transition-all duration-200"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {currentUser ? (
              <>
                <Link
                  to="/profile"
                  className="hidden rounded-full border border-border bg-white/80 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-white md:inline-flex items-center gap-2"
                >
                  <span className="flex size-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground font-bold uppercase">
                    {currentUser[0]}
                  </span>
                  Profile
                </Link>
                <button
                  onClick={logout}
                  className="hidden rounded-full px-4 py-2 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105 md:inline-flex"
                  style={{ background: "var(--gradient-primary)" }}
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="hidden rounded-full px-5 py-2 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105 md:inline-flex"
                style={{ background: "var(--gradient-primary)" }}
              >
                Login
              </Link>
            )}
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle navigation"
              className="inline-flex size-10 items-center justify-center rounded-xl bg-white/80 text-foreground lg:hidden"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        {open ? (
          <div className="animate-rise-in border-t border-white/50 bg-white/85 px-5 py-3 lg:hidden">
            <div className="flex flex-col">
              {[
                ...navItems,
                ...(currentUser
                  ? [
                      { to: "/profile" as const, label: "Profile" },
                    ]
                  : [{ to: "/login" as const, label: "Login" }]),
              ].map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-foreground hover:bg-accent"
                >
                  {item.label}
                </Link>
              ))}
              {currentUser && (
                <button
                  onClick={() => {
                    logout();
                    setOpen(false);
                  }}
                  className="rounded-lg px-3 py-2.5 text-left text-sm font-medium text-red-600 hover:bg-red-50"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        ) : null}
      </header>

      <main className="mx-auto max-w-7xl px-5 py-10">{children}</main>

      <footer className="border-t border-white/50 bg-white/60 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-8 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p className="font-hindi">हिंदी टाइपिंग अभ्यास — रोज़ अभ्यास, तेज़ प्रगति।</p>
          <div className="flex items-center gap-4">
            <p>© {new Date().getFullYear()} Abhyas Studio. Remington (GAIL) layout.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
