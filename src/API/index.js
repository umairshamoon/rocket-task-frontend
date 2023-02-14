import axios from 'axios'

export default axios.create({
  baseURL:
    // 'https://rocket-task-server-l5s9us8fp-umairshamoon513-gmailcom.vercel.app/api/',
    'http://localhost:5000/api/',
})
