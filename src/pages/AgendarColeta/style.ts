import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
`

export const Img = styled.img``

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  text-align: justify;
  margin-top: 20px;
`

export const Description = styled.div<{ width?: string }>`
  width: ${(prop) => prop.width ?? '100%'};
  font-weight: 600;
  text-align: center;
`

export const WrapperDonation = styled.div`
  display: flex;
  width: 50%;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
  height: 150px;
  background-color: pink;
  border-radius: 20px;
`

export const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 40%;
  border-left: 2px solid black;
  height: 100%;
`
