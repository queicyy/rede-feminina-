import React from 'react'
import AppLayout from '../../components/appLayout'
import { useHistory } from 'react-router-dom'
import { Container, MenuWrapper, Menu } from './styles'

const CancerDeMama: React.FC = () => {
  const history = useHistory()

  const buttonsData = [
    { text: 'O que é?', route: '/cancer/mama/o-que-e' },
    { text: 'O que Causa?', route: '/cancer/mama/causa' },
    { text: 'Fatores de Risco', route: '/cancer/mama/riscos' },
    { text: 'Fatores de Proteção', route: '/cancer/mama/protecao' },
    { text: 'Prevenção/Diagnóstico', route: '/cancer/mama/prevencao' },
    { text: 'Sinais e Sintomas', route: '/cancer/mama/sinais-sintomas' },
    { text: 'Orientações para o Exame', route: '/cancer/mama/orientacoes' },
  ]

  const handleRedirect = (route: number) => {
    history.push(buttonsData[route].route)
  }

  return (
    <AppLayout title='Câncer de Mama' history={history}>
      <Container>
        {buttonsData.map((button, index) => (
          <MenuWrapper key={index} onClick={() => handleRedirect(index)}>
            <Menu>{button.text}</Menu>
          </MenuWrapper>
        ))}
      </Container>
    </AppLayout>
  )
}

export default CancerDeMama
