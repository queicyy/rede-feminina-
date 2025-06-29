import React from 'react'
import AppLayout from '../../../components/appLayout'
import { Body, Container, Description, GridWrapper, ColumnTwo, Section, ImageContainer, Img, FooterInfo } from './style'
import { useHistory } from 'react-router-dom'

export default function DoacoesCabelo() {
  const history = useHistory()

  return (
    <AppLayout title='Doações de Cabelo' history={history}>
      <Container>
        <Body>
          <Description>
            <ImageContainer>
              <Img src={'assets/images/24-2thumb.jpg'} />
            </ImageContainer>
            <ColumnTwo>
              Confecção de perucas oferece uma oportunidade de recuperação da autoestima para quem está na luta contra o
              câncer. A Rede Feminina de Combate ao Câncer oferece uma ajuda especial nestes casos, uma vez que manter a
              autoestima de uma mulher interfere diretamente em sua saúde psicológica e, consequentemente em sua
              recuperação. Na instituição, são oferecidas perucas e lenços às pacientes, para que elas escolham a opção
              que mais lhe ajude a se sentir bem consigo mesma. As perucas são confeccionadas com cabelo natural, vindo
              de doações da comunidade. Na sede da Rede Feminina há uma caixa coletora do Projeto "Fios de Alegria",
              para armazenar o cabelo doado e, diariamente, chegam novas contribuições da comunidade, seja de homens ou
              mulheres.
            </ColumnTwo>
            <div>
              <ul>
                <li>
                  <strong>Como faz para doar cabelo? Orientações:</strong>
                  <p></p>
                </li>
                <span>
                  Corte o cabelo seco, em sua forma natural. Os cabelos precisam ter, no mínimo, 20cm para ter melhor
                  aproveitamento. Ao contrário do que muitos dizem, não importa se tem química ou é pintado. Para
                  doação, as mechas tem que ser separadas e emborrachadas, para não se desfazer. O cabelo também é
                  considerado como um órgão que pode ser aproveitado desde que esteja em perfeito estado. Para ser
                  armazenado, os mesmos devem estar secos. Peça o seu cabeleireiro para cortar da melhor forma possível
                  para fazer a doação. Leve ao um posto de coleta ou mesmo em alguma Rede Feminina de Combate ao Câncer.
                  Obs: Para confeccionar uma peruca, são necessários pelo menos 300g de cabelos. Por isso, cada peruca
                  usa pelo menos três doações. Os cabelos são misturados com outros da textura mais próxima possível. A
                  peruca é confeccionada sem corte mesmo: quem faz o empréstimo só pode cortá-la de acordo com a
                  autorização da instituição.
                </span>
              </ul>
            </div>
          </Description>
        </Body>
      </Container>
    </AppLayout>
  )
}
