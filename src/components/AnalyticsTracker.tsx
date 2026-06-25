import { useEffect } from "react";
import { useLocation } from "react-router";

// Tipagem mínima pro gtag global
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

const GA_MEASUREMENT_ID = "G-PZM89D9K8M";

const AnalyticsTracker: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    if (typeof window.gtag !== "function") return;

    // dispara um page_view a cada mudança de rota
    window.gtag("config", GA_MEASUREMENT_ID, {
      page_path: location.pathname + location.search,
      page_title: document.title,
    });
  }, [location]);

  return null;
};

export default AnalyticsTracker;