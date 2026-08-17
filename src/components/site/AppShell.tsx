import { Link, useNavigate } from "@tanstack/react-router";
import { Keyboard, Menu, X, ChevronDown } from "lucide-react";
import { useState, type ReactNode } from "react";
import { useAuth } from "@/lib/auth";
import { useTheme } from "@/lib/theme";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navItems = [
  { to: "/", label: "Home" },
  {
    label: "Typing Tutor",
    dropdown: [
      { to: "/lessons", label: "Hindi Typing — Remington GAIL" },
      { label: "Hindi Typing — Remington CBI", disabled: true },
      { label: "Hindi Typing — KrutiDev", disabled: true },
      { label: "Hindi Typing — Mangal Inscript", disabled: true },
      { label: "English Typing Tutor", disabled: true },
    ],
  },
  { to: "/lessons", label: "Lessons" },
  { to: "/leaderboard", label: "Leaderboard" },
  { to: "/dashboard", label: "Dashboard" },
];

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      aria-label={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
      title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
      className="inline-flex size-9 items-center justify-center rounded-xl bg-secondary/60 border border-border/60 text-foreground transition-all duration-200 hover:bg-secondary hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <span className="text-base leading-none select-none" aria-hidden="true">
        {theme === "dark" ? "☀️" : "🌙"}
      </span>
    </button>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate({ to: "/login" });
  };

  return (
    <div className="surface-grid min-h-screen">
      <header className="sticky top-0 z-50 border-b border-white/50 dark:border-white/8 bg-white/60 dark:bg-[oklch(0.20_0.035_260/0.85)] backdrop-blur-xl shadow-sm">
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
            {navItems.map((item) => {
              if (item.dropdown) {
                return (
                  <DropdownMenu key={item.label}>
                    <DropdownMenuTrigger className="flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium text-muted-foreground transition-all duration-200 hover:bg-white/80 dark:hover:bg-white/10 outline-none data-[state=open]:bg-white/80 dark:data-[state=open]:bg-white/10">
                      {item.label}
                      <ChevronDown className="size-4 opacity-50" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent 
                      align="start" 
                      className="w-[340px] rounded-[20px] border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.12)] p-1.5"
                      style={{
                        backgroundColor: "rgba(255, 255, 255, 0.65)",
                        backdropFilter: "blur(18px)",
                        WebkitBackdropFilter: "blur(18px)"
                      }}
                    >
                      {item.dropdown.map((subItem) => {
                        if (subItem.disabled) {
                          return (
                            <div
                              key={subItem.label}
                              className="flex items-center justify-between rounded-[14px] cursor-not-allowed py-2.5 px-3 text-slate-500 opacity-70 my-0.5 select-none"
                            >
                              <span className="font-medium">{subItem.label}</span>
                              <span className="text-[10px] font-bold bg-white/50 px-2 py-0.5 rounded-full uppercase tracking-widest text-slate-500 border border-white/40">Coming Soon</span>
                            </div>
                          );
                        }
                        return (
                          <DropdownMenuItem 
                            key={subItem.label} 
                            asChild 
                            className="rounded-[14px] cursor-pointer py-2.5 px-3 text-[#0f172a] transition-all duration-200 hover:bg-[rgba(14,165,233,0.10)] focus:bg-[rgba(14,165,233,0.10)] focus:text-[#0f172a] hover:text-[#0f172a] my-0.5"
                          >
                            <Link to={subItem.to!} className="w-full font-medium">
                              {subItem.label}
                            </Link>
                          </DropdownMenuItem>
                        );
                      })}
                    </DropdownMenuContent>
                  </DropdownMenu>
                );
              }

              return (
                <Link
                  key={item.to}
                  to={item.to!}
                  activeOptions={{ exact: item.to === "/" }}
                  activeProps={{ className: "bg-primary text-primary-foreground" }}
                  inactiveProps={{ className: "text-muted-foreground hover:bg-white/80 dark:hover:bg-white/10" }}
                  className="rounded-full px-3.5 py-2 text-sm font-medium transition-all duration-200"
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            {/* Global theme toggle — visible on all screen sizes */}
            <ThemeToggle />

            {currentUser ? (
              <>
                <Link
                  to="/profile"
                  className="hidden rounded-full border border-border bg-white/80 dark:bg-white/10 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-white dark:hover:bg-white/20 md:inline-flex items-center gap-2"
                >
                  <span className="flex size-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground font-bold uppercase">
                    {currentUser[0]}
                  </span>
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
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
              className="inline-flex size-10 items-center justify-center rounded-xl bg-white/80 dark:bg-white/10 text-foreground lg:hidden"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        {open ? (
          <div className="mobile-menu-overlay animate-rise-in border-t border-white/50 dark:border-white/8 bg-white/85 dark:bg-[oklch(0.18_0.03_260/0.95)] px-5 py-3 lg:hidden">
            <div className="flex flex-col">
              {navItems.map((item) => {
                if (item.dropdown) {
                  return (
                    <div key={item.label} className="flex flex-col mb-1">
                      <div className="px-3 py-2 text-sm font-semibold text-foreground/80">
                        {item.label}
                      </div>
                      <div className="flex flex-col ml-3 pl-3 border-l-2 border-border/50">
                        {item.dropdown.map((subItem) => {
                          if (subItem.disabled) {
                            return (
                              <div
                                key={subItem.label}
                                className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground opacity-60 cursor-not-allowed"
                              >
                                {subItem.label}
                                <span className="text-[9px] font-bold bg-secondary px-1.5 py-0.5 rounded-full uppercase tracking-widest">Coming Soon</span>
                              </div>
                            );
                          }
                          return (
                            <Link
                              key={subItem.label}
                              to={subItem.to!}
                              onClick={() => setOpen(false)}
                              className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors"
                            >
                              {subItem.label}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  );
                }
                return (
                  <Link
                    key={item.to}
                    to={item.to!}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors mb-1"
                  >
                    {item.label}
                  </Link>
                );
              })}
              {currentUser ? (
                <Link
                  to="/profile"
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors mb-1"
                >
                  Profile
                </Link>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors mb-1"
                >
                  Login
                </Link>
              )}
              {currentUser && (
                <button
                  onClick={async () => {
                    await handleLogout();
                    setOpen(false);
                  }}
                  className="rounded-lg px-3 py-2.5 text-left text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        ) : null}
      </header>

      <main className="mx-auto max-w-7xl px-5 py-10">{children}</main>

      <footer className="border-t border-white/50 dark:border-white/8 bg-white/60 dark:bg-[oklch(0.20_0.035_260/0.85)] backdrop-blur-xl">
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
