import { ContentCard, WrapperCard, ImageCard } from '../pages/mainPage/styles'
import { ICardsMain } from '../pages/mainPage/types'
import { useHistory } from 'react-router-dom'

interface IProps {
  data: ICardsMain
  sizeImg?: string
}

export default function CardsMain({ data, sizeImg = '70px' }: IProps) {
  const history = useHistory()

  return (
    <WrapperCard onClick={() => history.push(data.route)}>
      <ImageCard src={data.img} width={sizeImg}></ImageCard>
      <ContentCard>{data.description}</ContentCard>
    </WrapperCard>
  )
}
