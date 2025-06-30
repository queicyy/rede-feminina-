import React, { useEffect, useState } from 'react';
import { IonContent, IonSpinner } from '@ionic/react';
import styled from 'styled-components'
import AppLayout from '../../components/appLayout'
import { useHistory } from 'react-router'
import { fBuscaInfoPages } from '../../services/pagesInfo';

const ContentBox = styled.div`
  border-radius: 10px;
  padding: 20px;
  margin: 40px 20px 20px 20px;
  color: var(--ion-color-text);
  text-align: justify;
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

const FatoresProtecaoColoUtero: React.FC = () => {
  const history = useHistory();
  const [contentData, setContentData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fBuscaInfoPages('fatores_protecao_colo_utero');
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
    <AppLayout title='O que é o Preventivo' history={history}>
      <IonContent>
        {loading ? (
          <LoadingContainer>
            <SpinnerWrapper>
              <IonSpinner name="crescent" />
            </SpinnerWrapper>
          </LoadingContainer>
        ) : (
          <ContentBox>
            {renderConteudo(contentData.text)}
          </ContentBox>
        )}
      </IonContent>
    </AppLayout>
  )
}

function renderConteudo(textData: any[]) {

  return textData.map((item: any, index: number) => {

    if (item.type === 'paragraph') {

      return <p key={index}>{item.content}</p>;
    } else if (item.type === 'image') {

      return (
        <div style={{ width: '100%', justifyContent: 'center', display: 'flex' }}>
          <img width={"350px"} key={index} src={item.src} alt='Imagem do conteúdo' />
        </div>
      )
    } else if (item.type === 'heading') {

      return <p key={index}><strong>{item.content}</strong></p>;
    } else if (item.type === 'list') {

      return (
        <ul key={index}>
          {item.content.map((listItem: any, idx: number) => (
            <li key={idx}>
              <strong>{listItem.title} </strong><br />
              {listItem.description}
            </li>
          ))}
        </ul>
      );
    } else if (item.type === 'references') {

      return (
        <div key={index}>
          <p><strong>{item.title}</strong></p>
          <ul>
            <li>
              <a href={item.url} target="_blank">{item.url}</a>
            </li>
          </ul>
        </div>
      );

    } else {
      return null;
    }
  });
}

export default FatoresProtecaoColoUtero
