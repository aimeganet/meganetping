import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Server, WifiOff, AlertTriangle } from "lucide-react";
import { mockDevices, mockChartData, mockAlerts } from "@/lib/mock-data";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { Link } from "wouter";

import { useLanguage } from "@/lib/LanguageContext";

export default function Dashboard() {
  const { t } = useLanguage();
  const totalDevices = mockDevices.length;
  const offlineDevices = mockDevices.filter(d => d.status === 'offline').length;
  const warningDevices = mockDevices.filter(d => d.status === 'warning').length;
  
  const healthScore = Math.round(((totalDevices - offlineDevices - (warningDevices * 0.5)) / totalDevices) * 100);

  const stats = [
    { 
      title: t("networkHealth"), 
      value: `${healthScore}%`, 
      icon: Activity, 
      color: "text-primary",
      desc: t("healthDesc")
    },
    { 
      title: t("totalDevices"), 
      value: totalDevices, 
      icon: Server, 
      color: "text-blue-400",
      desc: t("totalDesc")
    },
    { 
      title: t("offlineNodes"), 
      value: offlineDevices, 
      icon: WifiOff, 
      color: "text-destructive",
      desc: t("offlineDesc")
    },
    { 
      title: t("warnings"), 
      value: warningDevices, 
      icon: AlertTriangle, 
      color: "text-warning",
      desc: t("warningDesc")
    }
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-display font-bold tracking-tight">{t("overview")}</h1>
          <p className="text-muted-foreground mt-1">Real-time network status and metrics</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <Card key={i} className="glass-panel overflow-hidden relative group">
            <div className={`absolute top-0 right-0 w-32 h-32 bg-current opacity-[0.03] rounded-full -mr-10 -mt-10 transition-transform group-hover:scale-150 duration-500 ${stat.color}`} />
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-display font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{stat.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="col-span-1 lg:col-span-2 glass-panel">
          <CardHeader>
            <CardTitle>Average Network Latency (24h)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockChartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorLatency" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                  <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}ms`} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                    itemStyle={{ color: 'hsl(var(--foreground))' }}
                  />
                  <Area type="monotone" dataKey="latency" stroke="hsl(var(--primary))" strokeWidth={2} fillOpacity={1} fill="url(#colorLatency)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-panel flex flex-col">
          <CardHeader>
            <CardTitle>Recent Alerts</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-auto">
            <div className="space-y-4">
              {mockAlerts.map(alert => (
                <div key={alert.id} className="flex items-start space-x-3 p-3 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                  <div className={`mt-0.5 w-2 h-2 rounded-full ${
                    alert.severity === 'high' ? 'bg-destructive' : 
                    alert.severity === 'medium' ? 'bg-warning' : 'bg-primary'
                  }`} />
                  <div>
                    <p className="text-sm font-medium leading-none">{alert.message}</p>
                    <div className="flex items-center mt-1 text-xs text-muted-foreground">
                      <span className="font-mono">{alert.deviceId}</span>
                      <span className="mx-2">•</span>
                      <span>{alert.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="glass-panel">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Problematic Devices</CardTitle>
          <Link href="/devices">
            <a className="text-sm text-primary hover:underline">View All</a>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground uppercase bg-white/5 rounded-t-lg">
                <tr>
                  <th className="px-4 py-3 rounded-tl-lg">Device</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Latency</th>
                  <th className="px-4 py-3">Packet Loss</th>
                  <th className="px-4 py-3 rounded-tr-lg text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {mockDevices.filter(d => d.status !== 'online').map((device, i) => (
                  <tr key={device.id} className="border-b border-border/50 hover:bg-white/5 transition-colors">
                    <td className="px-4 py-3 font-medium">
                      <div className="flex items-center">
                        <Server className="w-4 h-4 mr-2 text-muted-foreground" />
                        {device.name}
                        <span className="ml-2 text-xs text-muted-foreground font-mono">{device.ip}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                        device.status === 'offline' ? 'bg-destructive/20 text-destructive-foreground' : 'bg-warning/20 text-warning-foreground'
                      }`}>
                        {device.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-mono">{device.latency}ms</td>
                    <td className="px-4 py-3 font-mono">{device.packetLoss}%</td>
                    <td className="px-4 py-3 text-right">
                      <Link href={`/devices/${device.id}`}>
                        <a className="text-primary hover:underline">Details</a>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
