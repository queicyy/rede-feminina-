import { WrapperCard, Description } from './styles'

interface IProps {
  text: string
  fontSize: string
}

const CardText = ({ text, fontSize }: IProps) => {
  return (
    <WrapperCard>
      <Description fontSize={fontSize}>{text}</Description>
    </WrapperCard>
  )
}

export default CardText
