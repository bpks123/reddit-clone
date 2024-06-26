import React from 'react'
import { Button, Center, Flex, useDisclosure } from '@chakra-ui/react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'
import useLogInModalStore from '../../../stores/ModalStore/LogInModalStore'
import  LoginInputs  from './LoginInputs'
export default function LoginModal() {

    const {showLogInModal, setLogInModal} = useLogInModalStore();

  return (
    <>
    <Modal isOpen={showLogInModal} onClose={()=>setLogInModal(false)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader textAlign='center'>Login</ModalHeader>
            <ModalCloseButton/>
            <ModalBody 
            display='flex'
            flexDirection='column'
            alignItems='center'
            justifyContent='center'
            pb={6}
            >
             <Flex 
             direction='column'
             align='center'
             justify='center'
             width='70%'
             >
                <LoginInputs/>

             </Flex>
            </ModalBody>

          </ModalContent>
        </Modal>
    </>
  )
}
