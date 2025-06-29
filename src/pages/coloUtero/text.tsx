import { IonContent } from '@ionic/react'
import AppLayout from '../../components/appLayout'
import styled from 'styled-components'
import { useHistory } from 'react-router';

const ContentBox = styled.div`
  background-color: #ffaec0;
  border-radius: 10px;
  padding: 20px;
  margin: 40px 20px 20px 20px;
  color: var(--ion-color-text);
`

export default function TextComponent({ content, title }: { content: string; title: string }) {
  const history = useHistory()

  return (
    <AppLayout title={title} history={history}>
      <IonContent>
        <ContentBox>{content}</ContentBox>
      </IonContent>
    </AppLayout>
  )
}
