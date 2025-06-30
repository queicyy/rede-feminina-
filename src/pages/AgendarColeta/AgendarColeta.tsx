import React from 'react'
import AppLayout from '../../components/appLayout'
import { Body, Container, Description, DescriptionContainer, WrapperDonation } from './style'
import CardText from '../../components/common/CardText/CardText'
import { useHistory } from 'react-router'

export default function AgendarColetaScreen() {
  const history = useHistory()

  return (
    <AppLayout title='Agendar Coleta' history={history}>
      <Container>
        <CardText text='Orientações' fontSize='20px' />
        <Body>
          <p>
            Realiza exame preventivo do câncer de colo de útero. Os exames preventivos são coletados por enfermeira
            contratada pela entidade e analisados em laboratório terceirizado. As mamografias são encaminhadas conforme
            necessidade da paciente e realizada na clinica Ultramamo(protocolo SUS).
          </p>
          <p>
            <strong>ORIENTAÇÕES PARA EXAME PREVENTIVO DE COLO DE ÚTERO ANUAL: </strong>
          </p>
          <p>
            <ul>
              <li>A partir do momento que tiver relação sexual (menor de idade acompanhada do responsável)</li>
              <li>Sem uso de pomada</li>
              <li>8 dias após o ultimo dia da menstruação.</li>
              <li>3 dias sem relação sexual.</li>
              <li>
                <strong>Trazer seus documentos pessoais:</strong>
                Identidade, CPF e o cartão do SUS.
              </li>
            </ul>
          </p>
          <p>
            <strong>ORIENTAÇÕES PARA EXAME PREVENTIVO DE MAMA (MAMOGRAFIA) ANUAL:</strong>
          </p>
          <p>
            <ul>
              <li>Conforme protocolo do SUS.</li>
              <li>50 AOS 69 ANOS</li>
              <li>Mulheres que residem em Itapema</li>
              <li>Exceto mulheres que percebam alteração na mama, como:</li>
            </ul>
          </p>
          <p>*Inchaço ou vermelhidão de toda ou parte de uma mama- mesmo que não sinta um nódulo;</p>
          <p>* Nódulo único endurecido; </p>
          <p>*Irritação ou abaulamento de uma parte da mama;</p>
          <p>* Inversão do mamilo;</p>
          <p>*Espassamento ou retração da pele ou mamilo.</p>

          <div style={{ marginBottom: '35px' }} />

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <CardText text='Horários de Coleta' fontSize='20px' />

            <WrapperDonation>
              <Description width='40%'>De segunda à sexta</Description>
              <DescriptionContainer>
                <Description>Das 8h às 10h30</Description>
                <Description>E de 10h30 às 16hs</Description>
              </DescriptionContainer>
            </WrapperDonation>
          </div>
        </Body>
      </Container>
    </AppLayout>
  )
}
