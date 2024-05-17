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
     borderRadius={'20px'}
     bg={'#ff4500'}
     color={'white'}
     >Login</Button>

     <Button variant='solid' height='28px'
     display={{base: 'none', sm: 'flex'}}
     width={{base: "70px", md: '110px' }}
     mr={2}
     borderRadius={'20px'}
     onClick={()=>setSignUpModal(true)}
     bg={'#ff4500'}
     color={'white'}
     >Sign Up</Button>

    </>
  )
}
