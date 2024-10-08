import { Box, Heading } from '@chakra-ui/react'
import './App.css'
import AllRoutes from './Routes/AllRoutes'
import Navabar from './pages/Navabar'

function App() {
  

  return (

    <Box minH='100vh' bg='blackAlpha.500' textAlign='center'>
      <Navabar/>
      <AllRoutes/>

    </Box>
  )
}

export default App
