import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;

  @media screen {
    display: flex;
    max-width: 100%;
    flex-direction: column;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Header = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 16px;

  h1 {
    font-size: 13px;
    text-align: center;
    font-weight: 500;
    color: #999;
    text-transform: uppercase;
  }
`;

export const WrapperBody = styled.div`
  width: 100%;

  a {
    text-decoration: none;
    color: #000;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    justify-content: center;
  }
`;

export const ContentColumn = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
  padding: 0 16px;
`;

interface IWrapperCard {
  background?: string;
}

export const WrapperCard = styled.div<IWrapperCard>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 30%;
  height: 150px;
  padding: 15px;
  margin: 15px;

  background: ${(props) => (props.background ? props.background : "#ffcbdb")};
  border-radius: 15px;
  transition: 0.2s ease-in-out;
  box-shadow: 0px 0px 4px #000000;
  cursor: pointer;
  color: #000;

  &:hover {
    box-shadow: 0px 0px 10px #000000;
  }

  @media screen {
    display: flex;
    width: 40%;
    flex-direction: column;
  }

  @media (max-width: 560px) {
    height: 200px;
    padding: 20px;
    width: 100%;
  }
`;

export const ImageCard = styled.img``;

export const ContentCard = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  text-transform: uppercase;
  font-weight: 500;
  font-family: "playFair+Display";
  margin-top: 10px;
`;

/* ── BANNER ── */
export const BannerHome = styled.div`
  width: 100%;
  min-height: 220px;
  background: linear-gradient(135deg, #ffd5e2, #ffb6cf);
  padding: 30px;
  margin-bottom: 0;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;

  .banner-text {
    display: flex;
    flex-direction: column;
  }

  img {
    width: 110px;
    flex-shrink: 0;
  }

  h2 {
    font-size: 28px;
    color: #b8005c;
    font-weight: 800;
    margin-bottom: 10px;
  }

  p {
    font-size: 15px;
    color: #333;
  }

  button {
    margin-top: 16px;
    background: #d81b60;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
    font-size: 14px;
    text-transform: uppercase;
    transition: 0.2s;
    width: fit-content;
  }

  button:hover {
    background: #c2185b;
  }

  @media (max-width: 768px) {
    flex-direction: row;
    text-align: left;

    h2 {
      font-size: 20px;
    }

    img {
      width: 80px;
    }
  }

  @media (max-width: 380px) {
    padding: 20px;

    h2 {
      font-size: 17px;
    }

    img {
      width: 65px;
    }
  }
`;

export const BannerSlide = styled.div`
  width: 100%;
  height: 220px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

/* ── ACESSO RÁPIDO ── */
export const QuickAccess = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-bottom: 32px;
  padding: 0 16px;
`;

export const QuickCard = styled.div`
  background: #ffcbdb;
  border-radius: 15px;
  padding: 16px 8px;
  width: 100%;
  min-height: 80px;
  font-size: 26px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  cursor: pointer;
  transition: 0.2s;
  box-shadow: 0px 0px 4px #00000022;

  &:hover {
    transform: translateY(-3px);
  }

  span {
    margin-top: 8px;
    font-weight: 600;
    font-size: 11px;
    text-align: center;
    text-transform: uppercase;
    color: #333;
  }

  @media (max-width: 480px) {
    font-size: 22px;
    min-height: 70px;
    padding: 12px 4px;

    span {
      font-size: 9px;
    }
  }
`;

export const SectionLine = styled.div`
  width: 40px;
  height: 3px;
  background: #d81b60;
  border-radius: 20px;
  margin: 4px 0 16px 0;
`;

/* ── CABEÇALHO DE SEÇÃO ── */
export const SectionHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 0 16px;
  margin-bottom: 8px;

  h2 {
    font-size: 16px;
    font-weight: 700;
    color: #222;
    margin: 0;
  }
`;

export const ViewAllLink = styled.span`
  font-size: 14px;
  color: #d81b60;
  cursor: pointer;
  font-weight: 500;
  white-space: nowrap;
  padding-top: 2px;

  &:hover {
    text-decoration: underline;
  }
`;

/* ── EVENTOS ── */
export const EventCard = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  margin: 0 16px 12px 16px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

export const EventImage = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 10px;
  object-fit: cover;
  flex-shrink: 0;
  background: #ffcbdb;
`;

export const EventInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
`;

export const EventTitle = styled.h3`
  font-size: 14px;
  font-weight: 700;
  color: #222;
  margin: 0;
  text-transform: uppercase;
`;

export const EventMeta = styled.p`
  font-size: 12px;
  color: #666;
  margin: 0;
`;

/* ── NOTÍCIAS ── */
export const NewsCard = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  margin: 0 16px 12px 16px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

export const NewsImage = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 10px;
  object-fit: cover;
  flex-shrink: 0;
  background: #ffcbdb;
`;

export const NewsInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
`;

export const NewsTitle = styled.h3`
  font-size: 14px;
  font-weight: 700;
  color: #222;
  margin: 0;
  line-height: 1.3;
`;

export const NewsDate = styled.p`
  font-size: 12px;
  color: #999;
  margin: 0;
`;

/* ── SOBRE ── */
export const SobreSection = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 0 16px;
  margin-bottom: 8px;
`;

export const SobreIcon = styled.div`
  font-size: 40px;
  flex-shrink: 0;
`;

export const SobreImage = styled.img`
  width: 90px;
  height: 90px;
  object-fit: cover;
  border-radius: 12px;
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(216, 27, 96, 0.15);
`;
export const SobreText = styled.p`
  font-size: 14px;
  color: #444;
  line-height: 1.6;
  margin: 0;
`;

export const SobreLink = styled.div`
  padding: 0 16px;
  margin-bottom: 32px;
  color: #d81b60;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  &:hover {
    text-decoration: underline;
  }

  span {
    font-size: 18px;
  }
`;