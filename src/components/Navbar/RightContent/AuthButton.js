import React from 'react'
import { Button } from '@chakra-ui/react'
export default function AuthButton() {
  return (
    <>
      <Button variant="outline" height='28px' 
     display={{base: 'none', sm: "flex"}} 
     width={{base: "70px", md: "110px"}}
     mr={2}
    //  onClick={()=>setLogInModal(true)}
     >Login</Button>

     <Button variant='solid' height='28px'
     display={{base: 'none', sm: 'flex'}}
     width={{base: "70px", md: '110px' }}
     mr={2}
    //  onClick={()=>setSignUpModal(true)}
     >Sign Up</Button>

    </>
  )
}
