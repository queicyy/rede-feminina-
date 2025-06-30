import React from 'react'
import AppLayout from '../../../components/appLayout'
import { Body, Container, Description, Header, Img, WrapperDoacao } from '../style'
import CardText from '../../../components/common/CardText/CardText'
import { useHistory } from 'react-router'

const ColaboraPix: React.FC = () => {
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
            <Img src='assets/images/pix.jpeg' width={'150px'} />
            <div style={{ display: 'flex', flexDirection: 'column', width: '40%' }}>
              <Description>
                <strong>Pix:</strong> 04.687.114/0001-02
              </Description>
              <Description>
                <strong>Depósito:</strong> Banco do Brasil
              </Description>
              <Description>Agência 3164-X CC 9118-9</Description>
            </div>
          </WrapperDoacao>
        </Body>
      </Container>
    </AppLayout>
  )
}

export default ColaboraPix
