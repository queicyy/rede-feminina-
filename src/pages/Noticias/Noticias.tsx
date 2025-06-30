import React, { Fragment, useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import AppLayout from "../../components/appLayout";
import { useHistory } from "react-router-dom";
import { FaCalendarAlt, FaRegNewspaper } from "react-icons/fa";

import useNoticias from "../../hooks/useNoticias";
import { INews } from "../../types/noticias.types";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const NewsContainer = styled.div`
  padding: 20px;
  background-color: #fff;
  animation: ${fadeIn} 1s ease-in;
`;

const NewsItem = styled.div`
  background: #ffc0cb;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.05);
  }
`;

// Definindo o tipo para NewsContent
interface NewsContentProps {
  isOpen: boolean;
}

const NewsContent = styled.div<NewsContentProps>`
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  padding: 20px;
  border-top: 1px solid #ddd;
  margin-top: 10px;
  color: #555;
`;

const NewsTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
  color: #333;
`;

const NewsDate = styled.p`
  font-size: 14px;
  color: gray;
  display: flex;
  align-items: center;
`;

const NewsText = styled.p`
  font-size: 16px;
  color: #555;
`;

const NewsIcon = styled(FaRegNewspaper)`
  margin-right: 10px;
  color: #ff69b4;
`;

const DateIcon = styled(FaCalendarAlt)`
  margin-right: 5px;
  color: #ff69b4;
`;

const NewsScreen = () => {
  // hooks
  const history = useHistory();
  const { allNews } = useNoticias();

  useEffect(() => {
    async function getNews() {
      await allNews()
        .then((response) => setNewsData(response))
        .catch((error) => {
          console.error("Error fetching news:", error);
        });
    }

    getNews();
  }, []);

  // states
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [newsData, setNewsData] = useState<INews[]>([]);

  // functions
  const toggleOpen = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const renderNews = (news: INews, index: number) => {
    return (
      <Fragment key={news.id}>
        <NewsItem onClick={() => toggleOpen(index)}>
          <NewsTitle>
            <NewsIcon />
            {news.title}
          </NewsTitle>
          <NewsDate>
            <DateIcon />
            {news.date}
          </NewsDate>
          <NewsContent isOpen={openIndex === index}>
            <NewsText>{news.content}</NewsText>
          </NewsContent>
        </NewsItem>
      </Fragment>
    );
  };

  console.log("News:", newsData);

  // render
  return (
    <AppLayout title='Notícias' history={history}>
      <NewsContainer>{newsData.length === 0 ? "Carregando..." : newsData.map(renderNews)}</NewsContainer>
    </AppLayout>
  );
};

export default NewsScreen;
