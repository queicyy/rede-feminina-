import React from "react";
import { Route, Redirect } from "react-router";
import { useFirebase } from "../FirebaseContext";
import MainPage from "../pages/mainPage/mainPage";
import { ColoUteroMenu, PrevencaoColoUtero, PreventivoColoUtero, RiscoColoUtero } from "../pages/coloUtero";
import CausaColoUtero from "../pages/coloUtero/CausaColoUtero";
import CancerDeMama from "../pages/CancerDeMama/CancerDeMama";
import OqueE from "../pages/CancerDeMama/oqueE";
import Riscos from "../pages/CancerDeMama/riscos";
import Prevencao from "../pages/CancerDeMama/prevencao";
import Autoexame from "../pages/CancerDeMama/autoexame";
import OQueEColoUtero from "../pages/coloUtero/oqueE";
import SinaisSintomasColoUtero from "../pages/coloUtero/SinaisSintomas";
import { Colaboracoes } from "../pages/Colaboracoes";
import Noticias from "../pages/Noticias/Noticias";
import Login from "../pages/login/Login";
import { Contato } from "../pages/Contato";
import AgendarColeta from "../pages/AgendarColeta/AgendarColeta";
import About from "../pages/About/about";
import { Artesanato, Brecho, ColaboraPix, DoacoesCabelo, Terapeutas } from "../pages/Colaboracoes/components";
import Causa from "../pages/CancerDeMama/causa";
import FatoresRisco from "../pages/CancerDeMama/FatoresRisco";
import FatoresProtecao from "../pages/CancerDeMama/FatoresProtecao";
import { FormSinaisSintomasColoUtero } from "../pages/coloUtero/components";
import { FormCancerMama } from "../pages/CancerDeMama/components";
import { CalendarPage } from "../pages/Calendar";
import AvailabilityConfig from "../pages/Admin/Agendamentos/Availability";
import AgendamentosDashboard from "../pages/Admin/Agendamentos/Dashboard";

const AppRoutes: React.FC = () => {
  const { user, isLoading } = useFirebase();

  return (
    <>
      {/* dashboard */}
      <Route path="/" exact={true}>
        <MainPage />
      </Route>

      {/* cancer colo utero */}
      <Route path="/cancer/colo-utero">
        <ColoUteroMenu />
      </Route>
      <Route path="/cancer/colo-utero/oque-e">
        <OQueEColoUtero />
      </Route>
      <Route path="/cancer/colo-utero/causa">
        <CausaColoUtero />
      </Route>
      <Route path="/cancer/colo-utero/sinais">
        <SinaisSintomasColoUtero />
      </Route>
      <Route path="/cancer/colo-utero/risco">
        <RiscoColoUtero />
      </Route>
      <Route path="/cancer/colo-utero/preventivo">
        <PreventivoColoUtero />
      </Route>
      <Route path="/cancer/colo-utero/prevencao">
        <PrevencaoColoUtero />
      </Route>
      <Route path="/cancer/colo-utero/orientacoes">
        <FormSinaisSintomasColoUtero />
      </Route>

      <Route path="/login">
        <Login />
      </Route>

      {/* Notícias */}
      <Route path="/noticias">
        <Noticias />
      </Route>

      {/* cancer mama */}
      <Route path="/cancer/mama">
        <CancerDeMama />
      </Route>
      <Route path="/cancer/mama/o-que-e">
        <OqueE />
      </Route>
      <Route path="/cancer/mama/causa">
        <Causa />
      </Route>
      <Route path="/cancer/mama/riscos">
        <FatoresRisco />
      </Route>
      <Route path="/cancer/mama/protecao">
        <FatoresProtecao />
      </Route>
      <Route path="/cancer/mama/prevencao">
        <Prevencao />
      </Route>
      <Route path="/cancer/mama/sinais-sintomas">
        <Autoexame />
      </Route>
      <Route path="/cancer/mama/orientacoes">
        <FormCancerMama />
      </Route>

      {/* Exame Preventivo */}
      <Route path="/exame-preventivo">
        <AgendarColeta />
      </Route>

      {/* Agendar Apresentação */}
      <Route path="/agendar-apresentacao">
        <CalendarPage />
      </Route>

      {/* About */}
      <Route path="/sobre">
        <About />
      </Route>
      <Route path="/sobre/colaboracoes">
        <Colaboracoes />
      </Route>
      <Route path="/colabora/pix">
        <ColaboraPix />
      </Route>
      <Route path="/colabora/cabelo">
        <DoacoesCabelo />
      </Route>
      <Route path="/colabora/terapeuta">
        <Terapeutas />
      </Route>
      <Route path="/colabora/brecho">
        <Brecho />
      </Route>
      <Route path="/colabora/artesanato">
        <Artesanato />
      </Route>

      {/* Contato */}
      <Route path="/contato">
        <Contato />
      </Route>

      {/* Admin - Agendamentos */}
      <Route
        path="/admin/agendamentos"
        render={() => {
          if (isLoading) return null;
          return user ? <AgendamentosDashboard /> : <Redirect to="/login" />;
        }}
      />
      <Route
        path="/admin/agendamento-regras"
        render={() => {
          if (isLoading) return null;
          return user ? <AvailabilityConfig /> : <Redirect to="/login" />;
        }}
      />
    </>
  );
};

export default AppRoutes;
