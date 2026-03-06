import { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "ar";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  dir: "ltr" | "rtl";
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    dashboard: "Dashboard",
    devices: "Devices",
    networkMap: "Network Map",
    alerts: "Alerts",
    settings: "Settings",
    signOut: "Sign Out",
    overview: "Overview",
    networkHealth: "Network Health",
    totalDevices: "Total Devices",
    offlineNodes: "Offline Nodes",
    warnings: "Warnings",
    searchPlaceholder: "Search devices, IP addresses...",
    healthDesc: "Based on device status",
    totalDesc: "Active monitored nodes",
    offlineDesc: "Requires immediate attention",
    warningDesc: "High latency or packet loss",
  },
  ar: {
    dashboard: "لوحة التحكم",
    devices: "الأجهزة",
    networkMap: "خريطة الشبكة",
    alerts: "التنبيهات",
    settings: "الإعدادات",
    signOut: "تسجيل الخروج",
    overview: "نظرة عامة",
    networkHealth: "صحة الشبكة",
    totalDevices: "إجمالي الأجهزة",
    offlineNodes: "الأجهزة المتوقفة",
    warnings: "تحذيرات",
    searchPlaceholder: "بحث عن الأجهزة، عناوين IP...",
    healthDesc: "بناءً على حالة الجهاز",
    totalDesc: "عقد المراقبة النشطة",
    offlineDesc: "يتطلب اهتماماً فورياً",
    warningDesc: "زمن وصول عالٍ أو فقدان حزم",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    // Basic IP/Locale detection mockup
    // In a real app, you might use a service or check headers
    const detectLanguage = async () => {
      try {
        const locale = navigator.language.toLowerCase();
        if (locale.includes("ar") || locale.includes("eg")) {
          setLanguage("ar");
        }
      } catch (e) {
        console.error("Language detection failed", e);
      }
    };
    detectLanguage();
  }, []);

  const dir = language === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = language;
  }, [dir, language]);

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, dir, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
}
