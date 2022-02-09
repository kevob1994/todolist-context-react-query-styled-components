import React, { FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Input from '../../components/Input'
import Button from '../../components/Button'
import { AuthContext } from '../../context/AuthContext'

const Register = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [firstname, setFirstname] = useState<string>('')
  const [lastname, setLastname] = useState<string>('')
  const { register } = React.useContext(AuthContext)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    register.mutate({ email, password, firstname, lastname })
  }

  return (
    <StyledContainer>
      <Form onSubmit={handleSubmit}>
        <StyledLabel>Nombre</StyledLabel>
        <Input
          defaultValue=""
          type="text"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFirstname(e.target.value)}
        />
        <StyledLabel>Apellido</StyledLabel>
        <Input
          defaultValue=""
          type="text"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLastname(e.target.value)}
        />
        <StyledLabel>Correo</StyledLabel>
        <Input
          defaultValue=""
          type="text"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
        />
        <StyledLabel>Contraseña</StyledLabel>
        <Input
          defaultValue=""
          type="password"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
        />
        <Button primary type="submit">
          Registrar
        </Button>
        <Link to="/login">
          <Button>Volver</Button>
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
	width: 500px;
  flex-direction: column;
`
export default Register
