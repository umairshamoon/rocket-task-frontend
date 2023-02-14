import {
  CssBaseline,
  Button,
  Avatar,
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

const Signup = () => {
  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required('email is required'),
    username: Yup.string().required('username is required'),
    password: Yup.string()
      .required('Password is required')
      .min(8),
  })
  const navigate = useNavigate()
  const theme = createTheme()
  return (
    <div>
      <Formik
        initialValues={{
          email: '',
          password: '',
          username: '',
          avatar: null,
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          const formData = new FormData()
          formData.append('email', values.email)
          formData.append('username', values.username)
          formData.append('password', values.password)
          formData.append('avatar', values.avatar)

          Axios({
            method: 'post',
            url: 'user/register',
            headers: { 'Content-Type': 'multipart/form-data' },
            data: formData,
          })
            .then((res) => {
              navigate('/')
              alert(res.data.message)
            })
            .catch((e) => {
              console.log(e.response.data)

              //   alert(e.response.data.message)
            })
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
          setFieldValue,
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
                  Sign up
                </Typography>
                <Box
                  component='form'
                  noValidate
                  onSubmit={handleSubmit}
                  sx={{ mt: 3 }}
                >
                  <CustomizedTextField
                    required={true}
                    helperText={
                      touched.username ? errors.username : ''
                    }
                    error={touched.username && errors.username}
                    onBlur={handleBlur}
                    name='username'
                    id='username'
                    label='Username'
                    type='text'
                    onChange={handleChange}
                    variant='outlined'
                  />
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
                  <CustomizedTextField
                    required={true}
                    helperText={
                      touched.avatar ? errors.avatar : ''
                    }
                    error={touched.avatar && errors.avatar}
                    onBlur={handleBlur}
                    name='avatar'
                    id='avatar'
                    type='file'
                    onChange={(e) =>
                      setFieldValue(
                        'avatar',
                        e.currentTarget.files[0]
                      )
                    }
                    variant='outlined'
                  />
                  <Button
                    type='submit'
                    fullWidth
                    variant='contained'
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign Up
                  </Button>
                  <Grid container justifyContent='flex-end'>
                    <Grid item>
                      <Link to='/' variant='body2'>
                        Already have an account? Sign in
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

export default Signup
