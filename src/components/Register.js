import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import micBg from '../images/mic_bg.jpg'
import GoogleButton from 'react-google-button'
import SignUpModal from './SignUp'
import { useState } from 'react'
import logo from '../images/logo.png'
import { useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import { db } from '../firebase'

function Copyright(props) {
  return (
    <Typography variant='body2' color='text.secondary' align='center' {...props}>
      {'Copyright © '}
      <Link color='inherit' href='https://mui.com/'>
        PodScribe
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme()

export default function Register() {
  const navigate = useNavigate()
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const { email, password } = formData
  const onChange = (evt) => {
    setFormData((prevState) => ({
      ...prevState,
      [evt.target.id]: evt.target.value,
    }))
  }

  const onSubmit = async (evt) => {
    evt.preventDefault()
    try {
      const auth = getAuth()
      const userCred = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCred.user
      navigate('/home')
    } catch (error) {
      console.log('ERROR ONSUBMIT', error)
    }
  }

  // const handleOpenSignUpModal = () => {
  //   setIsSignUpModalOpen(true)
  // }

  // const handleCloseSignUpModal = () => {
  //   setIsSignUpModalOpen(false)
  // }

  // const handleSubmit = (event) => {
  //   event.preventDefault()
  //   const data = new FormData(event.currentTarget)
  //   console.log({
  //     email: data.get('email'),
  //     password: data.get('password'),
  //   })
  // }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component='main' sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${micBg})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {/* <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar> */}
            <img src={logo} />
            {/* <Typography component="h1" variant="h5">
              Sign in
            </Typography> */}
            <Box component='form' noValidate onSubmit={onSubmit} sx={{ mt: 1 }}>
              <TextField
                margin='normal'
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                autoComplete='email'
                autoFocus
                value={email}
                onChange={onChange}
              />
              <TextField
                margin='normal'
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='current-password'
                value={password}
                onChange={onChange}
              />
              <FormControlLabel
                control={<Checkbox value='remember' color='primary' />}
                label='Remember me'
              />
              <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
                Register
              </Button>
              <GoogleButton
                onClick={() => {
                  console.log('Google Button Clicked!')
                }}
              />
              <Grid container>
                <Grid item xs>
                  <Link href='#' variant='body2'>
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href='/' variant='body2'>
                    {'Already have an account? Sign In'}
                  </Link>
                </Grid>
              </Grid>
              {/* <SignUpModal open={isSignUpModalOpen} handleClose={handleCloseSignUpModal} /> */}
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}
