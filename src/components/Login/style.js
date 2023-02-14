import { styled, TextField, Box } from '@mui/material'
const CustomizedTextField = styled(TextField)({
  width: '100%',
  margin: '10px 0',
})

const CustomizedBox = styled(Box)({
  backgroundColor: '#f9f9f9',
  padding: '20px',
  borderRadius: '10px',
  boxShadow: '0px 0px 10px #ccc',
  padding: '5rem',
  display: 'flex',
  allignItems: 'center',
  justifyContent: 'center',
  alignSelf: 'center',
})
export { CustomizedTextField, CustomizedBox }
