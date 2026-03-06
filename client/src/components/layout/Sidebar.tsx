import { Link, useLocation } from "wouter";
import { 
  LayoutDashboard, 
  Server, 
  Map as MapIcon, 
  Settings, 
  Bell,
  LogOut,
  Activity
} from "lucide-react";
import { cn } from "@/lib/utils";

import { useLanguage } from "@/lib/LanguageContext";

export function Sidebar() {
  const [location] = useLocation();
  const { t, dir } = useLanguage();

  const navItems = [
    { href: "/", icon: LayoutDashboard, label: t("dashboard") },
    { href: "/devices", icon: Server, label: t("devices") },
    { href: "/map", icon: MapIcon, label: t("networkMap") },
    { href: "/alerts", icon: Bell, label: t("alerts") },
    { href: "/settings", icon: Settings, label: t("settings") },
  ];

  return (
    <aside className={cn(
      "w-64 bg-card border-border hidden md:flex flex-col",
      dir === "rtl" ? "border-l" : "border-r"
    )}>
      <div className="h-16 flex items-center px-6 border-b border-border">
        <Activity className={cn("w-6 h-6 text-primary", dir === "rtl" ? "ml-2" : "mr-2")} />
        <span className="text-xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-400">
          NetMonitor
        </span>
      </div>
      
      <nav className="flex-1 py-6 px-4 space-y-2">
        {navItems.map((item) => {
          const isActive = location === item.href || (item.href !== "/" && location.startsWith(item.href));
          return (
            <Link key={item.href} href={item.href}>
              <a className={cn(
                "flex items-center px-4 py-3 rounded-xl transition-all duration-200 group",
                isActive 
                  ? "bg-primary/10 text-primary" 
                  : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
              )}>
                <item.icon className={cn(
                  "w-5 h-5 transition-transform duration-200",
                  dir === "rtl" ? "ml-3" : "mr-3",
                  isActive ? "scale-110" : "group-hover:scale-110"
                )} />
                <span className="font-medium">{item.label}</span>
                {isActive && (
                  <div className={cn("w-1.5 h-1.5 rounded-full bg-primary animate-pulse", dir === "rtl" ? "mr-auto" : "ml-auto")} />
                )}
              </a>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <button className="flex items-center px-4 py-3 w-full text-muted-foreground hover:bg-white/5 hover:text-foreground rounded-xl transition-all duration-200">
          <LogOut className={cn("w-5 h-5", dir === "rtl" ? "ml-3" : "mr-3")} />
          <span className="font-medium">{t("signOut")}</span>
        </button>
      </div>
    </aside>
  );
}
