import { Bell, Search, Menu } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Header() {
  return (
    <header className="h-16 bg-background/80 backdrop-blur-md border-b border-border flex items-center justify-between px-4 sticky top-0 z-50">
      <div className="flex items-center md:hidden">
        <Button variant="ghost" size="icon" className="mr-2">
          <Menu className="w-5 h-5" />
        </Button>
        <span className="text-lg font-display font-bold text-primary">NetMonitor</span>
      </div>

      <div className="hidden md:flex items-center max-w-md w-full relative group">
        <Search className="w-4 h-4 absolute left-3 text-muted-foreground group-focus-within:text-primary transition-colors" />
        <Input 
          placeholder="Search devices, IP addresses..." 
          className="pl-9 bg-card/50 border-white/5 focus-visible:ring-primary/50 rounded-full transition-all"
        />
      </div>

      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" className="relative hover:bg-primary/10 hover:text-primary transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full border-2 border-background animate-pulse"></span>
        </Button>
        
        <div className="h-8 w-px bg-border mx-2 hidden sm:block"></div>

        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
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
