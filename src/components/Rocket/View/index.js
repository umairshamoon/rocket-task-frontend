import React, { useEffect, useState } from 'react'
import RocketCard from './RocketCard/RocketCard'
// import Axios from 'API'
import Axios from 'API'
// import Axios from 'components/src/Axios'
import { Grid } from '@mui/material'
import LoaderComponent from 'components/Loader'
import {
  CardContent,
  Collapse,
  Avatar,
  IconButton,
  Typography,
  CardHeader,
  Card,
  CardMedia,
  CardActions,
  Pagination,
} from '@mui/material'

import {
  Delete,
  Edit,
  Favorite,
  ExpandMore as ExpandMoreIcon,
  ExpandMore,
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import ReactPagination from 'react-paginate'

import { styled } from '@mui/material/styles'
import { red } from '@mui/material/colors'
import { Stack } from '@mui/system'
export default function ViewRocket() {
  const role = localStorage.getItem('role')
  const token = localStorage.getItem('token')
  const [rockets, setRockets] = useState([])
  const [loading, setLoading] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [pageNumber, setPageNumber] = useState(1)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  const handleEdit = async (id) => {
    navigate(`/rocket/edit/${id}`)
  }
  const handleDelete = (id) => {
    Axios({
      method: 'delete',
      url: `rocket/delete/${id}`,
      headers: {
        Authorization: token,
      },
    })
      .then((res) => {
        console.log(res.data)
        setLoading(false)
        // navigate('/rocket/view')
      })
      .catch((e) => alert(e.response.data.message))
  }
  useEffect(() => {
    Axios({
      method: 'get',
      url: `rocket?page=${pageNumber}&limit=${2}`,
      headers: {
        Authorization: token,
      },
    })
      .then((res) => {
        setRockets(null)
        setRockets(res.data)
        setLoading(true)
      })
      .catch((e) => {
        setError(
          e.response.data.message || 'Someting Went Wrong'
        )
        setLoading(true)
      })
  }, [loading, pageNumber])
  const handlePageChange = (e, v) => {
    setPageNumber(v)
  }
  return (
    <Grid containter spacing={2}>
      <Grid item xs={12}>
        <Grid container justify='center' spacing={2}>
          {loading && rockets ? (
            rockets.map((rocket) => (
              <Grid key={rocket._id} item>
                <Card sx={{ maxWidth: 345 }}>
                  <CardHeader
                    avatar={
                      <Avatar
                        src={rocket.addedBy.avatar}
                        sx={{ bgcolor: red[500] }}
                        aria-label='recipe'
                      />
                    }
                    title={rocket.addedBy.username}
                    subheader={new Intl.DateTimeFormat('en-US', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric',
                    }).format(new Date(rocket.date))}
                  />
                  <CardMedia
                    component='img'
                    height='194'
                    image={rocket.photo}
                  />
                  <CardContent>
                    <Typography>Name: {rocket.name}</Typography>
                    <Typography>
                      Diameter: {rocket.diameter}
                    </Typography>
                    <Typography>Mass: {rocket.mass}</Typography>
                    <Typography>
                      Height: {rocket.height}
                    </Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                    {role == 'admin' ? (
                      <>
                        <IconButton
                          onClick={() => handleEdit(rocket._id)}
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          onClick={() =>
                            handleDelete(rocket._id)
                          }
                        >
                          <Delete />
                        </IconButton>
                      </>
                    ) : (
                      <IconButton>
                        <Favorite />
                      </IconButton>
                    )}
                    <ExpandMore
                      expand={expanded}
                      onClick={handleExpandClick}
                      aria-expanded={expanded}
                      aria-label='show more'
                    >
                      <ExpandMoreIcon />
                    </ExpandMore>
                  </CardActions>
                  <Collapse
                    in={expanded}
                    timeout='auto'
                    unmountOnExit
                  >
                    <CardContent>
                      <Typography variant='h5'>About</Typography>
                      <Typography
                        variant='body2'
                        color='text.secondary'
                      >
                        {rocket.description}
                      </Typography>
                    </CardContent>
                  </Collapse>
                </Card>
                {/* <RocketCard rocket={r} /> */}
              </Grid>
            ))
          ) : (
            <LoaderComponent />
          )}
          <h1>{error}</h1>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Stack spacing={3} style={{ marginTop: '12rem' }}>
          <Pagination
            count={10}
            page={pageNumber}
            onChange={handlePageChange}
            shape='rounded'
            showFirstButton
            showLastButton
          />
        </Stack>
      </Grid>
    </Grid>
  )
}
