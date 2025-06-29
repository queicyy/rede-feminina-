import styled from 'styled-components'

export const Container = styled.div`
  padding: 20px; /* Espaçamento para o conteúdo */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const Header = styled.div``

export const Img = styled.img``

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`

export const Description = styled.div<{ width?: string }>`
  width: ${(prop) => prop.width ?? '100%'};
  font-weight: 600;
  text-align: center;
  margin-right: 25px;
`

export const WrapperDoacao = styled.div`
  display: flex;
  width: 50%;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
  height: auto;
  padding: 20px;
  background-color: pink;
  border-radius: 20px;

@media screen {
  width: 90%;
}
`

export const WrapperSocial = styled.div`
  display: flex;
  flex-direction: row;
  width: 320px;
  margin-top: 20px;
  justify-content: space-between;

  & a {
    text-decoration: none;
    color: white;
  }
`

export const SocialIcon = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  border-radius: 50%;
  background-color: pink;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`
