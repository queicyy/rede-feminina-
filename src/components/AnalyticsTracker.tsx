import { useEffect } from "react";
import { useLocation } from "react-router";

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

const GA_MEASUREMENT_ID = "G-PZM89D9K8M";

const pageTitles: Record<string, string> = {
  // Página inicial
  "/": "Página Inicial",

  // Câncer de Mama
  "/cancer/mama": "Câncer de Mama",
  "/cancer/mama/o-que-e": "Câncer de Mama - O que é",
  "/cancer/mama/causa": "Câncer de Mama - Causas",
  "/cancer/mama/riscos": "Câncer de Mama - Fatores de Risco",
  "/cancer/mama/protecao": "Câncer de Mama - Fatores de Proteção",
  "/cancer/mama/prevencao": "Câncer de Mama - Prevenção",
  "/cancer/mama/sinais-sintomas": "Câncer de Mama - Sinais e Sintomas",
  "/cancer/mama/orientacoes": "Câncer de Mama - Orientações",

  // Câncer do Colo do Útero
  "/cancer/colo-utero": "Câncer do Colo do Útero",
  "/cancer/colo-utero/oque-e": "Colo do Útero - O que é",
  "/cancer/colo-utero/causa": "Colo do Útero - Causas",
  "/cancer/colo-utero/sinais": "Colo do Útero - Sinais e Sintomas",
  "/cancer/colo-utero/risco": "Colo do Útero - Fatores de Risco",
  "/cancer/colo-utero/preventivo": "Colo do Útero - Preventivo",
  "/cancer/colo-utero/prevencao": "Colo do Útero - Prevenção",
  "/cancer/colo-utero/orientacoes": "Colo do Útero - Orientações",

  // Notícias
  "/noticias": "Notícias",

  // Eventos
  "/eventos": "Eventos",

  // Exame Preventivo
  "/exame-preventivo": "Exame Preventivo",

  // Agendamento
  "/agendar-apresentacao": "Agendar Apresentação",

  // Sobre / Colaborações
  "/sobre": "Sobre a RFCC",
  "/sobre/colaboracoes": "Colaborações",
  "/colabora/pix": "Doação via PIX",
  "/colabora/cabelo": "Doação de Cabelo",
  "/colabora/terapeuta": "Terapeutas Voluntárias",
  "/colabora/brecho": "Brechó",
  "/colabora/artesanato": "Artesanato",

  // Contato
  "/contato": "Contato",

  // Vitrine
  "/mostruario": "Vitrine Digital",

  // Agenda
  "/agenda": "Agenda da Rede",

  // Login
  "/login": "Login",

  // Admin
  "/admin/agendamentos": "Admin - Agendamentos",
  "/admin/agendamento-regras": "Admin - Regras de Disponibilidade",
  "/admin/eventos": "Admin - Eventos",
  "/admin/noticias": "Admin - Notícias",
  "/admin/vitrine": "Admin - Vitrine",
  "/admin/agenda": "Admin - Agenda",
};

const AnalyticsTracker: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;

    // Busca título exato ou tenta match parcial (ex: /noticias/abc123)
    let title = pageTitles[path];
    if (!title) {
      if (path.startsWith("/noticias/")) {
        title = "Notícia - Detalhe";
      } else {
        title = "RFCC Itapema";
      }
    }

    // Atualiza o título da aba do navegador
    document.title = title + " | RFCC Itapema";

    if (typeof window.gtag !== "function") return;

    window.gtag("config", GA_MEASUREMENT_ID, {
      page_path: path + location.search,
      page_title: title,
    });
  }, [location]);

  return null;
};

export default AnalyticsTracker;