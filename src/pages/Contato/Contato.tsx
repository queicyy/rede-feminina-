import React from 'react'
import AppLayout from '../../components/appLayout'
import { Body, Container, Description, Header, Img, SocialIcon, WrapperDoacao, WrapperSocial } from './style'
import CardText from '../../components/common/CardText/CardText'
import { useHistory } from 'react-router'
import { IonIcon } from '@ionic/react'
import { logoFacebook, logoInstagram } from 'ionicons/icons'
import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Contato: React.FC = () => {
  const history = useHistory()

  return (
    <AppLayout title='Contato' history={history}>
      <Container>
        <Header>
          <CardText text='Fale conosco pelos canais' fontSize='20px' />
        </Header>

        <Body>
          <WrapperDoacao>
            <Description width='40%'>
              <div style={{ marginBottom: '10px' }}>
                <Description>
                  <strong>Endereço:</strong>
                </Description>
              </div>
              <Description>Rua 262, Nº 119, </Description>
              <Description>Itapema - SC, 88220-000</Description>

              <Description>
                <div style={{ marginBottom: '10px', marginTop: '10px' }}>
                  <strong>Contato:</strong>
                </div>
              </Description>
              <Description>(47) 3368-4833</Description>
              <Description>rfccitapema@outlook.com</Description>
            </Description>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '40%',
                paddingLeft: '20px',
                borderLeft: '2px solid black',
                height: '100px',
                justifyContent: 'center',
              }}
            >
              <Description>
                <div style={{ marginBottom: '10px', marginTop: '10px' }}>
                  <strong>Horário de Atendimento:</strong>
                </div>
              </Description>

              <Description>De Segunda a Sexta</Description>
              <Description>das 08hr às 11hr e das 13:30hr às 17hr</Description>
            </div>
          </WrapperDoacao>

          <WrapperSocial>
            <a href={'https://www.instagram.com/redefemininadeitapema/'} target='_blank'>
              <SocialIcon>
                <FaInstagram fontSize={'35px'} />
              </SocialIcon>
            </a>
            <SocialIcon>
              <a href={'https://www.facebook.com/redefemininaitapema/'} target={'_blank'}>
                <FaFacebook fontSize={'35px'} />
              </a>
            </SocialIcon>
            <SocialIcon>
              <a href={'https://api.whatsapp.com/send?phone=554733684833'} target={'_blank'}>
                <FaWhatsapp fontSize={'35px'} />
              </a>
            </SocialIcon>
          </WrapperSocial>
        </Body>
      </Container>
    </AppLayout>
  )
}

export default Contato
