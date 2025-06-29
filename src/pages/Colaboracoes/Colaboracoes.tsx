import React, { Fragment } from 'react'
import AppLayout from '../../components/appLayout'
import { Body, Container, Description, Header, Img, WrapperDoacao } from './style'
import CardText from '../../components/common/CardText/CardText'
import { useHistory } from 'react-router'
import CardsMain from '../../components/Cards'
import { fakeCardsColabora } from '../../helpers/fakeCardsMain'

const Colaboracoes: React.FC = () => {
  const history = useHistory()
  return (
    <AppLayout title='Colaborações' history={history}>
      <Container>
        <Header>
          <div style={{ fontSize: '25px', textTransform: 'uppercase' }}>Colabore com a rede</div>
        </Header>

        <Body>
          <Description width='50%'>
            Sua solidariedade ajuda a rede feminina de combate ao Câncer de Itapema a manter seus atendimentos.
          </Description>
          <div style={{ marginBottom: '70px' }}></div>

          <WrapperDoacao>
            {fakeCardsColabora.map((element, key) => {
              return (
                <Fragment key={key}>
                  <CardsMain data={element} />
                </Fragment>
              )
            })}
          </WrapperDoacao>
        </Body>
      </Container>
    </AppLayout>
  )
}

export default Colaboracoes
