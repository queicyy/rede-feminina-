import { fakeCardsMain } from '../../helpers/fakeCardsMain'

const useCardsMain = () => {
  const findAllCardsMain = async () => {
    const response = fakeCardsMain
    return response
  }

  return {
    findAllCardsMain,
  }
}

export default useCardsMain
