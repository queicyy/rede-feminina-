import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 0 32px;

  @media screen {
    display: flex;
    max-width: 100%;
    flex-direction: column;
  }
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
`

export const Header = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;

  h1 {
    font-size: 20px;
    text-align: center;
    font-weight: 700;
    text-transform: uppercase;
  }
`

export const WrapperBody = styled.div`
  a {
    text-decoration: none;
    color: #000;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    justify-content: center;
  }
`

export const ContentColumn = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
`

interface IWrapperCard {
  background?: string
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

  background: ${(props) => (props.background ? props.background : '#ffcbdb')};
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
`

export const ImageCard = styled.img``

export const ContentCard = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  text-transform: uppercase;
  font-weight: 500;
  font-family: "playFair+Display";
  margin-top: 10px;
`
