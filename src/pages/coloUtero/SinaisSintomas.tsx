import React from 'react'
import { IonContent } from '@ionic/react'
import styled from 'styled-components'
import { useHistory } from 'react-router'
import AppLayout from '../../components/appLayout'

const ContentBox = styled.div`
  text-align: justify;
  border-radius: 10px;
  padding: 20px;
  margin: 70px 20px 20px 20px;
  color: var(--ion-color-text);

  & a {
    text-decoration: none;
    color: pink;
  }
`

const SinaisSintomasColoUtero: React.FC = () => {
  const history = useHistory()

  return (
    <AppLayout title='Sinais e Sintomas' history={history}>
      <IonContent>
        <ContentBox>
          <p>
            Quando começa, o câncer cervical pode não causar sintomas. Conforme cresce, o câncer cervical pode causar
            sinais e sintomas, como:
          </p>
          <ul>
            <li>Sangramento vaginal após a relação sexual, entre os períodos ou após a menopausa.</li>
            <li>Sangramento menstrual mais intenso e duradouro que o normal.</li>
            <li>Corrimento vaginal aquoso e sanguinolento, que pode ser abundante e ter odor desagradável.</li>
            <li>Dor pélvica ou dor durante a relação sexual.</li>
          </ul>

          <p>
            <strong>Referência</strong>
            <ul>
              <li>
                Inca – Instituto Nacional de Câncer.
                <a
                  href='https://www.gov.br/inca/pt-br/assuntos/gestor-e-profissional-de-saude/controle-do-cancer-de-mama/'
                  target='_blank'
                >
                  https://www.gov.br/inca/pt-br/assuntos/gestor-e-profissional-de-saude/controle-do-cancer-de-mama/
                </a>
              </li>
              <li>
                American Cancer Society.
                <a
                  href='https://www.cancer.org/cancer/types/breast-cancer/about/how-does-breast-cancer-form.html'
                  target='_blank'
                >
                  https://www.cancer.org/cancer/types/breast-cancer/about/how-does-breast-cancer-form.html
                </a>
              </li>
            </ul>
          </p>
        </ContentBox>
      </IonContent>
    </AppLayout>
  )
}

export default SinaisSintomasColoUtero
