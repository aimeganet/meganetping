export type DeviceStatus = 'online' | 'offline' | 'warning';
export type DeviceType = 'router' | 'switch' | 'ap' | 'server';

export interface Device {
  id: string;
  name: string;
  ip: string;
  type: DeviceType;
  location: string;
  status: DeviceStatus;
  latency: number;
  packetLoss: number;
  uptime: number;
  lastSeen: string;
}

export const mockDevices: Device[] = [
  {
    id: "dev-001",
    name: "Core Router Alpha",
    ip: "192.168.1.1",
    type: "router",
    location: "Data Center 1",
    status: "online",
    latency: 12,
    packetLoss: 0,
    uptime: 99.99,
    lastSeen: new Date().toISOString()
  },
  {
    id: "dev-002",
    name: "Edge Switch B",
    ip: "192.168.1.2",
    type: "switch",
    location: "Data Center 1",
    status: "online",
    latency: 15,
    packetLoss: 0.1,
    uptime: 99.95,
    lastSeen: new Date().toISOString()
  },
  {
    id: "dev-003",
    name: "Lobby AP",
    ip: "10.0.0.15",
    type: "ap",
    location: "HQ Building",
    status: "warning",
    latency: 85,
    packetLoss: 2.5,
    uptime: 98.2,
    lastSeen: new Date(Date.now() - 5000).toISOString()
  },
  {
    id: "dev-004",
    name: "Storage Server",
    ip: "10.0.1.100",
    type: "server",
    location: "Data Center 2",
    status: "online",
    latency: 8,
    packetLoss: 0,
    uptime: 99.99,
    lastSeen: new Date().toISOString()
  },
  {
    id: "dev-005",
    name: "Remote Office Router",
    ip: "172.16.0.1",
    type: "router",
    location: "Branch Office",
    status: "offline",
    latency: 0,
    packetLoss: 100,
    uptime: 85.5,
    lastSeen: new Date(Date.now() - 3600000).toISOString()
  },
  {
    id: "dev-006",
    name: "Cafeteria AP",
    ip: "10.0.0.16",
    type: "ap",
    location: "HQ Building",
    status: "online",
    latency: 22,
    packetLoss: 0,
    uptime: 99.1,
    lastSeen: new Date().toISOString()
  },
  {
    id: "dev-007",
    name: "Distribution Switch",
    ip: "192.168.2.1",
    type: "switch",
    location: "Data Center 1",
    status: "online",
    latency: 14,
    packetLoss: 0,
    uptime: 99.98,
    lastSeen: new Date().toISOString()
  }
];

export const mockChartData = Array.from({ length: 24 }).map((_, i) => ({
  time: `${i}:00`,
  latency: Math.floor(Math.random() * 40) + 10,
  packetLoss: Math.random() > 0.8 ? Math.random() * 5 : 0
}));

export const mockAlerts = [
  { id: 1, deviceId: "dev-005", message: "Device went offline", time: "1 hour ago", severity: "high" },
  { id: 2, deviceId: "dev-003", message: "High latency detected (>80ms)", time: "5 mins ago", severity: "medium" },
  { id: 3, deviceId: "dev-001", message: "Configuration changed", time: "1 day ago", severity: "low" }
];
