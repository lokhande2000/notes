import { Flex, Heading } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

const Navabar = () => {
  return (
    <Flex bg='#000' color='red' shadow='xl' px={10} py={2} justify='space-between' align='center' >
      <Heading as='h2'>notes</Heading>
      <Link to='/addnote'>Add Note</Link>
    </Flex>
  )
}

export default Navabar
