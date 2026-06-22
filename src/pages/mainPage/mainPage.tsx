import {
  Container,
  Content,
  ContentColumn,
  Header,
  WrapperBody,
  BannerHome,
  BannerSlide,
  QuickAccess,
  QuickCard,
  SectionLine,
  SectionHeader,
  EventCard,
  EventImage,
  EventInfo,
  EventTitle,
  EventMeta,
  NewsCard,
  NewsImage,
  NewsInfo,
  NewsTitle,
  NewsDate,
  SobreSection,
  SobreIcon,
  SobreText,
  SobreLink,
  ViewAllLink,
} from "./styles";
import AppLayout from "../../components/appLayout";
import { IonIcon } from "@ionic/react";
import { calendarOutline } from "ionicons/icons";
import { Fragment, useEffect, useState } from "react";
import useCardsMain from "../../hooks/useCardsMain/useCardsMain";
import { ICardsMain } from "./types";
import { useHistory } from "react-router";
import CardsMain from "../../components/Cards";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import useNoticias from "../../hooks/useNoticias";
import useEventos from "../../hooks/useEventos";
import { INews } from "../../types/noticias.types";
import { IEvento } from "../../types/eventos.types";

import "swiper/css";
import "swiper/css/pagination";

export default function MainPage() {
  const [cardsData, setCardsData] = useState<ICardsMain[]>([]);
  const [newsData, setNewsData] = useState<INews[]>([]);
  const [eventos, setEventos] = useState<IEvento[]>([]);

  const history = useHistory();
  const { findAllCardsMain } = useCardsMain();
  const { allNews } = useNoticias();
  const { getAllEventos } = useEventos();

  useEffect(() => {
    async function getData() {
      await findAllCardsMain()
        .then((response) => setCardsData(response))
        .catch((e) => console.log(e));
    }

    async function getNews() {
      await allNews()
        .then((response) => setNewsData(response.slice(0, 2)))
        .catch((e) => console.log(e));
    }

    async function getEventos() {
      await getAllEventos()
        .then((response) => setEventos(response.slice(0, 2)))
        .catch((e) => console.log(e));
    }

    getData();
    getNews();
    getEventos();
  }, []);

  function renderCards(data: ICardsMain, key: number) {
    return (
      <Fragment key={key}>
        <CardsMain data={data} />
      </Fragment>
    );
  }

  return (
    <AppLayout title="" history={history}>
      <Container>
        <Content>
          <WrapperBody>

            {/* ── BANNER / CARROSSEL ── */}
            <Swiper
              modules={[Autoplay, Pagination]}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              loop={true}
              spaceBetween={0}
              slidesPerView={1}
              speed={800}
              style={{ width: "100%", paddingBottom: "30px" }}
            >
              <SwiperSlide>
                <BannerHome>
                  <div className="banner-text">
                    <h2>Juntas somos mais fortes!</h2>
                    <p>Acolhimento, prevenção e apoio no combate ao câncer.</p>
                    <button onClick={() => history.push("/sobre")}>
                      Conheça a RFCC
                    </button>
                  </div>
                  <img src="/assets/images/logo_rfcc.png" alt="RFCC" />
                </BannerHome>
              </SwiperSlide>

              <SwiperSlide>
                <BannerSlide>
                  <img src="/assets/images/troco-solidario.png" alt="Troco Solidário" />
                </BannerSlide>
              </SwiperSlide>

              <SwiperSlide>
                <BannerSlide>
                  <img src="/assets/images/exame-preventivo.png" alt="Exame Preventivo" />
                </BannerSlide>
              </SwiperSlide>
            </Swiper>

            {/* ── ACESSO RÁPIDO ── */}
            <h2 style={{ fontWeight: 700, padding: "0 16px", marginBottom: "6px" }}>
              Acesso Rápido
            </h2>
            <SectionLine style={{ margin: "0 0 16px 16px" }} />

            <QuickAccess>
            <QuickCard onClick={() => history.push("/agenda")}>
  <IonIcon icon={calendarOutline} />
  <span>Agenda da Rede</span>
</QuickCard>
              <QuickCard onClick={() => history.push("/noticias")}>
                📰<span>Notícias</span>
              </QuickCard>
              <QuickCard onClick={() => history.push("/mostruario")}>
                🛍️<span>Vitrine</span>
              </QuickCard>
              <QuickCard onClick={() => history.push("/sobre/colaboracoes")}>
                ❤️<span>Colaborações</span>
              </QuickCard>
              <QuickCard onClick={() => history.push("/contato")}>
                📞<span>Contato</span>
              </QuickCard>
              <QuickCard onClick={() => history.push("/exame-preventivo")}>
                🏥<span>Preventivo</span>
              </QuickCard>
            </QuickAccess>

            {/* ── PRÓXIMOS EVENTOS ── */}
            <SectionHeader>
              <div>
                <h2>Próximos Eventos</h2>
                <SectionLine />
              </div>
              <ViewAllLink onClick={() => history.push("/eventos")}>Ver todos</ViewAllLink>
            </SectionHeader>

            {eventos.length === 0 ? (
              <p style={{ padding: "0 16px", color: "#999", fontSize: "14px" }}>
                Nenhum evento cadastrado ainda.
              </p>
            ) : (
              eventos.map((evento) => (
                <EventCard key={evento.id} onClick={() => history.push("/eventos")}>
                  <EventImage
                    src={evento.imageUrl || "/assets/images/logo_rfcc.png"}
                    alt={evento.titulo}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/assets/images/logo_rfcc.png";
                    }}
                  />
                  <EventInfo>
                    <EventTitle>{evento.titulo}</EventTitle>
                    <EventMeta>{evento.data}{evento.horario ? ` • ${evento.horario}` : ""}</EventMeta>
                    <EventMeta>{evento.local}</EventMeta>
                    {evento.preco && (
                      <EventMeta style={{ color: "#d81b60", fontWeight: 600 }}>
                        {evento.preco}
                      </EventMeta>
                    )}
                  </EventInfo>
                  <IonIcon icon={calendarOutline} style={{ color: "#d81b60", fontSize: "20px" }} />
                </EventCard>
              ))
            )}

            {/* ── ÚLTIMAS NOTÍCIAS ── */}
            <SectionHeader style={{ marginTop: "32px" }}>
              <div>
                <h2>Últimas Notícias</h2>
                <SectionLine />
              </div>
              <ViewAllLink onClick={() => history.push("/noticias")}>Ver todas</ViewAllLink>
            </SectionHeader>

            {newsData.length === 0 ? (
              <p style={{ padding: "0 16px", color: "#999", fontSize: "14px" }}>
                Carregando notícias...
              </p>
            ) : (
              newsData.map((news) => (
                <NewsCard key={news.id} onClick={() => history.push(`/noticias/${news.id}`)}>
                  <NewsImage
                    src={news.imageUrl || "/assets/images/logo_rfcc.png"}
                    alt={news.title}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/assets/images/logo_rfcc.png";
                    }}
                  />
                  <NewsInfo>
                    <NewsTitle>{news.title}</NewsTitle>
                    <NewsDate>{news.date}</NewsDate>
                  </NewsInfo>
                </NewsCard>
              ))
            )}

            {/* ── SOBRE A RFCC ── */}
            <SectionHeader style={{ marginTop: "32px" }}>
              <div>
                <h2>Sobre a RFCC Itapema</h2>
                <SectionLine />
              </div>
            </SectionHeader>

            <SobreSection>
              <SobreIcon>🌸</SobreIcon>
              <SobreText>
                A Rede Feminina de Combate ao Câncer de Itapema trabalha desde 2001
                com acolhimento, prevenção e apoio a mulheres e suas famílias.
              </SobreText>
            </SobreSection>

            <SobreLink onClick={() => history.push("/sobre")}>
              Saiba mais sobre nós <span>›</span>
            </SobreLink>

            <ContentColumn>{cardsData.map(renderCards)}</ContentColumn>

          </WrapperBody>

          <Header>
            <h1>Esse aplicativo não exclui a necessidade de acompanhamento médico</h1>
          </Header>
        </Content>
      </Container>
    </AppLayout>
  );
}