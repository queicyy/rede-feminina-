import React from 'react'
import AppLayout from '../../components/appLayout'
import { Body, Container, Description, GridWrapper, Section, ImageContainer, Img, FooterInfo } from './style'
import { useHistory } from 'react-router-dom'
import KnowUsImg from '../../assets/rfcc-conheca.jpg'
import BoardImg from '../../assets/board.jpeg'

export default function AboutScreen() {
  const history = useHistory()

  return (
    <AppLayout title='Sobre Nós' history={history}>
      <Container>
        <Body>
          <Description>
            <ImageContainer>
              <Img src={KnowUsImg} />
            </ImageContainer>
            <p>
              A RFCC itapema é uma instituição não governamental, sem fins lucrativos, cujo objetivo é prevenir o câncer
              de colo de útero, realizar diagnóstico precoce do câncer de mama e apoiar pacientes mastectomizadas. A
              Rede Feminina de itapema teve início em 07 de agosto de 2001. Elegeu a primeira diretoria com as senhoras:
              Dra. Gladis Deisvaldi Pitol, (in memoriam) Cleia Rocha Haenachen, Eliane Lobato, juntamente com algumas
              pessoas da cidade. com muita dedicação e comprometimento no intuito de prestar serviço em prol da saúde e
              bem estar das mulheres itapemenses, Iniciou seus trabalhos junto ao posto de saúde básica do bairro, após
              algum tempo teve início a construção do prédio para sede própria, a partir de 30 de novembro de 2010 foi
              inaugurada sua sede e desde então vem contando, ao longo dos anos, com o trabalho dedicado de inúmeras
              voluntárias que assumem um compromisso pela vida na busca incessante pela saúde e valorização da mulher.
            </p>
            <div>
              <ul>
                <li>
                  <strong>Missão</strong>
                </li>
                <span>
                  Proporcionar atendimento humanizado nos serviços ofertados, contribuindo para a prevenção do câncer e
                  a melhoria da qualidade de vida.
                </span>
              </ul>

              <ul>
                <li>
                  <strong>Visão</strong>
                </li>
                <span>Ser entidade de referência no município na prevenção do câncer de mama e colo de útero.</span>
              </ul>
              <ul>
                <li>
                  <strong>Valores</strong>
                </li>
                <span>Comprometimento, ética, humanização, transparência e excelência</span>
              </ul>
            </div>
            <p>
              <strong>A Rede Feminina de Combate ao Câncer de Itapema</strong> conta hoje com o trabalho voluntário de
              cerca de 65 voluntárias que atuam em setores como: diretoria, conselho consultivo, conselho fiscal,
              ambulatório, brechó, artesanato, costura, apoio e orientação à mastectomizada, psicologia, nutrição e
              terapias alternativas.
            </p>
            <strong>Gestão 2023-2024</strong>
            <GridWrapper>
              <Section>
                <ul>
                  <li>
                    <strong>Diretoria</strong>
                  </li>
                </ul>
                <ul className='dashed'>
                  <li>Presidente: Eleonir Baldussi Biondo</li>
                  <li>1ª. Vice-presidente: Geny Iarema</li>
                  <li>1ª. Secretária: Odete Cadore</li>
                  <li>2ª. Secretária: Iria Bonato da Rosa</li>
                  <li>1ª. Tesoureira: Pedrolina Niedermeier</li>
                  <li>2ª. Tesoureira: Gloria Maria Ribeiro Lima</li>
                </ul>
              </Section>

              <Section className='img-section'>
                <Img src={BoardImg} width={'350px'}></Img>
              </Section>

              <Section>
                <ul>
                  <li>
                    <strong>Conselho Consultivo</strong>
                  </li>
                </ul>
                <ul className='dashed'>
                  <li>Neusa Maria Da Rosa</li>
                  <li>Elione Balbinot</li>
                  <li>Sonia Maria Tomaz Nejm</li>
                </ul>

                <ul>
                  <li>
                    <strong>Conselho Fiscal</strong>
                  </li>
                </ul>
                <ul className='dashed'>
                  <li>Cleusa Ricardo</li>
                  <li>Marinez De Mattos</li>
                  <li>Lesia Finger</li>
                  <li>Janira Gianello</li>
                </ul>
              </Section>

              <Section>
                <ul style={{ margin: '21px 0 0 0' }}>
                  <li>
                    <strong>Coordenadoras</strong>
                  </li>
                </ul>
                <ul className='dashed'>
                  <li>Ambulatório: Marinez De Mattos</li>
                  <li>Brechó: Elione Balbinot</li>
                  <li>Artesanato: Lesia Finger/ Cleusa Ricardo</li>
                  <li>Costura: Emidia Darcy de Sousa</li>
                </ul>
              </Section>
            </GridWrapper>
            <p>
              A RFCC desenvolve uma série de atividades voltadas para a conscientização sobre a importância da prevenção
              e do diagnóstico precoce da doença. Entre as ações realizadas pela instituição, destacam-se campanhas
              educativas, palestras em escolas e empresas, distribuição de material informativo e a organização de
              eventos para arrecadação de recursos. Além disso, a instituição oferece suporte para pacientes em
              tratamento contra o câncer, por meio de ações como a doação de próteses e perucas, além de apoio
              psicológico. Com uma atuação dedicada e comprometida, a Rede Feminina de Combate ao Câncer de Itapema
              tornou-se uma referência no combate ao câncer na região. A organização é reconhecida pela comunidade pela
              sua atuação em prol dos pacientes, oferecendo suporte e cuidado para aqueles que lutam contra a doença. A
              Rede Feminina de Combate ao Câncer de Itapema é uma inspiração para todas as pessoas que desejam fazer a
              diferença na vida de outras pessoas e lutar por uma causa nobre.
            </p>
            <FooterInfo>
              <p>Saiba mais</p>
              <a href='https://www.redefemininaitapema.com.br/admin/upload/ESTATUTO.pdf' target='_blank'>
                Estatuto Social da Rede Feminina De Combate Ao Câncer De Itapema
              </a>
              <a href='https://www.redefemininaitapema.com.br/admin/upload/REGIMENTO%20INTERNO.pdf' target='_blank'>
                Regimento Interno da Rede Feminina De Combate Ao Câncer De Itapema
              </a>
            </FooterInfo>
          </Description>
        </Body>
      </Container>
    </AppLayout>
  )
}
