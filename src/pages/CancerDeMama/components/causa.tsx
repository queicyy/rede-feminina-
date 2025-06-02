import React, { useEffect, useState } from 'react'
import { IonContent, IonSpinner } from '@ionic/react'
import styled from 'styled-components'
import AppLayout from '../../components/appLayout'
import { useHistory } from 'react-router'
import { fBuscaInfoPages } from '../../services/pagesInfo'

const ContentBox = styled.div`
  text-align: justify;
  border-radius: 10px;
  padding: 20px;
  margin: 0px 20px 20px 20px;
  color: var(--ion-color-text);

  & a {
    text-decoration: none;
    color: pink;
  }
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

const Causa: React.FC = () => {
  const history = useHistory()
  const [contentData, setContentData] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fBuscaInfoPages('causa_cancer_mama')
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
    <AppLayout title='Causa' history={history}>
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
          <img key={index} src={item.src} alt='imagem relacionada à causa' />
        </div>
      )
    } else if (item.type === 'title') {
      return (
        <div key={index}>
          <strong>{item.content}</strong>
        </div>
      )
    } else if (item.type === 'list') {
      return (
        <div key={index}>
          <ul>
            {item.content.map((info: any, idx: number) => (
              <li key={idx}>{info}</li>
            ))}
          </ul>
        </div>
      )
    } else if (item.type === 'references') {
      return (
        <div key={index}>
          <strong>{item.title}</strong>
          <ul>
            {item.references.map((ref: any, idx: number) => (
              <li key={idx}>
                {ref.name}:{' '}
                <a href={ref.url} target='_blank' rel='noopener noreferrer'>
                  {ref.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )
    }
    return null
  })
}

export default Causa
