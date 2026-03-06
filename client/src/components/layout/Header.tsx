import { Bell, Search, Menu } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { useLanguage } from "@/lib/LanguageContext";
import { cn } from "@/lib/utils";

export function Header() {
  const { t, dir, language, setLanguage } = useLanguage();

  return (
    <header className="h-16 bg-background/80 backdrop-blur-md border-b border-border flex items-center justify-between px-4 sticky top-0 z-50">
      <div className="flex items-center md:hidden">
        <Button variant="ghost" size="icon" className={cn(dir === "rtl" ? "ml-2" : "mr-2")}>
          <Menu className="w-5 h-5" />
        </Button>
        <span className="text-lg font-display font-bold text-primary">NetMonitor</span>
      </div>

      <div className="hidden md:flex items-center max-w-md w-full relative group">
        <Search className={cn("w-4 h-4 absolute text-muted-foreground group-focus-within:text-primary transition-colors", dir === "rtl" ? "right-3" : "left-3")} />
        <Input 
          placeholder={t("searchPlaceholder")} 
          className={cn("bg-card/50 border-white/5 focus-visible:ring-primary/50 rounded-full transition-all", dir === "rtl" ? "pr-9" : "pl-9")}
        />
      </div>

      <div className="flex items-center space-x-4 rtl:space-x-reverse">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setLanguage(language === "en" ? "ar" : "en")}
          className="font-medium px-2"
        >
          {language === "en" ? "العربية" : "English"}
        </Button>

        <Button variant="ghost" size="icon" className="relative hover:bg-primary/10 hover:text-primary transition-colors">
          <Bell className="w-5 h-5" />
          <span className={cn("absolute top-2 w-2 h-2 bg-destructive rounded-full border-2 border-background animate-pulse", dir === "rtl" ? "left-2" : "right-2")}></span>
        </Button>
        
        <div className="h-8 w-px bg-border mx-2 hidden sm:block"></div>

        <div className="flex items-center gap-3">
          <div className={cn("hidden sm:block", dir === "rtl" ? "text-left" : "text-right")}>
            <p className="text-sm font-medium leading-none">Admin User</p>
            <p className="text-xs text-muted-foreground">Network Operations</p>
          </div>
          <Avatar className="border-2 border-primary/20 cursor-pointer hover:border-primary transition-colors">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
