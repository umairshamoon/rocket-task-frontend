import {
  CssBaseline,
  Button,
  Avatar,
  FormControlLabel,
  Checkbox,
  Grid,
  Box,
  Typography,
} from '@mui/material'

import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Formik } from 'formik'
import * as Yup from 'yup'
import Axios from 'API'
import { CustomizedTextField } from './style'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()
  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required('email is required'),
    password: Yup.string()
      .required('Password is required')
      .min(8),
  })
  const theme = createTheme()
  return (
    <div>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const { data } = await Axios.post(
              'user/login',
              values
            )
            localStorage.setItem('token', data.token)
            localStorage.setItem('role', data.role)
            localStorage.setItem('avatar', data.avatar)
            navigate('/rocket/view')
          } catch (e) {
            alert(e.response.data.message)
            console.log(e.response.data.message)
          }
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <ThemeProvider theme={theme}>
            <Container component='main' maxWidth='xs'>
              <CssBaseline />
              <Box
                sx={{
                  marginTop: 8,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component='h1' variant='h5'>
                  Sign in
                </Typography>
                <Box
                  component='form'
                  onSubmit={handleSubmit}
                  noValidate
                  sx={{ mt: 1 }}
                >
                  <CustomizedTextField
                    required={true}
                    helperText={
                      touched.email ? errors.email : ''
                    }
                    error={touched.email && errors.email}
                    onBlur={handleBlur}
                    name='email'
                    id='email'
                    label='Email'
                    type='email'
                    onChange={handleChange}
                    variant='outlined'
                  />
                  <CustomizedTextField
                    required={true}
                    helperText={
                      touched.password ? errors.password : ''
                    }
                    error={touched.password && errors.password}
                    onBlur={handleBlur}
                    name='password'
                    id='password'
                    label='Password'
                    type='password'
                    onChange={handleChange}
                    variant='outlined'
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        value='remember'
                        color='primary'
                      />
                    }
                    label='Remember me'
                  />
                  <Button
                    type='submit'
                    fullWidth
                    variant='contained'
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign In
                  </Button>
                  <Grid container>
                    <Grid item xs>
                      <Link href='#' variant='body2'>
                        Forgot password?
                      </Link>
                    </Grid>
                    <Grid item>
                      <Link to={'/register'} variant='body2'>
                        {"Don't have an account? Sign Up"}
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Container>
          </ThemeProvider>
        )}
      </Formik>
    </div>
  )
}

export default Login
