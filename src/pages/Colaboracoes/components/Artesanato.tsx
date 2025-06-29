import React from 'react'
import AppLayout from '../../../components/appLayout'
import { Body, Container, Description, GridWrapper, ColumnTwo, Section, ImageContainer, Img, FooterInfo } from './style'
import { useHistory } from 'react-router-dom'

export default function Artesanato() {
  const history = useHistory()

  return (
    <AppLayout title='Artesanato e Costuras' history={history}>
      <Container>
        <Body>
          <Description>
            <ImageContainer>
              <Img src={'assets/images/artesanato.jpg'} />
            </ImageContainer>
            É o setor que confecciona e vende trabalhos manuais de costura, crochê, tricô, patchwork entre outros. As
            peças são confeccionadas pelas voluntárias do setor, com materiais recebidos em doação e vendidas nos
            eventos e na sede da Rede Feminina. Os valores arrecadados com a venda das peças são totalmente utilizados
            na manutenção da entidade.
          </Description>
        </Body>
      </Container>
    </AppLayout>
  )
}
