import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: justify;
  margin: 18px 32px 32px 32px;
  line-height: 1.5;

  p {
    margin: 0;
  }
`

export const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-radius: 8px;
`

export const Img = styled.img``

export const Body = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`

export const Description = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 24px;

  > li {
    margin-bottom: 4px;
  }

  img {
    border-radius: 4px;
    max-height: 200px;
  }

  & p {
    margin-top: 20px;
  }

  & a {
    text-decoration: none;
    transition: 0.3s ease-in-out;
  }

  & a:hover {
    color: pink;
    text-decoration: underline;
    transition: 200ms ease-in-out;
  }
`

export const GridWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  flex-wrap: wrap;
  width: 100%;
  gap: 24px;

  .img-section {
    @media (max-width: 768px) {
      order: -1;
      width: 100%;
      display: flex;
      align-items: center;
    }
  }
`

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  width: 45%;
  height: fit-content;

  img {
    margin-top: 8px;
  }

  ul {
    margin: 0;
    text-align: left;

    li {
      margin: 8px 0;
    }
  }

  .dashed {
    list-style-type: none;
    ::before {
      content: '-';
      margin-right: 8px;
    }
  }

  @media (max-width: 550px) {
    width: 100%;
  }
`

export const FooterInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;

  p {
    font-weight: bold;
    font-size: 18px;
  }

  a {
    margin: 4px;
  }
`
