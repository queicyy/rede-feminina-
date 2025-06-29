import React from 'react'
import AppLayout from '../../../components/appLayout'
import { Body, Container, Description, GridWrapper, ColumnTwo, Section, ImageContainer, Img, FooterInfo } from './style'
import { useHistory } from 'react-router-dom'

export default function Terapeutas() {
  const history = useHistory()

  return (
    <AppLayout title='Profissionais e Terapeutas' history={history}>
      <Container>
        <Body>
          <Description>
            <ImageContainer>
              <Img src={'assets/images/profissionais.jpg'} />
            </ImageContainer>
            <div>
              O setor de apoio e orientação promove prevenção e tratamento as pacientes . Para isso conta com
              atendimento de fisioterapia, atendimento psicológico, nutricional, assistência social e terapias
              alternativas. Promovemos ainda integração das pacientes através do grupo de Dança do ventre e yoga. Os
              trabalhos acontecem com hora marcada. No Espaço Rosa oferecemos doação de próteses externas de silicone
              para pacientes mastectomizadas. Emprestamos também perucas de cabelo natural, chapéus, toucas,lenços e
              turbantes para toda as pessoas da comunidade em tratamento oncológico .<p></p>
              <strong>FISIOTERAPIA:</strong><div></div>O objetivo da fisioterapia é preservar, manter e recuperar a integridade do
              movimento e do funcionamento do membro superior e estruturas adjacentes do mesmo lado da cirurgia, além de
              prevenir e tratar distúrbios causados pelos tratamentos oncológicos, buscando o bem-estar e a qualidade de
              vida das pacientes. A completa recuperação física da paciente é muito importante para que esta seja
              reinserida em seu contexto familiar, social e no trabalho, para o total enfrentamento da doença.
              <p></p>
              <strong>SALA DE LUVA:</strong><div></div>
              Conta com um aparelho de luva de compressão pneumática intermitente para drenagem linfática dos membros
              superiores, sendo um dos recursos utilizados no tratamento pós mastectomia. O objetivo principal é
              prevenir e/ou tratar o linfedema, uma das mais temidas sequelas da mastectomia. Além de promover o
              relaxamento muscular local, melhora da dor e das alterações de sensibilidade. (somente agendado sob
              indicação médica)
              <p></p>
              <strong>BANCO DE PERUCAS:</strong><div></div>
              Contamos com um banco de perucas, todas de cabelo natural, confeccionadas com cabelos recebidos em doação
              e que são emprestadas para as mulheres da comunidade em tratamento oncológico atraves do projeto "Fios de
              Alegria".
              <p></p>
              <strong>ATENDIMENTO PSCICOLÓGICO:</strong><div></div>O atendimento psicoterápico individual, auxilia as pacientes no
              enfrentamento da doença, reconhecendo, compreendendo e administrando conflitos internos e emoções. Atuando
              sobre hábitos, estilos de vida, expectativas, angustias, valores e medos.
              <p></p>
              <strong>ATENDIMENTO NUTRICIONAL:</strong><div></div>
              Atua na nutrição preventiva, emagrecimento, ganho de peso, correção de hábitos alimentares e deficiências
              nutricionais.
              <p></p>
              <strong>REIKI /BARRA DE ACCESS:</strong><div></div>O Reiki e as Barras de Access são técnicas terapêuticas que
              influenciam o paciente de formas diferentes para obter resultados bastante semelhantes. Em outras
              palavras, são técnicas distintas cujo maior benefício proporcionado ao indivíduo é a restauração do
              equilíbrio físico e mental.
              <p></p>
              <strong>AURICULOTERAPIA:</strong><div></div>A auriculoterapia é uma técnica derivada da acupuntura, que faz pressão
              em pontos específicos da orelha para tratar e diagnosticar diversos problemas físicos, mentais e até
              emocionais.
              <p></p>
              <strong>ASSISTÊNCIA SOCIAL:</strong><div></div>
              Atua no atendimento à população e na formulação e execução de politicas públicas que possibilitem à
              população acessar seus direitos.
              <p></p>
              <strong>GRUPO DE DANÇA:</strong><div></div>A Dança trabalha a autoestima e integração das pacientes, além de
              desenvolver o gosto pela música e dança, a melhorar o equilíbrio, coordenação motora e capacidade de
              memorização, promovendo mais saúde e melhor qualidade de vida.
            </div>
          </Description>
        </Body>
      </Container>
    </AppLayout>
  )
}
