import React, { useState } from 'react'
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
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import Axios from 'API'
import { styled } from '@mui/material/styles'
import { red } from '@mui/material/colors'
const ExpandMore = styled((props) => {
  const { expand, ...other } = props
  return <IconButton {...other} />
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}))

const RocketCard = ({ rocket, setLoading }) => {
  const [expanded, setExpanded] = useState(false)
  const navigate = useNavigate()
  const handleExpandClick = () => {
    setExpanded(!expanded)
  }
  const role = localStorage.getItem('role')
  const token = localStorage.getItem('token')

  console.log(role)
  const date = new Date(rocket.date)
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
        navigate('/rocket/view')
      })
      .catch((e) => alert(e.response.data.message))
  }
  return (
    <div>
      {rocket ? (
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
            }).format(date)}
          />
          <CardMedia
            component='img'
            height='194'
            image={rocket.photo}
          />
          <CardContent>
            <Typography>Name: {rocket.name}</Typography>
            <Typography>Diameter: {rocket.diameter}</Typography>
            <Typography>Mass: {rocket.mass}</Typography>
            <Typography>Height: {rocket.height}</Typography>
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
                  onClick={() => handleDelete(rocket._id)}
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
          <Collapse in={expanded} timeout='auto' unmountOnExit>
            <CardContent>
              <Typography variant='h5'>About</Typography>
              <Typography variant='body2' color='text.secondary'>
                {rocket.description}
              </Typography>
            </CardContent>
          </Collapse>
        </Card>
      ) : null}
    </div>
  )
}

export default RocketCard
