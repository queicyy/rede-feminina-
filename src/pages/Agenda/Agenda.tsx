import React, { useEffect, useState } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonMenuButton,
  IonSpinner,
  IonIcon,
} from "@ionic/react";
import { calendarOutline, timeOutline, locationOutline } from "ionicons/icons";
import styled from "styled-components";
import useAgenda from "../../hooks/useAgenda";
import { IAgendaItem } from "../../types/agenda.types";

const Card = styled.div`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  padding: 16px;
  margin-bottom: 14px;
`;

const CardTitle = styled.h3`
  font-size: 16px;
  font-weight: 700;
  color: #b8005c;
  margin: 0 0 10px 0;
`;

const MetaRow = styled.p`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #555;
  margin: 0 0 4px 0;
`;

const Description = styled.p`
  font-size: 14px;
  color: #444;
  margin-top: 10px;
  line-height: 1.5;
`;

const Agenda: React.FC = () => {
  const { getAllItems } = useAgenda();
  const [items, setItems] = useState<IAgendaItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const data = await getAllItems();
      setItems(data);
    } catch (error) {
      console.error("Erro ao carregar agenda:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Agenda da Rede</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <h2>Agenda da Rede</h2>
          <p>
            Confira as próximas ações de saúde e atendimentos realizados pela Rede Feminina de Combate ao Câncer de
            Itapema.
          </p>
        </div>

        {loading ? (
          <div style={{ textAlign: "center", marginTop: "40px" }}>
            <IonSpinner name="crescent" />
          </div>
        ) : items.length === 0 ? (
          <p style={{ textAlign: "center", color: "#999" }}>Nenhum item cadastrado na agenda ainda.</p>
        ) : (
          items.map((item) => (
            <Card key={item.id}>
              <CardTitle>{item.titulo}</CardTitle>
              {item.data && (
                <MetaRow>
                  <IonIcon icon={calendarOutline} style={{ flexShrink: 0 }} />
                  {item.data}
                </MetaRow>
              )}
              {item.horario && (
                <MetaRow>
                  <IonIcon icon={timeOutline} style={{ flexShrink: 0 }} />
                  {item.horario}
                </MetaRow>
              )}
              {item.local && (
                <MetaRow>
                  <IonIcon icon={locationOutline} style={{ flexShrink: 0 }} />
                  {item.local}
                </MetaRow>
              )}
              {item.descricao && <Description>{item.descricao}</Description>}
            </Card>
          ))
        )}
      </IonContent>
    </IonPage>
  );
};

export default Agenda;