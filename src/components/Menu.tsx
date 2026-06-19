import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
} from "@ionic/react";

import { useLocation, useHistory } from "react-router-dom";
import {
  femaleOutline,
  femaleSharp,
  heartOutline,
  heartSharp,
  helpCircleOutline,
  helpCircleSharp,
  homeSharp,
  mailOutline,
  newspaperOutline,
  newspaperSharp,
  womanOutline,
  womanSharp,
  bookOutline,
  bookSharp,
  calendarOutline,
  settingsOutline,
  listOutline,
  logOutOutline,
  cartOutline,
  cartSharp,
  lockClosedOutline,
  calendarNumberOutline,
} from "ionicons/icons";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import "./Menu.css";
import { useFirebase } from "../FirebaseContext";

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: "Página Inicial",
    url: "/",
    iosIcon: mailOutline,
    mdIcon: homeSharp,
  },
  {
    title: "Câncer de Mama",
    url: "/cancer/mama",
    iosIcon: womanOutline,
    mdIcon: womanSharp,
  },
  {
    title: "Câncer do Colo do Útero",
    url: "/cancer/colo-utero",
    iosIcon: femaleOutline,
    mdIcon: femaleSharp,
  },
  {
    title: "Colaborações",
    url: "/sobre/colaboracoes",
    iosIcon: heartOutline,
    mdIcon: heartSharp,
  },
  {
    title: "Vitrine Virtual",
    url: "/mostruario",
    iosIcon: cartOutline,
    mdIcon: cartSharp,
  },
  {
    title: "Notícias",
    url: "/noticias",
    iosIcon: newspaperOutline,
    mdIcon: newspaperSharp,
  },
  {
    title: "Exame Preventivo",
    url: "/exame-preventivo",
    iosIcon: bookOutline,
    mdIcon: bookSharp,
  },
  {
    title: "Sobre",
    url: "/sobre",
    iosIcon: helpCircleOutline,
    mdIcon: helpCircleSharp,
  },
  {
    title: "Agendar Apresentação",
    url: "/agendar-apresentacao",
    iosIcon: calendarOutline,
    mdIcon: calendarOutline,
  },
  {
    title: "Contato",
    url: "/contato",
    iosIcon: helpCircleOutline,
    mdIcon: helpCircleSharp,
  },
];

const Menu: React.FC = () => {
  const location = useLocation();
  const history = useHistory();
  const { user } = useFirebase();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      history.replace("/");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>RFCC Itapema</IonListHeader>

          {/* Menu público */}
          {appPages.map((appPage, index) => (
            <IonMenuToggle key={index} autoHide={false}>
              <IonItem
                className={location.pathname === appPage.url ? "selected" : ""}
                routerLink={appPage.url}
                routerDirection="none"
                lines="none"
                detail={false}
              >
                <IonIcon aria-hidden="true" slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                <IonLabel>{appPage.title}</IonLabel>
              </IonItem>
            </IonMenuToggle>
          ))}

          {/* Botão Área Administrativa — aparece para todos */}
          {!user && (
            <IonMenuToggle autoHide={false}>
              <IonItem
                className={location.pathname === "/login" ? "selected" : ""}
                routerLink="/login"
                routerDirection="none"
                lines="none"
                detail={false}
                style={{ marginTop: "20px" }}
              >
                <IonIcon aria-hidden="true" slot="start" icon={lockClosedOutline} color="medium" />
                <IonLabel color="medium">Área Administrativa</IonLabel>
              </IonItem>
            </IonMenuToggle>
          )}

          {/* Menu admin — só aparece quando logado */}
          {user && (
            <>
              <IonListHeader style={{ marginTop: "20px" }}>Administração</IonListHeader>
              <IonMenuToggle autoHide={false}>
                <IonItem
                  className={location.pathname === "/admin/eventos" ? "selected" : ""}
                  routerLink="/admin/eventos"
                  routerDirection="none"
                  lines="none"
                  detail={false}
                >
                  <IonIcon aria-hidden="true" slot="start" icon={calendarNumberOutline} />
                  <IonLabel>Gerenciar Eventos</IonLabel>
                </IonItem>
              </IonMenuToggle>
              <IonMenuToggle autoHide={false}>
                <IonItem
                  className={location.pathname === "/admin/noticias" ? "selected" : ""}
                  routerLink="/admin/noticias"
                  routerDirection="none"
                  lines="none"
                  detail={false}
                >
                  <IonIcon aria-hidden="true" slot="start" icon={newspaperOutline} />
                  <IonLabel>Gerenciar Notícias</IonLabel>
                </IonItem>
              </IonMenuToggle>
              <IonMenuToggle autoHide={false}>
                <IonItem
                  className={location.pathname === "/admin/agendamentos" ? "selected" : ""}
                  routerLink="/admin/agendamentos"
                  routerDirection="none"
                  lines="none"
                  detail={false}
                >
                  <IonIcon aria-hidden="true" slot="start" icon={listOutline} />
                  <IonLabel>Solicitações de Agendamento</IonLabel>
                </IonItem>
              </IonMenuToggle>
              <IonMenuToggle autoHide={false}>
                <IonItem
                  className={location.pathname === "/admin/agendamento-regras" ? "selected" : ""}
                  routerLink="/admin/agendamento-regras"
                  routerDirection="none"
                  lines="none"
                  detail={false}
                >
                  <IonIcon aria-hidden="true" slot="start" icon={settingsOutline} />
                  <IonLabel>Regras de Disponibilidade</IonLabel>
                </IonItem>
              </IonMenuToggle>
              <IonMenuToggle autoHide={false}>
                <IonItem button onClick={handleLogout} lines="none" detail={false}>
                  <IonIcon aria-hidden="true" slot="start" icon={logOutOutline} color="danger" />
                  <IonLabel color="danger">Sair</IonLabel>
                </IonItem>
              </IonMenuToggle>
            </>
          )}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;