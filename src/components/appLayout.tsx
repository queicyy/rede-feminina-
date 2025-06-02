import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonContent,
  IonBackButton,
} from '@ionic/react'

import { chevronBack } from 'ionicons/icons'

export default function AppLayout({ title, children }: { title: string; children: React.ReactNode; history: any }) {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonBackButton icon={chevronBack}></IonBackButton>
          </IonButtons>
          <IonTitle>{title}</IonTitle>
          <IonButtons slot='end'>
            <IonMenuButton />
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>{children}</IonContent>
    </IonPage>
  )
}
