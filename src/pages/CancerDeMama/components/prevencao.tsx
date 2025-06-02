import React, { useEffect, useState } from 'react';
import { IonContent, IonSpinner } from '@ionic/react';
import styled from 'styled-components'
import { useHistory } from 'react-router'
import AppLayout from '../../components/appLayout'
import { fBuscaInfoPages } from '../../services/pagesInfo';

const ContentBox = styled.div`
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
`;

const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const TitleDiv = styled.div`
  margin-bottom: -15px;
`;

const Prevencao: React.FC = () => {
  const history = useHistory();
  const [contentData, setContentData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fBuscaInfoPages('prevencao_e_diagnostico_cancer_mama');
        setContentData(data);
      } catch (error) {
        console.error('Erro ao buscar dados do banco:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <AppLayout title='Prevenção/Diagnóstico' history={history}>
      <IonContent>
        {loading ? (
          <LoadingContainer>
            <SpinnerWrapper>
              <IonSpinner name="crescent" />
            </SpinnerWrapper>
          </LoadingContainer>
        ) : (
          <ContentBox>
            {renderContent(contentData?.text)}
          </ContentBox>
        )}
      </IonContent>
    </AppLayout>
  )
}

function renderContent(textData: any[]) {
  return textData.map((item: any, index: number) => {
    if (item.type === 'title') {
      return (
        <TitleDiv key={index}>
          <strong>{item.content}</strong>
        </TitleDiv>
      );
    } else if (item.type === 'paragraph') {
      return <p key={index}>{item.content}</p>;
    } else if (item.type === 'list') {
      return (
        <ul key={index}>
          {item.content.map((info: string, idx: number) => (
            <li key={idx}>{info}</li>
          ))}
        </ul>
      );
    } else if (item.type === 'references') {
      return (
        <div key={index}>
          <strong>{item.content}</strong>
          <ul>
            {item.references.map((ref: any, idx: number) => (
              <li key={idx}>
                {ref.name}: <a href={ref.url} target="_blank" rel="noopener noreferrer">{ref.url}</a>
              </li>
            ))}
          </ul>
        </div>
      );
    } else if (item.type === 'image') {
      return (
        <div key={index} style={{ textAlign: 'center', margin: '20px 0' }}>
          <img src={item.src} alt="" width={item.width} />
        </div>
      );
    }
    return null;
  });
}


export default Prevencao
