import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Formik } from 'formik'
import { Button, Grid } from '@mui/material'
import * as Yup from 'yup'
import Axios from 'API'
import { useNavigate } from 'react-router-dom'
import {
  CustomizedTextField,
  CustomizedBox,
  CustomizedDiv,
} from './style'
import LoaderComponent from 'components/Loader'

const RocketEdit = () => {
  const params = useParams()
  const { id } = params
  const navigate = useNavigate()
  const [rocket, setRocket] = useState(null)
  const [loading, setLoading] = useState(false)
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('rocket name is required'),
    description: Yup.string().required(
      'please provide rocket descriptioin'
    ),
    height: Yup.string().required('please provide rocket hiegt'),
    diameter: Yup.string().required(
      'please provide rocket diameter'
    ),
    mass: Yup.string().required('please provide rocket mass'),
  })
  useEffect(() => {
    Axios({
      method: 'get',
      url: `rocket/get/${id}`,
      headers: {
        Authorization: token,
      },
    })
      .then((response) => {
        setRocket(response.data)
        setLoading(true)
      })
      .catch((e) => {
        setLoading(true)
        alert(e.response.data.message)
      })
  }, [])
  const token = localStorage.getItem('token')

  return (
    <Formik
      initialValues={{
        name: rocket?.name,
        description: rocket?.description,
        height: rocket?.height,
        diameter: rocket?.diameter,
        mass: rocket?.mass,
        photo: rocket?.photo,
      }}
      enableReinitialize={true}
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
          method: 'put',
          url: `rocket/edit/${id}`,
          headers: {
            // 'Content-Type': 'multipart/form-data',
            Authorization: token,
          },
          data: values,
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
          {loading ? (
            <form onSubmit={handleSubmit}>
              <CustomizedDiv>Edit Rocket </CustomizedDiv>
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
                    defaultValue={rocket?.name}
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
                    defaultValue={rocket?.description}
                  />
                  {/* <Button onClick={(e) => console.log(e)}> */}
                  <img src={rocket?.photo} />
                  {/* </Button> */}
                  {/* <CustomizedTextField
                    required={true}
                    helperText={
                      touched.photo ? errors.photo : ''
                    }
                    error={touched.photo && errors.photo}
                    onBlur={handleBlur}
                    name='photo'
                    id='photo'
                    type='file'
                    onChange={(e) =>
                      setFieldValue(
                        'photo',
                        e.currentTarget.files[0]
                      )
                    }
                    variant='outlined'
                    defaultValue={rocket?.photo}
                  /> */}
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
                    defaultValue={rocket?.height}
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
                    defaultValue={rocket?.diameter}
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
                    defaultValue={rocket?.mass}
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
            <LoaderComponent />
          )}
        </CustomizedBox>
      )}
    </Formik>
  )
}

export default RocketEdit
