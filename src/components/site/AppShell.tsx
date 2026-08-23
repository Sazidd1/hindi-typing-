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
import { cn } from "@/lib/utils";

const LAYOUTS = [
  "Hindi Remington GAIL",
  "Hindi Remington CBI",
  "Kruti Dev",
  "Mangal InScript",
  "English"
];

const navItems = [
  { to: "/", label: "Home" },
  { isLayoutSelector: true, label: "Typing Tutor" },
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
      className="inline-flex size-9 items-center justify-center rounded-xl bg-secondary/60 dark:bg-white/[0.04] border border-border/60 dark:border-white/[0.08] text-foreground transition-all duration-200 hover:bg-secondary dark:hover:bg-white/[0.08] hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <span className="text-base leading-none select-none" aria-hidden="true">
        {theme === "dark" ? "☀️" : "🌙"}
      </span>
    </button>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [layout, setLayout] = useState(() => {
    return typeof window !== "undefined" ? (localStorage.getItem("selected_layout") || "Hindi Remington GAIL") : "Hindi Remington GAIL";
  });
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLayoutSelect = (l: string) => {
    setLayout(l);
    if (typeof window !== "undefined") {
      localStorage.setItem("selected_layout", l);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate({ to: "/login" });
  };

  return (
    <div className="surface-grid min-h-screen">
      <header className="sticky top-0 z-50 border-b border-white/50 dark:border-white/[0.08] bg-white/60 dark:bg-[rgba(7,20,38,0.90)] backdrop-blur-xl shadow-sm">
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
              if (item.isLayoutSelector) {
                return (
                  <DropdownMenu key="layout-selector">
                    <DropdownMenuTrigger className="flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium text-muted-foreground transition-all duration-200 hover:bg-white/80 dark:hover:bg-white/10 outline-none data-[state=open]:bg-white/80 dark:data-[state=open]:bg-white/10">
                      <div className="flex items-center gap-1.5">
                        <span>{item.label}</span>
                      </div>
                      <ChevronDown className="size-4 opacity-50" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent 
                      align="start" 
                      className="w-[280px] rounded-[20px] p-2 bg-white/70 dark:bg-[rgba(17,31,53,0.96)] backdrop-blur-[20px] dark:backdrop-blur-[16px] border border-white/75 dark:border-[rgba(255,255,255,0.10)] shadow-[0_12px_35px_rgba(15,23,42,0.16)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.35)]"
                    >
                      <div className="px-3 py-2 text-[10px] font-bold text-muted-foreground dark:text-[#71839B] uppercase tracking-widest">
                        Keyboard Layout
                      </div>
                      {LAYOUTS.map((l) => (
                        <DropdownMenuItem 
                          key={l} 
                          onClick={() => handleLayoutSelect(l)}
                          className={cn(
                            "rounded-[14px] cursor-pointer py-2.5 px-3 transition-all duration-200 my-0.5 font-medium flex items-center justify-between",
                            layout === l 
                              ? "bg-[rgba(59,130,246,0.12)] dark:bg-[rgba(43,111,255,0.16)] text-[#2563eb] dark:text-[#5B8FFF]" 
                              : "text-foreground dark:text-[#A9B8CC] hover:bg-black/5 dark:hover:bg-[rgba(255,255,255,0.06)] focus:bg-black/5 dark:focus:bg-[rgba(255,255,255,0.06)]"
                          )}
                        >
                          {l}
                          {layout === l && <div className="size-2 rounded-full bg-[#2563eb] dark:bg-[#5B8FFF]" />}
                        </DropdownMenuItem>
                      ))}
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
                  inactiveProps={{ className: "text-muted-foreground dark:text-[#8EA0B8] hover:bg-white/80 dark:hover:bg-white/10 dark:hover:text-[#FFFFFF]" }}
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
                  className="hidden rounded-full border border-border dark:border-white/10 bg-white/80 dark:bg-[#1C304D] px-4 py-2 text-sm font-medium text-foreground dark:text-[#F4F7FB] transition-colors hover:bg-white dark:hover:bg-[#1C304D]/80 md:inline-flex items-center gap-2"
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
                if (item.isLayoutSelector) {
                  return (
                    <div key="layout-selector" className="flex flex-col mb-1">
                      <div className="px-3 py-2 text-sm font-semibold text-foreground/80">
                        {item.label}
                      </div>
                      <div className="flex flex-col ml-3 pl-3 border-l-2 border-border/50">
                        {LAYOUTS.map((l) => (
                           <button
                             key={l}
                             onClick={() => { handleLayoutSelect(l); setOpen(false); }}
                             className={cn(
                               "text-left rounded-lg px-3 py-2.5 text-sm font-medium transition-colors mb-0.5 flex items-center justify-between", 
                               layout === l 
                                 ? "text-[#2563eb] bg-[rgba(59,130,246,0.1)]" 
                                 : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                             )}
                           >
                             {l}
                             {layout === l && <div className="size-1.5 rounded-full bg-[#2563eb]" />}
                           </button>
                        ))}
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
