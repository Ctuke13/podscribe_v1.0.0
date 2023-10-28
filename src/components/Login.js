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
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

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

const defaultTheme = createTheme()

export default function SignIn() {
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false)
  const navigate = useNavigate()

  // const handleOpenSignUpModal = () => {
  //   setIsSignUpModalOpen(true)
  // }

  // const handleCloseSignUpModal = () => {
  //   setIsSignUpModalOpen(false)
  // }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const data = new FormData(event.currentTarget)
      console.log({
        email: data.get('email'),
        password: data.get('password'),
      })
      const auth = getAuth()
      const userCred = await signInWithEmailAndPassword(
        auth,
        data.get('email'),
        data.get('password')
      )
      if (userCred.user) {
        navigate('/home')
      }
    } catch (error) {
      console.log('ERROR SIGNIN', error)
    }
  }

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
            <Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin='normal'
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                autoComplete='email'
                autoFocus
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
              />
              <FormControlLabel
                control={<Checkbox value='remember' color='primary' />}
                label='Remember me'
              />
              <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
                Sign In
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
                  <Link href='/register' variant='body2'>
                    {"Don't have an account? Register"}
                  </Link>
                </Grid>
              </Grid>
              {/* <SignUpModal open={isSignUpModalOpen} handleClose={handleCloseSignUpModal} />
              <Copyright sx={{ mt: 5 }} /> */}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}
