import { useEffect, useRef } from "react";
import { useLocation } from "react-router";

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

const GA_MEASUREMENT_ID = "G-PZM89D9K8M";

const pageTitles: Record<string, string> = {
  "/": "Página Inicial",
  "/cancer/mama": "Câncer de Mama",
  "/cancer/mama/o-que-e": "Câncer de Mama - O que é",
  "/cancer/mama/causa": "Câncer de Mama - Causas",
  "/cancer/mama/riscos": "Câncer de Mama - Fatores de Risco",
  "/cancer/mama/protecao": "Câncer de Mama - Fatores de Proteção",
  "/cancer/mama/prevencao": "Câncer de Mama - Prevenção",
  "/cancer/mama/sinais-sintomas": "Câncer de Mama - Sinais e Sintomas",
  "/cancer/mama/orientacoes": "Câncer de Mama - Orientações",
  "/cancer/colo-utero": "Câncer do Colo do Útero",
  "/cancer/colo-utero/oque-e": "Colo do Útero - O que é",
  "/cancer/colo-utero/causa": "Colo do Útero - Causas",
  "/cancer/colo-utero/sinais": "Colo do Útero - Sinais e Sintomas",
  "/cancer/colo-utero/risco": "Colo do Útero - Fatores de Risco",
  "/cancer/colo-utero/preventivo": "Colo do Útero - Preventivo",
  "/cancer/colo-utero/prevencao": "Colo do Útero - Prevenção",
  "/cancer/colo-utero/orientacoes": "Colo do Útero - Orientações",
  "/noticias": "Notícias",
  "/eventos": "Eventos",
  "/exame-preventivo": "Exame Preventivo",
  "/agendar-apresentacao": "Agendar Apresentação",
  "/sobre": "Sobre a RFCC",
  "/sobre/colaboracoes": "Colaborações",
  "/colabora/pix": "Doação via PIX",
  "/colabora/cabelo": "Doação de Cabelo",
  "/colabora/terapeuta": "Terapeutas Voluntárias",
  "/colabora/brecho": "Brechó",
  "/colabora/artesanato": "Artesanato",
  "/contato": "Contato",
  "/mostruario": "Vitrine Digital",
  "/agenda": "Agenda da Rede",
  "/login": "Login",
  "/admin/agendamentos": "Admin - Agendamentos",
  "/admin/agendamento-regras": "Admin - Regras de Disponibilidade",
  "/admin/eventos": "Admin - Eventos",
  "/admin/noticias": "Admin - Notícias",
  "/admin/vitrine": "Admin - Vitrine",
  "/admin/agenda": "Admin - Agenda",
};

const AnalyticsTracker: React.FC = () => {
  const location = useLocation();
  const prevPath = useRef<string>("");

  useEffect(() => {
    const path = location.pathname;

    // Evita disparar duas vezes na mesma rota
    if (path === prevPath.current) return;
    prevPath.current = path;

    let title = pageTitles[path];
    if (!title) {
      if (path.startsWith("/noticias/")) {
        title = "Notícia - Detalhe";
      } else {
        title = "RFCC Itapema";
      }
    }

    // Pequeno delay pra garantir que a transição do Ionic terminou
    setTimeout(() => {
      document.title = title + " | RFCC Itapema";

      if (typeof window.gtag !== "function") return;

      window.gtag("config", GA_MEASUREMENT_ID, {
        page_path: path + location.search,
        page_title: title,
      });
    }, 300);

  }, [location]);

  return null;
};

export default AnalyticsTracker;