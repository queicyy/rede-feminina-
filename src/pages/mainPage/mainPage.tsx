import { Container, Content, ContentColumn, Header, WrapperBody } from './styles'
import AppLayout from '../../components/appLayout'
import { Fragment, useEffect, useState } from 'react'
import useCardsMain from '../../hooks/useCardsMain/useCardsMain'
import { ICardsMain } from './types'
import { useHistory } from 'react-router'
import CardsMain from '../../components/Cards'

export default function MainPage() {
  const [cardsData, setCardsData] = useState<ICardsMain[]>([])
  const history = useHistory()
  const { findAllCardsMain } = useCardsMain()

  useEffect(() => {
    async function getData() {
      await findAllCardsMain()
        .then((response) => setCardsData(response))
        .catch((e) => console.log(e))
        .finally(() => console.log('Get data successfully'))
    }

    getData()
  }, [])

  function renderCards(data: ICardsMain, key: number) {
    return (
      <Fragment key={key}>
        <CardsMain data={data} />
      </Fragment>
    )
  }

  return (
    <AppLayout title="" history={history}>
      <Container>
        <Content>
          <WrapperBody>
            <ContentColumn>{cardsData.map(renderCards)}</ContentColumn>
          </WrapperBody>
          <Header>
            <h1>Esse aplicativo não exclui a necessidade da acompanhamento médico</h1>
          </Header>
        </Content>
      </Container>
    </AppLayout>
  )
}
