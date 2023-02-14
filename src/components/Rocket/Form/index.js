import React from 'react'
import { Formik } from 'formik'
import { Button, Grid } from '@mui/material'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
import {
  CustomizedTextField,
  CustomizedBox,
  CustomizedDiv,
} from './style'
import Axios from 'API'

const RocketForm = () => {
  const navigate = useNavigate()
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('rocket name is required'),
    description: Yup.string().required(
      'please provide rocket descriptioin'
    ),
    height: Yup.number()
      .required('please provide rocket hiegt')
      .positive('Please Enter a Positive Number'),
    diameter: Yup.number()
      .required('please provide rocket diameter')
      .positive('Please Enter a Positive Number'),
    mass: Yup.number()
      .required('please provide rocket mass')
      .positive('Please Enter a Positive Number'),
  })
  const token = localStorage.getItem('token')
  const role = localStorage.getItem('role')

  return (
    <Formik
      initialValues={{
        name: '',
        description: '',
        height: '',
        diameter: '',
        mass: '',
        photo: null,
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        const formData = new FormData()
        formData.append('name', values.name)
        formData.append('description', values.description)
        formData.append('height', values.height)
        formData.append('diameter', values.diameter)
        formData.append('mass', values.mass)
        formData.append('photo', values.photo)

        Axios({
          method: 'post',
          url: 'rocket/create',
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: token,
          },
          data: formData,
        })
          .then((response) => {
            navigate('/rocket/view')
          })
          .catch((e) => {
            alert(e.response.data.message)
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
        <CustomizedBox>
          {role == 'admin' ? (
            <form onSubmit={handleSubmit}>
              <CustomizedDiv>Rocket Form </CustomizedDiv>
              <Grid container spacing={5}>
                <Grid item xs={12} sm={12} md={6}>
                  <CustomizedTextField
                    required={true}
                    helperText={touched.name ? errors.name : ''}
                    error={touched.name && errors.name}
                    onBlur={handleBlur}
                    name='name'
                    id='name'
                    label='Rocket Name'
                    type='text'
                    onChange={handleChange}
                    variant='outlined'
                  />
                  <CustomizedTextField
                    required={true}
                    helperText={
                      touched.description
                        ? errors.description
                        : ''
                    }
                    error={
                      touched.description && errors.description
                    }
                    onBlur={handleBlur}
                    name='description'
                    id='description'
                    label='Description'
                    type='textArea'
                    multiline
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
                        'photo',
                        e.currentTarget.files[0]
                      )
                    }
                    variant='outlined'
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <CustomizedTextField
                    required={true}
                    helperText={
                      touched.height ? errors.height : ''
                    }
                    error={touched.height && errors.height}
                    onBlur={handleBlur}
                    name='height'
                    id='height'
                    label='Height'
                    type='text'
                    onChange={handleChange}
                    variant='outlined'
                  />

                  <CustomizedTextField
                    required={true}
                    helperText={
                      touched.diameter ? errors.diameter : ''
                    }
                    error={touched.diameter && errors.diameter}
                    onBlur={handleBlur}
                    name='diameter'
                    id='diameter'
                    label='Diameter'
                    type='text'
                    onChange={handleChange}
                    variant='outlined'
                  />

                  <CustomizedTextField
                    required={true}
                    helperText={touched.mass ? errors.mass : ''}
                    error={touched.mass && errors.mass}
                    onBlur={handleBlur}
                    name='mass'
                    id='mass'
                    label='Mass'
                    type='text'
                    onChange={handleChange}
                    variant='outlined'
                  />
                </Grid>
              </Grid>
              <Button
                variant='contained'
                color='primary'
                type='submit'
                data-testid='rocketForm-btn'
                style={{ marginTop: '100px' }}
              >
                Submit
              </Button>
            </form>
          ) : (
            <h1>Unauthorized</h1>
          )}
        </CustomizedBox>
      )}
    </Formik>
  )
}

export default RocketForm
