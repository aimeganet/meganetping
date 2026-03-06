import { useParams, Link } from "wouter";
import { ArrowLeft, Server, Activity, Wifi, Clock, AlertTriangle, Settings, RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockDevices, mockChartData } from "@/lib/mock-data";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export default function DeviceDetail() {
  const params = useParams();
  const device = mockDevices.find(d => d.id === params.id) || mockDevices[0];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center space-x-4">
        <Link href="/devices">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <div className="flex items-center space-x-3">
            <h1 className="text-3xl font-display font-bold tracking-tight">{device.name}</h1>
            <Badge variant="outline" className={
              device.status === 'online' ? 'bg-success/20 text-success' :
              device.status === 'offline' ? 'bg-destructive/20 text-destructive' :
              'bg-warning/20 text-warning'
            }>
              {device.status.toUpperCase()}
            </Badge>
          </div>
          <p className="text-muted-foreground font-mono mt-1">{device.ip} • {device.type.toUpperCase()}</p>
        </div>
        <div className="ml-auto flex space-x-2">
          <Button variant="outline" size="sm" className="glass-panel">
            <RefreshCw className="w-4 h-4 mr-2" />
            Ping
          </Button>
          <Button variant="outline" size="sm" className="glass-panel">
            <Settings className="w-4 h-4 mr-2" />
            Configure
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="glass-panel">
          <CardContent className="p-6 flex items-center space-x-4">
            <div className="p-3 rounded-full bg-primary/10 text-primary">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Current Latency</p>
              <h3 className="text-2xl font-bold font-mono">{device.latency}ms</h3>
            </div>
          </CardContent>
        </Card>
        <Card className="glass-panel">
          <CardContent className="p-6 flex items-center space-x-4">
            <div className="p-3 rounded-full bg-warning/10 text-warning">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Packet Loss</p>
              <h3 className="text-2xl font-bold font-mono">{device.packetLoss}%</h3>
            </div>
          </CardContent>
        </Card>
        <Card className="glass-panel">
          <CardContent className="p-6 flex items-center space-x-4">
            <div className="p-3 rounded-full bg-success/10 text-success">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Uptime</p>
              <h3 className="text-2xl font-bold font-mono">{device.uptime}%</h3>
            </div>
          </CardContent>
        </Card>
        <Card className="glass-panel">
          <CardContent className="p-6 flex items-center space-x-4">
            <div className="p-3 rounded-full bg-blue-500/10 text-blue-400">
              <Wifi className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Status</p>
              <h3 className="text-xl font-bold capitalize">{device.status}</h3>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="performance" className="w-full">
        <TabsList className="glass-panel bg-transparent border-b border-border w-full justify-start rounded-none h-auto p-0 mb-6">
          <TabsTrigger value="performance" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none py-3 px-6">Performance</TabsTrigger>
          <TabsTrigger value="logs" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none py-3 px-6">Event Logs</TabsTrigger>
          <TabsTrigger value="settings" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none py-3 px-6">Alert Rules</TabsTrigger>
        </TabsList>
        
        <TabsContent value="performance" className="space-y-4">
          <Card className="glass-panel">
            <CardHeader>
              <CardTitle>Latency History (Last 24h)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mockChartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                    />
                    <Line type="monotone" dataKey="latency" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="logs">
          <Card className="glass-panel">
            <CardHeader>
              <CardTitle>Recent Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex space-x-4 text-sm p-3 rounded-lg bg-white/5">
                    <span className="text-muted-foreground w-32 shrink-0">{new Date(Date.now() - i * 3600000).toLocaleString()}</span>
                    <span className={i === 2 ? "text-warning" : "text-foreground"}>
                      {i === 2 ? "High latency spike detected (>100ms)" : "Successful ping reply received"}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings">
          <Card className="glass-panel">
            <CardHeader>
              <CardTitle>Notification Rules</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">Configure when to alert for this specific device.</p>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10">
                  <div>
                    <h4 className="font-medium">Offline Alert</h4>
                    <p className="text-sm text-muted-foreground">Notify when device fails 3 consecutive ping checks</p>
                  </div>
                  <div className="w-10 h-6 bg-primary rounded-full relative cursor-pointer">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10">
                  <div>
                    <h4 className="font-medium">High Latency</h4>
                    <p className="text-sm text-muted-foreground">Notify when latency exceeds 100ms for 5 minutes</p>
                  </div>
                  <div className="w-10 h-6 bg-primary rounded-full relative cursor-pointer">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
