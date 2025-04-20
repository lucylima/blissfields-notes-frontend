import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import FormHelperText from '@mui/material/FormHelperText'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function RegisterPage() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }
  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!username || !email || !password) {
      setError(true)
      setErrorMessage('Senha e email são obrigatórios')
    }

    if (username || email || password) {
      const { status } = await axios.post(
        `${import.meta.env.VITE_API_URL}/user`,
        {
          username,
          email,
          password,
        }
      )

      if (status == 201) {
        setErrorMessage('Sucesso')
        setTimeout(() => {
          navigate('/')
        }, 1000)
      }
    }
  }

  return (
    <>
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100vh',
        }}
      >
        <Typography
          variant='h4'
          component='h3'
          sx={{ textAlign: 'center', fontFamily: 'BlissFieldsLogo' }}
        >
          BlissFields
        </Typography>
        <Box
          component='form'
          sx={{
            '& > :not(style)': {
              m: 1,
              width: '18rem',
              mx: 'auto',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              marginBottom: 3,
            },
          }}
          noValidate
          autoComplete='off'
        >
          <Typography variant='h5' component='h2' sx={{ textAlign: 'center' }}>
            Cadastre-se
          </Typography>

          <TextField
            id='username-field'
            label='Nome de usuário'
            variant='standard'
            type='text'
            onChange={handleUsernameChange}
            error={error}
          />

          <TextField
            id='email-field'
            label='Email'
            variant='standard'
            type='email'
            onChange={handleEmailChange}
          />

          <TextField
            id='password-field'
            label='Senha'
            variant='standard'
            type='password'
            onChange={handlePasswordChange}
          />
          <Button variant='contained' onClick={handleSubmit}>
            Entrar
          </Button>
          <FormHelperText>{errorMessage}</FormHelperText>
          <Button variant='text' component={Link} to='/'>
            Já possui cadastro? Faça login
          </Button>
        </Box>
      </Container>
    </>
  )
}

export { RegisterPage }
