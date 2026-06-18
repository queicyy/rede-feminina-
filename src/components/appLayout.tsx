import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonContent,
  IonBackButton,
} from "@ionic/react";
import { chevronBack } from "ionicons/icons";

export default function AppLayout({
  title,
  children,
  showBack = false,
}: {
  title: string;
  children: React.ReactNode;
  showBack: boolean;
}) {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">{showBack ? <IonBackButton icon={chevronBack} /> : <IonMenuButton />}</IonButtons>
          <IonTitle>{title}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>{children}</IonContent>
    </IonPage>
  );
}
