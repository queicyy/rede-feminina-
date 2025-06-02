import React, { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { IonContent, IonSpinner } from '@ionic/react'
import styled from 'styled-components'
import AppLayout from '../../../components/appLayout'
import { useHistory } from 'react-router'
import { fBuscaInfoPages } from '../../../services/pagesInfo'
import { IDataFormPayload } from './types'

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`

const Container = styled.div`
  border-radius: 10px;
  padding: 20px;
  margin: 40px 20px 20px 20px;
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
`

const Title = styled.div`
  font-size: 20px;
  margin-bottom: 45px;
`

const Question = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-bottom: 45px;
`

const Column = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
`

const Button = styled.button`
  width: auto;
  max-width: 80%;
  height: auto;
  font-size: 20px;
  background-color: pink;
  border-radius: 10px;
  color: white;
  padding: 10px;
`

const WrapperOption = styled.div`
  display: flex;
  flex-direction: column;
`

const Option = styled.div``

const Warning = styled.div`
  border: 1px solid green;
  background: green;
  color: white;
  border-radius: 5px;
  padding: 25px;
  margin-bottom: 25px;
  width: 80%;

`

const WarningError = styled.div`
  border: 1px solid red;
  background: red;
  color: white;
  border-radius: 5px;
  width: 80%;
  padding: 25px;
  margin-bottom: 25px;
`

const FormCancerMama: React.FC = () => {
  const history = useHistory()
  const [contentData, setContentData] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [dataSubmit, setDataSubmit] = useState<IDataFormPayload>({
    idade: 0,
    residencia: '',
    alteracao: '',
  })
  const [error, setError] = useState({
    error_idade: false,
    error_residencia: false,
    error_alteracao: false,
  })
  const [mensage, setMensage] = useState<string>('')
  const [mensageError, setMensageError] = useState<string>('')

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fBuscaInfoPages('sinais_sintomas_colo_utero') // looking for cancerMama's data
        setContentData(data)
      } catch (error) {
        console.error('Erro ao buscar dados do banco:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleChangeDias = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setDataSubmit((prev) => ({
      ...prev,
      [name]: value,
    }))

    if (parseInt(value) > 50 && parseInt(value) < 69) setError({ ...error, error_idade: false })
    else setError({ ...error, error_idade: true })
  }

  const handleSubmit = (e: any) => {
    e.preventDefault

    //logic to save in database
  }

  console.log(dataSubmit)

  const validation = () => {
    if (dataSubmit.alteracao !== '' || dataSubmit.idade !== 0 || dataSubmit.residencia !== '') {
      setMensage(
        'Você está apta a realizar o exame preventivo de mama (mamografia) anual. Recomendamos procurar um médico para uma avaliação detalhada',
      )
      setMensageError('')
    }

    if (error.error_idade && dataSubmit.alteracao !== "sim") {
      setMensage('')
      setMensageError(
        'Desculpe, você não está apta a realizar o exame preventivo de mama (mamografia) anual no momento. Por favor, siga as orientações e procure um médico se necessário.',
      )
    }

    if (!error.error_idade) {
      setMensage('Você está apta a realizar o exame preventivo de mama (mamografia) anual')
      setMensageError('')
    }
  }

  return (
    <AppLayout title='Orientações para o Exame' history={history}>
      <IonContent>
        {loading ? (
          <LoadingContainer>
            <SpinnerWrapper>
              <IonSpinner name='crescent' />
            </SpinnerWrapper>
          </LoadingContainer>
        ) : (
          <Container>
            <Title>{contentData?.title}</Title>
            {mensage !== '' && <Warning>{mensage}</Warning>}
            {mensageError !== '' && <WarningError>{mensageError}</WarningError>}

            <Question>
              <Column>Qual sua idade?</Column>
              <Column>
                <WrapperOption>
                  <Option>
                    <input type='number' id={`idade`} name={'idade'} onChange={handleChangeDias} required={true} />
                  </Option>
                </WrapperOption>
              </Column>
            </Question>

            <Question>
              <Column>Você reside em Itapema?</Column>
              <Column>
                <WrapperOption>
                  <Option>
                    <input
                      type='radio'
                      id={`residencia_sim`}
                      name={'residencia'}
                      value='sim'
                      onChange={() => {
                        setDataSubmit({ ...dataSubmit, residencia: 'sim' })
                      }}
                      required={true}
                    />
                    <label htmlFor={`residencia_sim`}> Sim</label>
                  </Option>
                  <Option>
                    <input
                      type='radio'
                      id={`residencia_nao`}
                      name={'residencia'}
                      value='nao'
                      onChange={() => {
                        setDataSubmit({ ...dataSubmit, residencia: 'nao' })
                      }}
                      required={true}
                    />
                    <label htmlFor={`residencia_nao`}> Não</label>
                  </Option>
                </WrapperOption>
              </Column>
            </Question>

            <Question>
              <Column>
                Você percebeu alguma das seguintes alterações na sua mama?
                <ul>
                  <li>Inchaço ou vermelhidão de toda ou parte de uma mama - mesmo que não sinta um nódulo</li>
                  <li>Nódulo único endurecido</li>
                  <li>Irritação ou abaulamento de uma parte da mama</li>
                  <li>Espassamento ou retração da pele ou mamilo</li>
                  <li>Nenhuma das alterações acima</li>
                  <li>Inversão do mamilo</li>
                </ul>
              </Column>
              <Column>
                <WrapperOption>
                  <Option>
                    <input
                      type='radio'
                      id={`alteracao_sim`}
                      name={'alteracao'}
                      value='sim'
                      onChange={() => {
                        setDataSubmit({ ...dataSubmit, alteracao: 'sim' })
                        setError({ ...error, error_alteracao: true })
                      }}
                      required={true}
                    />
                    <label htmlFor={`alteracao_sim`}> Sim</label>
                  </Option>
                  <Option>
                    <input
                      type='radio'
                      id={`alteracao_nao`}
                      name={'alteracao'}
                      value='nao'
                      onChange={() => {
                        setDataSubmit({ ...dataSubmit, alteracao: 'nao' })
                        setError({ ...error, error_alteracao: false })
                      }}
                      required={true}
                    />
                    <label htmlFor={`alteracao_nao`}> Não</label>
                  </Option>
                </WrapperOption>
              </Column>
            </Question>

            <Button type='submit' onClick={() => validation()}>
              Validar
            </Button>
          </Container>
        )}
      </IonContent>
    </AppLayout>
  )
}

export default FormCancerMama
