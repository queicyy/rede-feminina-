import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { IonIcon } from "@ionic/react";
import { calendarOutline } from "ionicons/icons";
import AppLayout from "../../components/appLayout";
import { useHistory } from "react-router-dom";
import useEventos from "../../hooks/useEventos";
import { IEvento } from "../../types/eventos.types";

const Container = styled.div`
  padding: 20px;
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: #b8005c;
  margin-bottom: 4px;
`;

const SectionLine = styled.div`
  width: 40px;
  height: 3px;
  background: #d81b60;
  border-radius: 20px;
  margin-bottom: 20px;
`;

const EventoCard = styled.div`
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  margin-bottom: 20px;
  overflow: hidden;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
  }
`;

const EventoImage = styled.img`
  width: 100%;
  height: auto;
  max-height: 350px;
  object-fit: contain;
  background: #fff;
`;
const EventoBody = styled.div`
  padding: 16px;
`;

const EventoTitulo = styled.h3`
  font-size: 16px;
  font-weight: 700;
  color: #222;
  margin: 0 0 10px 0;
  text-transform: uppercase;
`;

const EventoInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const EventoMeta = styled.p`
  font-size: 13px;
  color: #666;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const EventoPreco = styled.p`
  font-size: 16px;
  font-weight: 700;
  color: #d81b60;
  margin: 10px 0 0 0;
`;

const EventoDescricao = styled.p`
  font-size: 13px;
  color: #444;
  margin: 10px 0 0 0;
  line-height: 1.6;
`;

const EmptyMessage = styled.p`
  color: #999;
  font-size: 14px;
  text-align: center;
  margin-top: 40px;
`;

const LoadingMessage = styled.p`
  color: #999;
  font-size: 14px;
  text-align: center;
  margin-top: 40px;
`;

const EventosPage: React.FC = () => {
  const history = useHistory();
  const { getAllEventos } = useEventos();
  const [eventos, setEventos] = useState<IEvento[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEventos() {
      try {
        const data = await getAllEventos();
        setEventos(data);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    }
    fetchEventos();
  }, []);

  return (
    <AppLayout title="Próximos Eventos" history={history}>
      <Container>
        <Title>Próximos Eventos</Title>
        <SectionLine />

        {loading ? (
          <LoadingMessage>Carregando eventos...</LoadingMessage>
        ) : eventos.length === 0 ? (
          <EmptyMessage>Nenhum evento cadastrado ainda.</EmptyMessage>
        ) : (
          eventos.map((evento) => (
            <EventoCard key={evento.id}>
              <EventoImage
                src={evento.imageUrl || "/assets/images/logo_rfcc.png"}
                alt={evento.titulo}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/assets/images/logo_rfcc.png";
                }}
              />
              <EventoBody>
                <EventoTitulo>{evento.titulo}</EventoTitulo>
                <EventoInfo>
                  {evento.data && (
                    <EventoMeta>
                    <IonIcon icon={calendarOutline} style={{ flexShrink: 0 }} />
                    {evento.data}{evento.horario ? ` • ${evento.horario}` : ""}
                    </EventoMeta>
)}
                  {evento.local && <EventoMeta>📍 {evento.local}</EventoMeta>}
                  {evento.endereco && <EventoMeta>🗺️ {evento.endereco}</EventoMeta>}
                </EventoInfo>
                {evento.preco && <EventoPreco>{evento.preco}</EventoPreco>}
                {evento.descricao && <EventoDescricao>{evento.descricao}</EventoDescricao>}
              </EventoBody>
            </EventoCard>
          ))
        )}
      </Container>
    </AppLayout>
  );
};

export default EventosPage;