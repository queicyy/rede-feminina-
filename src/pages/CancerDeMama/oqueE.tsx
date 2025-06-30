import React, { useEffect, useState } from 'react'
import { IonContent, IonSpinner } from '@ionic/react'
import styled from 'styled-components'
import AppLayout from '../../components/appLayout'
import { useHistory } from 'react-router'
import { fBuscaInfoPages } from '../../services/pagesInfo'

const ContentBox = styled.div`
  border-radius: 10px;
  padding: 20px;
  margin: 0px 20px 20px 20px;
  color: var(--ion-color-text);
  text-align: justify;
`

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

const OqueE: React.FC = () => {
  const history = useHistory()
  const [contentData, setContentData] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fBuscaInfoPages('o_que_e_cancer_mama')
        setContentData(data)
      } catch (error) {
        console.error('Erro ao buscar dados do banco:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <AppLayout title='O que é' history={history}>
      <IonContent>
        {loading ? (
          <LoadingContainer>
            <SpinnerWrapper>
              <IonSpinner name='crescent' />
            </SpinnerWrapper>
          </LoadingContainer>
        ) : (
          <ContentBox>{renderContent(contentData?.text)}</ContentBox>
        )}
      </IonContent>
    </AppLayout>
  )
}

function renderContent(textData: any[]) {
  return textData.map((item: any, index: number) => {
    if (item.type === 'paragraph') {
      return <p key={index}>{item.content}</p>
    } else if (item.type === 'image') {
      return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <img key={index} src={item.src} alt='Imagem do conteúdo' width='350px' />;
        </div>
      )
    } else if (item.type === 'references') {
      return (
        <div key={index}>
          <p>
            <strong>{item.title}</strong>
          </p>
          <ul>
            {item.references.map((reference: any, idx: number) => (
              <li key={idx}>{reference.name}</li>
            ))}
          </ul>
        </div>
      )
    } else {
      return null
    }
  })
}

export default OqueE
