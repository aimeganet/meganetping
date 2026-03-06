import { useState } from "react";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Filter, MoreHorizontal, Server, Activity, ArrowRight } from "lucide-react";
import { mockDevices, DeviceStatus } from "@/lib/mock-data";

const statusColors: Record<DeviceStatus, string> = {
  online: "bg-success/20 text-success border-success/30",
  offline: "bg-destructive/20 text-destructive-foreground border-destructive/30",
  warning: "bg-warning/20 text-warning-foreground border-warning/30"
};

export default function Devices() {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredDevices = mockDevices.filter(d => 
    d.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    d.ip.includes(searchTerm)
  );

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold tracking-tight">Devices</h1>
          <p className="text-muted-foreground mt-1">Manage and monitor network nodes</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Plus className="w-4 h-4 mr-2" />
          Add Device
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search by name, IP..." 
            className="pl-9 glass-panel"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" className="glass-panel">
          <Filter className="w-4 h-4 mr-2" />
          Filters
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredDevices.map(device => (
          <Card key={device.id} className="glass-panel group hover:border-primary/50 transition-colors">
            <CardContent className="p-5">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${
                    device.status === 'online' ? 'bg-success/10 text-success' :
                    device.status === 'offline' ? 'bg-destructive/10 text-destructive' :
                    'bg-warning/10 text-warning'
                  }`}>
                    <Server className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg leading-none">{device.name}</h3>
                    <span className="text-sm font-mono text-muted-foreground">{device.ip}</span>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="space-y-1">
                  <span className="text-xs text-muted-foreground">Status</span>
                  <div>
                    <Badge variant="outline" className={statusColors[device.status]}>
                      {device.status.toUpperCase()}
                    </Badge>
                  </div>
                </div>
                <div className="space-y-1">
                  <span className="text-xs text-muted-foreground">Location</span>
                  <p className="text-sm font-medium truncate">{device.location}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-xs text-muted-foreground">Latency</span>
                  <div className="flex items-center">
                    <Activity className={`w-3 h-3 mr-1 ${device.latency > 50 ? 'text-warning' : 'text-success'}`} />
                    <span className="text-sm font-mono">{device.latency}ms</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <span className="text-xs text-muted-foreground">Uptime</span>
                  <p className="text-sm font-mono">{device.uptime}%</p>
                </div>
              </div>

              <div className="pt-4 border-t border-border/50 flex justify-between items-center">
                <span className="text-xs text-muted-foreground">
                  Last seen: {new Date(device.lastSeen).toLocaleTimeString()}
                </span>
                <Link href={`/devices/${device.id}`}>
                  <Button variant="ghost" size="sm" className="text-primary hover:text-primary hover:bg-primary/10 -mr-2">
                    Details <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
