import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton,
  IonSpinner,
} from "@ionic/react";
import { chevronBack } from "ionicons/icons";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";
import useNoticias from "../../../hooks/useNoticias";
import { INews } from "../../../types/noticias.types";

const CoverImage = styled.img`
  width: 100%;
  max-height: 300px;
  object-fit: contain;
  display: block;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(184, 0, 92, 0.15);
  background: #f5f5f5;
  margin: 0 auto;
`;

const ArticleContainer = styled.div`
  padding: 20px;
  max-width: 700px;
  margin: 0 auto;
  padding-top: 16px;
`;

const ArticleDate = styled.p`
  font-size: 13px;
  color: #999;
  margin: 0 0 6px 0;
`;

const ArticleTitle = styled.h1`
  font-size: 22px;
  font-weight: 800;
  color: #b8005c;
  margin: 0 0 16px 0;
  line-height: 1.3;
`;

const ArticleBody = styled.div`
  font-size: 16px;
  line-height: 1.7;
  color: #333;

  h2 {
    font-size: 18px;
    font-weight: 700;
    color: #b8005c;
    margin: 24px 0 10px 0;
  }

  p {
    margin: 0 0 14px 0;
  }

  ul {
    margin: 0 0 14px 0;
    padding-left: 20px;
  }

  li {
    margin-bottom: 6px;
  }

  strong {
    color: #222;
  }
`;

const NoticiaDetalhe: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { allNews } = useNoticias();
  const [noticia, setNoticia] = useState<INews | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNoticia();
  }, [id]);

  const fetchNoticia = async () => {
    setLoading(true);
    try {
      const data = await allNews();
      const found = data.find((n) => n.id === id) || null;
      setNoticia(found);
    } catch (error) {
      console.error("Erro ao carregar notícia:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="">
          <IonButtons slot="start">
            <IonBackButton icon={chevronBack} defaultHref="/noticias" />
          </IonButtons>
          <IonTitle>Notícia</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {loading ? (
          <div style={{ textAlign: "center", marginTop: "60px" }}>
            <IonSpinner name="crescent" />
          </div>
        ) : !noticia ? (
          <p style={{ textAlign: "center", color: "#999", marginTop: "60px" }}>Notícia não encontrada.</p>
        ) : (
          <>
            {noticia.imageUrl && (
              <div style={{ padding: "16px 16px 0 16px" }}>
                <CoverImage src={noticia.imageUrl} alt={noticia.title} />
              </div>
            )}
            <ArticleContainer>
              <ArticleDate>{noticia.date}</ArticleDate>
              <ArticleTitle>{noticia.title}</ArticleTitle>
              <ArticleBody>
                <ReactMarkdown>{noticia.content}</ReactMarkdown>
              </ArticleBody>
            </ArticleContainer>
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default NoticiaDetalhe;