import React from 'react'
import { Button } from '@chakra-ui/react'
import useLogInModalStore from '../../../stores/ModalStore/LogInModalStore'
import useSignUpModalStore from '../../../stores/ModalStore/SignUpModalStore'
export default function AuthButton() {

  const {showSignUpModal, setSignUpModal} = useSignUpModalStore();
  const {showLogInModal, setLogInModal} = useLogInModalStore();
  
  return (
    <>
      <Button variant="outline" height='28px' 
     display={{base: 'none', sm: "flex"}} 
     width={{base: "70px", md: "110px"}}
     mr={2}
     onClick={()=>setLogInModal(true)}
     bg={'orange'}
     >Login</Button>

     <Button variant='solid' height='28px'
     display={{base: 'none', sm: 'flex'}}
     width={{base: "70px", md: '110px' }}
     mr={2}
     onClick={()=>setSignUpModal(true)}
     bg={'orange'}
     >Sign Up</Button>

    </>
  )
}
