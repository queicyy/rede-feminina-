import { Link, useHistory } from 'react-router-dom'
import { Container, Header, MenuWrapper, Menu, Option } from './styles'
import AppLayout from '../../components/appLayout'

export default function ColoUteroMenu() {
  const history = useHistory()

  return (
    <AppLayout title='Câncer do colo do útero' history={history}>
      <Container>
        <MenuWrapper>
          <Link to='/cancer/colo-utero/oque-e'>
            <Menu>
              <Option>O que é?</Option>
            </Menu>
          </Link>

          <Link to='/cancer/colo-utero/causa'>
            <Menu>
              <Option>O que Causa?</Option>
            </Menu>
          </Link>

          <Link to='/cancer/colo-utero/risco'>
            <Menu>
              <Option>Fatores de Risco</Option>
            </Menu>
          </Link>

          <Link to='/cancer/colo-utero/prevencao'>
            <Menu>
              <Option>Fatores de Proteção</Option>
            </Menu>
          </Link>

          <Link to='/cancer/colo-utero/preventivo'>
            <Menu>
              <Option>Prevenção/Diagnóstico</Option>
            </Menu>
          </Link>

          <Link to='/cancer/colo-utero/sinais'>
            <Menu>
              <Option>Sinais e Sintomas</Option>
            </Menu>
          </Link>

          <Link to='/cancer/colo-utero/orientacoes'>
            <Menu>
              <Option>Orientações para o Exame</Option>
            </Menu>
          </Link>
          
        </MenuWrapper>
      </Container>
    </AppLayout>
  )
}
