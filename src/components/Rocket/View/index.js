import React, { useEffect, useState } from 'react'
import RocketCard from './RocketCard/RocketCard'
// import Axios from 'API'
import Axios from 'API'
// import Axios from 'components/src/Axios'
import { Grid, Pagination, Stack } from '@mui/material'
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
} from '@mui/material'

import {
  Delete,
  Edit,
  Favorite,
  ExpandMore as ExpandMoreIcon,
  ExpandMore,
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

import { styled } from '@mui/material/styles'
import { red } from '@mui/material/colors'
export default function ViewRocket() {
  const role = localStorage.getItem('role')
  const token = localStorage.getItem('token')
  const [rockets, setRockets] = useState([])
  const [loading, setLoading] = useState(false)
  const [pageNumber, setPageNumber] = useState(1)
  const navigate = useNavigate()
  console.log(pageNumber)
  const handlePageChange = (e, v) => {
    setPageNumber(v)
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
        setRockets(res.data)
        setLoading(true)
      })
      .catch((e) => {
        setLoading(true)
      })
  }, [loading, pageNumber])

  return (
    <Grid containter spacing={2}>
      <Grid item xs={12}>
        <Grid container justify='center' spacing={2}>
          {loading ? (
            rockets.map((r) => (
              <Grid key={r._id} item>
                <RocketCard
                  rocket={r}
                  loading={loading}
                  setLoading={setLoading}
                />
              </Grid>
            ))
          ) : (
            <LoaderComponent />
          )}
        </Grid>
        <Stack spacing={3} style={{ marginTop: '11rem' }}>
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
