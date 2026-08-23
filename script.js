const fs = require('fs');
let code = fs.readFileSync('src/components/site/AppShell.tsx', 'utf8');

// 1. Add import
if (!code.includes('import { cn }')) {
  code = code.replace(
    'import { useTheme } from "@/lib/theme";',
    'import { useTheme } from "@/lib/theme";\nimport { cn } from "@/lib/utils";'
  );
}

// 2. Update navItems
const oldNavItems = \const navItems = [
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
];\;

const newNavItems = \const LAYOUTS = [
  "Hindi Remington GAIL",
  "Hindi Remington CBI",
  "Kruti Dev",
  "Mangal InScript",
  "English",
];

const navItems = [
  { to: "/", label: "Home" },
  { isLayoutSelector: true, label: "Typing Tutor" },
  { to: "/lessons", label: "Lessons" },
  { to: "/leaderboard", label: "Leaderboard" },
  { to: "/dashboard", label: "Dashboard" },
];\;

code = code.replace(oldNavItems, newNavItems);

// 3. Add state inside AppShell
const oldState = \export function AppShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();\;

const newState = \export function AppShell({ children }: { children: ReactNode }) {
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
  };\;

code = code.replace(oldState, newState);

// 4. Update Desktop Dropdown
const oldDesktopDropdown = \              if (item.dropdown) {
                return (
                  <DropdownMenu key={item.label}>
                    <DropdownMenuTrigger className="flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium text-muted-foreground transition-all duration-200 hover:bg-white/80 dark:hover:bg-white/10 outline-none data-[state=open]:bg-white/80 dark:data-[state=open]:bg-white/10">
                      {item.label}
                      <ChevronDown className="size-4 opacity-50" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent 
                      align="start" 
                      className="w-[340px] rounded-[20px] p-1.5"
                      style={{
                        backgroundColor: "rgba(255, 255, 255, 0.68)",
                        backdropFilter: "blur(20px)",
                        WebkitBackdropFilter: "blur(20px)",
                        border: "1px solid rgba(255, 255, 255, 0.75)",
                        boxShadow: "0 12px 35px rgba(15, 23, 42, 0.16)"
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
                            className="rounded-[14px] cursor-pointer py-2.5 px-3 transition-all duration-200 my-0.5 bg-[rgba(59,130,246,0.10)] text-[#2563eb] hover:bg-[rgba(59,130,246,0.16)] focus:bg-[rgba(59,130,246,0.16)] hover:text-[#2563eb] focus:text-[#2563eb]"
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
              }\;

const newDesktopDropdown = \              if (item.isLayoutSelector) {
                return (
                  <DropdownMenu key="layout-selector">
                    <DropdownMenuTrigger className="flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium text-muted-foreground transition-all duration-200 hover:bg-white/80 dark:hover:bg-white/10 outline-none data-[state=open]:bg-white/80 dark:data-[state=open]:bg-white/10">
                      <div className="flex items-center gap-1.5">
                        <span>{item.label}</span>
                        <span className="text-[10px] font-semibold opacity-60">({layout})</span>
                      </div>
                      <ChevronDown className="size-4 opacity-50" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent 
                      align="start" 
                      className="w-[280px] rounded-[20px] p-2"
                      style={{
                        backgroundColor: "rgba(255, 255, 255, 0.68)",
                        backdropFilter: "blur(20px)",
                        WebkitBackdropFilter: "blur(20px)",
                        border: "1px solid rgba(255, 255, 255, 0.75)",
                        boxShadow: "0 12px 35px rgba(15, 23, 42, 0.16)"
                      }}
                    >
                      <div className="px-3 py-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                        Select Layout
                      </div>
                      {LAYOUTS.map((l) => (
                        <DropdownMenuItem 
                          key={l} 
                          onClick={() => handleLayoutSelect(l)}
                          className={cn(
                            "rounded-[14px] cursor-pointer py-2.5 px-3 transition-all duration-200 my-0.5 font-medium flex items-center justify-between",
                            layout === l 
                              ? "bg-[rgba(59,130,246,0.12)] text-[#2563eb] hover:bg-[rgba(59,130,246,0.16)] focus:bg-[rgba(59,130,246,0.16)] hover:text-[#2563eb] focus:text-[#2563eb]" 
                              : "text-foreground hover:bg-black/5 dark:hover:bg-white/10 focus:bg-black/5 dark:focus:bg-white/10"
                          )}
                        >
                          {l}
                          {layout === l && <div className="size-2 rounded-full bg-[#2563eb]" />}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                );
              }\;

code = code.replace(oldDesktopDropdown, newDesktopDropdown);

// 5. Update Mobile Dropdown
const oldMobileDropdown = \                if (item.dropdown) {
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
                }\;

const newMobileDropdown = \                if (item.isLayoutSelector) {
                  return (
                    <div key="layout-selector" className="flex flex-col mb-1">
                      <div className="px-3 py-2 text-sm font-semibold text-foreground/80">
                        {item.label} <span className="text-xs opacity-60 font-normal ml-1">({layout})</span>
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
                }\;

code = code.replace(oldMobileDropdown, newMobileDropdown);

fs.writeFileSync('src/components/site/AppShell.tsx', code);
console.log('AppShell.tsx updated successfully');