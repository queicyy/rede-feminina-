import React, { useState } from "react";
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonInput, IonSpinner, IonButtons, IonMenuButton, IonIcon } from "@ionic/react";
import { informationCircleOutline, peopleOutline } from "ionicons/icons";
import { loginUser } from "../../services/authService";
import { useFirebase } from "../../FirebaseContext";
import styled from "styled-components";
import logoImage from "/assets/images/logo_rfcc.png";
import { useHistory } from "react-router";

const StyledIonButton = styled(IonButton)`
  --background: #d81b60 !important;
  --background-activated: none;
  --background-focused: none;
  --background-hover: none;
  color: white;
  margin-bottom: 10px;
  &:hover {
    transform: scale(1.05);
  }
`;

const StyledLogoImage = styled.img`
  max-width: 100%;
  height: auto;
  display: block;
  margin: 0 auto 30px auto;
`;

const CenteredMessage = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  width: 80%;
  max-width: 500px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

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

const AttentionCard = styled.div`
  background-color: #fdeef4;
  border: 1px solid #f7c6d7;
  border-radius: 12px;
  padding: 14px 16px;
  margin-bottom: 24px;
`;

const AttentionRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;

  & + & {
    margin-top: 12px;
    padding-top: 12px;
    border-top: 1px solid #f7c6d7;
  }
`;

const AttentionIcon = styled(IonIcon)`
  font-size: 22px;
  color: #d81b60;
  flex-shrink: 0;
  margin-top: 2px;
`;

const AttentionTitle = styled.p`
  margin: 0 0 4px 0;
  font-weight: 600;
  color: #d81b60;
`;

const AttentionText = styled.p`
  margin: 0;
  font-size: 0.9rem;
  color: #555;
  line-height: 1.4;
`;

const Login: React.FC = () => {
  const history = useHistory();
  const { user, isLoading, setUser } = useFirebase();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return email.trim() !== "" && re.test(email);
  };

  const validatePassword = (password: string) => {
    return password.trim() !== "" && password.length >= 6;
  };

  const handleLogin = async () => {
    setShowToast(false);

    if (!validateEmail(email) || !validatePassword(password)) {
      setToastMessage("Acesso não autorizado. Você não tem permissão para acessar esta área.");
      setShowToast(true);
      return;
    }

    try {
      const result = await loginUser(email, password);

      if ("error" in result) {
        setToastMessage("Acesso não autorizado. Você não tem permissão para acessar esta área.");
        setShowToast(true);
      } else {
        setUser(result.user);
        history.push("/");
      }
    } catch (error) {
      console.error("Erro ao tentar fazer login:", error);
      setToastMessage("Acesso não autorizado. Você não tem permissão para acessar esta área.");
      setShowToast(true);
    }
  };

  if (isLoading) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Carregando...</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <LoadingContainer>
            <SpinnerWrapper>
              <IonSpinner name="crescent" />
            </SpinnerWrapper>
          </LoadingContainer>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Área Administrativa</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <StyledLogoImage width={"150px"} src={logoImage} alt="Logo RFCC" />

        <AttentionCard>
          <AttentionRow>
            <AttentionIcon icon={informationCircleOutline} />
            <div>
              <AttentionTitle>Atenção</AttentionTitle>
              <AttentionText>
                Você não precisa fazer login para acessar notícias, informações sobre prevenção, orientações ou
                demais conteúdos da RFCC Itapema.
              </AttentionText>
            </div>
          </AttentionRow>
          <AttentionRow>
            <AttentionIcon icon={peopleOutline} />
            <AttentionText>
              Esta área é destinada exclusivamente à equipe responsável pela administração do aplicativo.
            </AttentionText>
          </AttentionRow>
        </AttentionCard>

        <IonInput
          value={email}
          placeholder="Email"
          onIonChange={(e) => setEmail(e.detail.value!)}
        />
        <IonInput
          type="password"
          value={password}
          placeholder="Senha"
          onIonChange={(e) => setPassword(e.detail.value!)}
        />
        <StyledIonButton expand="block" onClick={handleLogin}>
          Entrar
        </StyledIonButton>

        {showToast && (
          <CenteredMessage>
            {toastMessage}
            <br />
            <IonButton onClick={() => setShowToast(false)} style={{ marginTop: "10px" }}>
              Ok
            </IonButton>
          </CenteredMessage>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Login;