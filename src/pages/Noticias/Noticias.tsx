import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import AppLayout from "../../components/appLayout";
import { useHistory } from "react-router-dom";
import { IonSpinner } from "@ionic/react";

import useNoticias from "../../hooks/useNoticias";
import { INews } from "../../types/noticias.types";

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const NewsContainer = styled.div`
  padding: 20px;
  animation: ${fadeIn} 0.6s ease-in;
`;

const NewsCard = styled.div`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 16px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s ease;
  &:hover {
    transform: translateY(-2px);
  }
`;

const NewsImage = styled.img`
  width: 100%;
  height: 160px;
  object-fit: cover;
  background: #ffcbdb;
`;

const NewsBody = styled.div`
  padding: 16px;
`;

const NewsTitle = styled.h2`
  font-size: 17px;
  font-weight: 700;
  color: #b8005c;
  margin: 0 0 6px 0;
`;

const NewsDate = styled.p`
  font-size: 13px;
  color: #999;
  margin: 0;
`;

const NoticiasScreen: React.FC = () => {
  const history = useHistory();
  const { allNews } = useNoticias();
  const [newsData, setNewsData] = useState<INews[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const response = await allNews();
      setNewsData(response);
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout title="Notícias" history={history}>
      <NewsContainer>
        {loading ? (
          <div style={{ textAlign: "center", marginTop: "40px" }}>
            <IonSpinner name="crescent" />
          </div>
        ) : newsData.length === 0 ? (
          <p style={{ textAlign: "center", color: "#999" }}>Nenhuma notícia publicada ainda.</p>
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
              <NewsBody>
                <NewsTitle>{news.title}</NewsTitle>
                <NewsDate>{news.date}</NewsDate>
              </NewsBody>
            </NewsCard>
          ))
        )}
      </NewsContainer>
    </AppLayout>
  );
};

export default NoticiasScreen;