import React, { useState } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonImg,
  IonModal,
  IonButton,
  IonIcon,
  IonButtons,
  IonMenuButton,
} from "@ionic/react";
import { logoWhatsapp, closeOutline } from "ionicons/icons";
import { showroomItems, ShowroomItem } from "../../helpers/showroomData";

const Mostruario: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<ShowroomItem | null>(null);

  const adminPhone = import.meta.env.VITE_WHATSAPP_ADMIN_SCHEDULE;

  const handleOpenWhatsApp = (item: ShowroomItem) => {
    const text = `Olá! Estava navegando no site da Rede Feminina e tenho interesse em comprar o item: *${
      item.title
    }* (R$ ${item.price.toFixed(2).replace(".", ",")}). Como podemos dar andamento?`;
    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/${adminPhone}?text=${encodedText}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Vitrine Virtual</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <h2>Artesanatos Solidários</h2>
          <p>
            Toda a renda arrecadada com a venda das peças é revertida para a manutenção da nossa instituição. Escolha o
            seu item favorito e entre em contato via WhatsApp para finalizar a compra!
          </p>
        </div>

        <IonGrid>
          <IonRow>
            {showroomItems.map((item) => (
              <IonCol size="12" sizeMd="6" sizeLg="4" key={item.id}>
                <IonCard
                  button
                  onClick={() => setSelectedItem(item)}
                  style={{ display: "flex", flexDirection: "column", height: "100%" }}
                >
                  <IonImg
  src={item.imageUrl}
  alt={item.title}
  style={{
    height: "300px",
    width: "100%",
    objectFit: "contain",
    backgroundColor: "#fff"
  }}
/>
                  <IonCardHeader>
                    <IonCardTitle style={{ fontSize: "1.2rem" }}>{item.title}</IonCardTitle>
                    <IonCardSubtitle color="success" style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                      R$ {item.price.toFixed(2).replace(".", ",")}
                    </IonCardSubtitle>
                  </IonCardHeader>
                  <IonCardContent style={{ flexGrow: 1 }}>{item.description}</IonCardContent>
                </IonCard>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>

        <IonModal isOpen={selectedItem !== null} onDidDismiss={() => setSelectedItem(null)}>
          {selectedItem && (
            <>
              <IonHeader>
                <IonToolbar>
                  <IonTitle>{selectedItem.title}</IonTitle>
                  <IonButtons slot="end">
                    <IonButton onClick={() => setSelectedItem(null)}>
                      <IonIcon icon={closeOutline} />
                    </IonButton>
                  </IonButtons>
                </IonToolbar>
              </IonHeader>
              <IonContent className="ion-padding">
                <IonImg
                  src={selectedItem.imageUrl}
                  alt={selectedItem.title}
                  style={{ height: "300px", objectFit: "contain", marginBottom: "16px" }}
                />
                <h2>{selectedItem.title}</h2>
                <p style={{ fontWeight: "bold", color: "green", fontSize: "1.2rem" }}>
                  R$ {selectedItem.price.toFixed(2).replace(".", ",")}
                </p>
                <p>{selectedItem.description}</p>
                <IonButton expand="block" color="success" onClick={() => handleOpenWhatsApp(selectedItem)}>
                  <IonIcon icon={logoWhatsapp} slot="start" />
                  Comprar via WhatsApp
                </IonButton>
              </IonContent>
            </>
          )}
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Mostruario;