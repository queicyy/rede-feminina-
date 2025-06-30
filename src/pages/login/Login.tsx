import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonInput, IonSpinner } from '@ionic/react';
import { loginUser, registerUser, loginUserWithGoogle } from '../../services/authService';
import { useFirebase } from '../../FirebaseContext';
import styled from 'styled-components';
import logoImage from '../../../public/assets/images/logo_rfcc.png';
import { useHistory } from 'react-router';

const StyledIonButton = styled(IonButton)`
  --background: #ffc0cb !important;
  --background-activated: none;
  --background-focused: none;
  --background-hover: none;
  color: var(--ion-color-primary-text);
  margin-bottom: 10px;
  &:hover {
    transform: scale(1.05);
  }
`;

const StyledLogoImage = styled.img`
  max-width: 100%;
  height: auto;
  display: block;
  margin: 0 auto; /* Centraliza horizontalmente */
`;

const CenteredMessage = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  width: 80%; /* Aumenta a largura para 80% */
  max-width: 500px; /* Limita a largura máxima */
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

const Login: React.FC = () => {
  const history = useHistory();
  const { user, isLoading, setUser } = useFirebase();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return email.trim() !== '' && re.test(email);
  };

  const validatePassword = (password: string) => {
    return password.trim() !== '' && password.length >= 6;
  };

  const handleLogin = async () => {
    setShowToast(false);

    if (!validateEmail(email) || !validatePassword(password)) {
      setToastMessage('Por favor, informe um email e senha válidos.');
      setShowToast(true);
      return;
    }

    try {
      const result = await loginUser(email, password);

      if ('error' in result) {
        const errorCode = result.error.code;

        if (errorCode === 'auth/user-not-found') {
          setToastMessage('Usuário Não Encontrado.');
        } else if (errorCode === 'auth/wrong-password') {
          setToastMessage('Senha Incorreta.');
        } else if (errorCode === 'auth/invalid-credential') {
          setToastMessage('Credenciais Inválidas.');
        } else {
          setToastMessage('Erro ao Realizar Login.');
        }
        setShowToast(true);
      } else {
        setUser(result.user);
        history.push('/');
      }
    } catch (error) {
      console.error('Erro ao tentar fazer login:', error);
      setToastMessage('Erro ao tentar fazer login. Por favor, tente novamente.');
      setShowToast(true);
    }
  };


  const handleRegister = async () => {
    setShowToast(false);

    if (!validateEmail(email) || !validatePassword(password)) {
      setToastMessage('Por favor, informe um email e senha válidos.');
      setShowToast(true);
      return;
    }
    try {
      const result = await registerUser(email, password);
      if ('error' in result) {
        const errorCode = result.error.code;
        if (errorCode === 'auth/email-already-in-use') {
          setToastMessage('Email já cadastrado.');
        } else {
          setToastMessage('Erro ao Cadastrar Usuário');
        }
        setShowToast(true);
      } else {
        setUser(result.user);
        history.push('/');
      }
    } catch (error) {
      console.error('Erro ao tentar cadastrar usuário:', error);
      setToastMessage('Erro ao tentar realizar o cadastro. Por favor, tente novamente.');
      setShowToast(true);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await loginUserWithGoogle();

      if ('error' in result) {
        setToastMessage('Erro ao Realizar Login com Google.');
        setShowToast(true);
      } else {
        setUser(result.user);
        history.push('/');
      }
    } catch (error) {
      console.error('Erro ao tentar fazer login com Google:', error);
      setToastMessage('Erro ao tentar fazer login com Google. Por favor, tente novamente.');
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
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <StyledLogoImage width={"150px"} src={logoImage} alt="Logo RFCC" />

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
          Login
        </StyledIonButton>
        <StyledIonButton expand="block" onClick={handleRegister}>
          Registrar
        </StyledIonButton>
        <StyledIonButton expand="block" onClick={handleGoogleLogin}>
          Login com Google
        </StyledIonButton>
        {showToast && (
          <CenteredMessage>
            {toastMessage}
            <br />
            <IonButton onClick={() => setShowToast(false)} style={{ marginTop: '10px' }}>
              Ok
            </IonButton>
          </CenteredMessage>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Login;
