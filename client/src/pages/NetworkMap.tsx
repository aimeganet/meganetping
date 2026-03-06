import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ZoomIn, ZoomOut, Maximize } from "lucide-react";
import { mockDevices } from "@/lib/mock-data";

export default function NetworkMap() {
  return (
    <div className="space-y-6 h-[calc(100vh-8rem)] flex flex-col animate-in fade-in duration-500">
      <div className="flex justify-between items-center shrink-0">
        <div>
          <h1 className="text-3xl font-display font-bold tracking-tight">Topology Map</h1>
          <p className="text-muted-foreground mt-1">Logical view of network connections</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="icon" className="glass-panel">
            <ZoomIn className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="icon" className="glass-panel">
            <ZoomOut className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="icon" className="glass-panel">
            <Maximize className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <Card className="glass-panel flex-1 relative overflow-hidden">
        {/* Decorative background for the map area */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        
        <CardContent className="h-full flex items-center justify-center relative p-0">
          
          {/* Simulated Network Nodes - In a real app, use react-flow or vis.js */}
          <div className="relative w-full max-w-4xl aspect-video mx-auto">
            
            {/* Connection Lines SVG */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
              {/* Core to Distribution */}
              <line x1="50%" y1="20%" x2="30%" y2="50%" stroke="hsl(var(--primary))" strokeWidth="2" strokeOpacity="0.5" />
              <line x1="50%" y1="20%" x2="70%" y2="50%" stroke="hsl(var(--primary))" strokeWidth="2" strokeOpacity="0.5" />
              
              {/* Distribution to Access */}
              <line x1="30%" y1="50%" x2="20%" y2="80%" stroke="hsl(var(--primary))" strokeWidth="2" strokeOpacity="0.5" />
              <line x1="30%" y1="50%" x2="40%" y2="80%" stroke="hsl(var(--primary))" strokeWidth="2" strokeOpacity="0.5" />
              <line x1="70%" y1="50%" x2="60%" y2="80%" stroke="hsl(var(--destructive))" strokeWidth="2" strokeOpacity="0.5" strokeDasharray="5,5" />
              <line x1="70%" y1="50%" x2="80%" y2="80%" stroke="hsl(var(--warning))" strokeWidth="2" strokeOpacity="0.5" />
            </svg>

            {/* Nodes */}
            {/* Core */}
            <div className="absolute top-[20%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer z-10">
              <div className="w-16 h-16 rounded-2xl bg-card border-2 border-primary shadow-[0_0_15px_rgba(0,100,255,0.3)] flex items-center justify-center transition-transform group-hover:scale-110">
                <span className="text-2xl">🌐</span>
              </div>
              <div className="mt-2 text-center bg-background/80 px-2 py-1 rounded-md backdrop-blur-sm border border-white/10">
                <p className="text-sm font-bold">Core Router</p>
                <p className="text-xs text-success">Online</p>
              </div>
            </div>

            {/* Distribution Level */}
            <div className="absolute top-[50%] left-[30%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer z-10">
              <div className="w-14 h-14 rounded-2xl bg-card border-2 border-primary/50 flex items-center justify-center transition-transform group-hover:scale-110">
                <span className="text-xl">🔀</span>
              </div>
              <div className="mt-2 text-center bg-background/80 px-2 py-1 rounded-md backdrop-blur-sm border border-white/10">
                <p className="text-sm font-bold">Dist SW-A</p>
              </div>
            </div>

            <div className="absolute top-[50%] left-[70%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer z-10">
              <div className="w-14 h-14 rounded-2xl bg-card border-2 border-primary/50 flex items-center justify-center transition-transform group-hover:scale-110">
                <span className="text-xl">🔀</span>
              </div>
              <div className="mt-2 text-center bg-background/80 px-2 py-1 rounded-md backdrop-blur-sm border border-white/10">
                <p className="text-sm font-bold">Dist SW-B</p>
              </div>
            </div>

            {/* Access Level */}
            <div className="absolute top-[80%] left-[20%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer z-10">
              <div className="w-12 h-12 rounded-2xl bg-card border border-white/20 flex items-center justify-center transition-transform group-hover:scale-110">
                <span className="text-lg">📡</span>
              </div>
              <div className="mt-2 text-center">
                <p className="text-xs font-bold">AP Lobby</p>
              </div>
            </div>

            <div className="absolute top-[80%] left-[40%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer z-10">
              <div className="w-12 h-12 rounded-2xl bg-card border border-white/20 flex items-center justify-center transition-transform group-hover:scale-110">
                <span className="text-lg">💻</span>
              </div>
              <div className="mt-2 text-center">
                <p className="text-xs font-bold">Server 1</p>
              </div>
            </div>

            <div className="absolute top-[80%] left-[60%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer z-10">
              <div className="w-12 h-12 rounded-2xl bg-destructive/20 border border-destructive flex items-center justify-center transition-transform group-hover:scale-110 animate-pulse">
                <span className="text-lg">⚠️</span>
              </div>
              <div className="mt-2 text-center">
                <p className="text-xs font-bold text-destructive">Branch Router</p>
              </div>
            </div>

            <div className="absolute top-[80%] left-[80%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer z-10">
              <div className="w-12 h-12 rounded-2xl bg-warning/20 border border-warning flex items-center justify-center transition-transform group-hover:scale-110">
                <span className="text-lg">📡</span>
              </div>
              <div className="mt-2 text-center">
                <p className="text-xs font-bold text-warning">AP Cafe</p>
              </div>
            </div>

          </div>
        </CardContent>
      </Card>
    </div>
  );
}
