import { styled, TextField, Box } from '@mui/material'
import { style } from '@mui/system'
const CustomizedTextField = styled(TextField)({
  width: '80%',
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
const CustomizedDiv = styled(Box)({
  fontWeight: 'bold',
  fontSize: '1.5rem',
  padding: '10px',
  color: 'blue',
})
export { CustomizedTextField, CustomizedBox, CustomizedDiv }
