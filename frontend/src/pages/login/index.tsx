import React, { FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Input from '../../components/Input'
import Button from '../../components/Button'
import { AuthContext } from '../../context/AuthContext'

const Login = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const { login } = React.useContext(AuthContext)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    login.mutate({ email, password })
  }
  return (
    <StyledContainer>
      <Form onSubmit={handleSubmit}>
        <StyledLabel>Correo</StyledLabel>
        <Input
          type="text"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
        />
        <StyledLabel>Contraseña</StyledLabel>
        <Input
          type="password"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
        />
        <Button primary type="submit">
          Iniciar sesion
        </Button>
        <Link to="/register">
          <Button>Registrarse</Button>
        </Link>
      </Form>
    </StyledContainer>
  )
}

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  flex-direction: column;
`

const StyledLabel = styled.p`
  width: 220px;
  margin: 10px 0px;
  font-weight: bold;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 500px;
`
export default Login
