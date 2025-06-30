import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from '@ionic/react';

import { useLocation } from 'react-router-dom';
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
  enterSharp,
} from 'ionicons/icons';
import './Menu.css';
import { useFirebase } from '../FirebaseContext';

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: 'Login',
    url: '/login',
    iosIcon: mailOutline,
    mdIcon: enterSharp,
  },
  {
    title: 'Página Inicial',
    url: '/',
    iosIcon: mailOutline,
    mdIcon: homeSharp,
  },
  {
    title: 'Câncer de Mama',
    url: '/cancer/mama',
    iosIcon: womanOutline,
    mdIcon: womanSharp,
  },
  {
    title: 'Câncer do Colo do Útero',
    url: '/cancer/colo-utero',
    iosIcon: femaleOutline,
    mdIcon: femaleSharp,
  },
  {
    title: 'Colaborações',
    url: '/sobre/colaboracoes',
    iosIcon: heartOutline,
    mdIcon: heartSharp,
  },
  {
    title: 'Notícias',
    url: '/noticias',
    iosIcon: newspaperOutline,
    mdIcon: newspaperSharp,
  },
  {
    title: 'Agendar Coleta',
    url: '/agendar-coleta',
    iosIcon: bookOutline,
    mdIcon: bookSharp,
  },
  {
    title: 'Sobre',
    url: '/sobre',
    iosIcon: helpCircleOutline,
    mdIcon: helpCircleSharp,
  },
  {
    title: 'Contato',
    url: '/contato',
    iosIcon: helpCircleOutline,
    mdIcon: helpCircleSharp,
  },
];

const Menu: React.FC = () => {
  const location = useLocation();
  const { user } = useFirebase();

  return (
    <IonMenu contentId='main' type='overlay'>
      <IonContent>
        <IonList id='inbox-list'>
          <IonListHeader>RFCC Itapema</IonListHeader>
          <IonNote>rfccitapema@outlook.com</IonNote>
          {appPages
            .filter((appPage) => {
              if (appPage.title === 'Login' && user) {
                return false;
              }
              return true;
            })
            .map((appPage, index) => {
              return (
                <IonMenuToggle key={index} autoHide={false}>
                  <IonItem
                    className={location.pathname === appPage.url ? 'selected' : ''}
                    routerLink={appPage.url}
                    routerDirection='none'
                    lines='none'
                    detail={false}
                  >
                    <IonIcon aria-hidden='true' slot='start' ios={appPage.iosIcon} md={appPage.mdIcon} />
                    <IonLabel>{appPage.title}</IonLabel>
                  </IonItem>
                </IonMenuToggle>
              );
            })}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
