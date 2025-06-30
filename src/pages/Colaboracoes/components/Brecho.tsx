import React from 'react'
import AppLayout from '../../../components/appLayout'
import { Body, Container, Description, GridWrapper, ColumnTwo, Section, ImageContainer, Img, FooterInfo } from './style'
import { useHistory } from 'react-router-dom'

export default function Brecho() {
  const history = useHistory()

  return (
    <AppLayout title='Brechó' history={history}>
      <Container>
        <Body>
          <Description>
            <ImageContainer>
              <Img src={'assets/images/brecho.jpg'} />
            </ImageContainer>
            <p>
              O brechó é uma importante fonte de recursos da Rede Feminina. As peças são recebidas em doação da
              comunidade, comercio e voluntárias. São roupas novas e usadas, acessórios e calçados, cuja renda obtida
              com a venda desses itens, são totalmente destinadas à manutenção dos nossos atendimentos.
              <div></div>
              <div style={{ marginTop: '10px' }}></div>
              Aberto de segunda a sexta-feira das 13h30 às 16:45h
            </p>
          </Description>
        </Body>
      </Container>
    </AppLayout>
  )
}
