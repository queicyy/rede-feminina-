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
  IonBackButton,
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
            <IonBackButton defaultHref="/" />
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
                  <IonCardContent style={{ flexGrow: 1 }}>
                    <p
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {item.description}
                    </p>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>

        {/* Modal de Detalhes do Produto */}
        <IonModal isOpen={!!selectedItem} onDidDismiss={() => setSelectedItem(null)}>
          <IonHeader>
            <IonToolbar color="">
              <IonTitle>Detalhes do Item</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setSelectedItem(null)}>
                  <IonIcon slot="icon-only" icon={closeOutline} />
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            {selectedItem && (
              <div
                style={{
                  textAlign: "center",
                  maxWidth: "600px",
                  margin: "0 auto",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <img
                  src={selectedItem.imageUrl}
                  alt={selectedItem.title}
                  style={{
                    borderRadius: "8px",
                    maxHeight: "220px",
                    objectFit: "contain",
                    width: "100%",
                    marginBottom: "20px",
                    display: "block",
                  }}
                />

                <h2 style={{ marginTop: "0" }}>{selectedItem.title}</h2>
                <h3 style={{ color: "var(--ion-color-success)", fontWeight: "bold", fontSize: "1.5rem" }}>
                  R$ {selectedItem.price.toFixed(2).replace(".", ",")}
                </h3>

                <div
                  style={{
                    padding: "15px",
                    backgroundColor: "#f9f9f9",
                    borderRadius: "8px",
                    marginTop: "20px",
                    marginBottom: "30px",
                    textAlign: "left",
                  }}
                >
                  <p style={{ fontSize: "1.1rem", lineHeight: "1.6" }}>{selectedItem.description}</p>
                </div>

                <IonButton expand="block" color="success" size="large" onClick={() => handleOpenWhatsApp(selectedItem)}>
                  <IonIcon slot="start" icon={logoWhatsapp} />
                  Comprar pelo WhatsApp
                </IonButton>
              </div>
            )}
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Mostruario;
