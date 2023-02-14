import * as React from 'react'
import PropTypes from 'prop-types'
import { useNavigate, Outlet } from 'react-router-dom'
import { Logout, Rocket, Add } from '@mui/icons-material'

import {
  Typography,
  Toolbar,
  ListItemText,
  ListItemButton,
  ListItem,
  List,
  Drawer,
  Divider,
  CssBaseline,
  Box,
  AppBar,
  Avatar,
  ListItemIcon,
} from '@mui/material'

const drawerWidth = 240

function SideBar({ children, window }) {
  const role = localStorage.getItem('role')
  const avatar = localStorage.getItem('avatar')

  const navigate = useNavigate()

  // const { window } = props
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const handleClick = () => {
    navigate('/rocket/view')
  }
  const handleAdd = () => {
    navigate('/rocket/add')
  }
  const handleLogout = () => {
    localStorage.clear()
    navigate('/')
  }
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const drawer = (
    <div>
      <Toolbar
        style={{
          // border: '2px solid black',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '2rem 2rem',
        }}
      >
        <div>
          <Avatar src={avatar} />
        </div>
      </Toolbar>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={handleClick}>
            <ListItemIcon>
              <Rocket />
            </ListItemIcon>
            <ListItemText primary={'Rockets'} />
          </ListItemButton>
        </ListItem>
        {role == 'admin' && (
          <ListItem disablePadding>
            <ListItemButton onClick={handleAdd}>
              <ListItemIcon>
                <Add />
              </ListItemIcon>
              <ListItemText primary={'Add Rocket'} />
            </ListItemButton>
          </ListItem>
        )}
        <ListItem disablePadding>
          <ListItemButton onClick={handleLogout}>
            <ListItemIcon>
              <Logout />
            </ListItemIcon>
            <ListItemText primary={'Logout'} />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  )

  const container =
    window !== undefined
      ? () => window().document.body
      : undefined

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position='fixed'
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <Typography variant='h6' noWrap component='div'>
            Space X
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component='nav'
        sx={{
          width: { sm: drawerWidth },
          flexShrink: { sm: 0 },
        }}
        aria-label='mailbox folders'
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant='permanent'
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <main>
          <Outlet />
        </main>
        {/* <main>{children}</main> */}
      </Box>
    </Box>
  )
}

SideBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
}

export default SideBar
