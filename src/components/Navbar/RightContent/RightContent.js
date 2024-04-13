import React from 'react'
import { Flex } from '@chakra-ui/react'
import  AuthButton from './AuthButton'
import UserIcon from './UserIcon'
import UserMenuModal  from './UserMenuModel'
import  LoginModal  from '../../Modal/LoginModal/LoginModal'
import SignUpModal  from '../../Modal/SignUpModel/SignUpModal'
import userLogInStore from '../../../stores/AuthenticationStore/userLogInStore'

export default function RightContent() {

  const {isLoggedIn, setIsLoggedIn} = userLogInStore();

  return (
    <>
    <LoginModal/>
    <SignUpModal/>
      <Flex justify='center' align='center'>
    {/* If login the icon will be visible else login and signup will be show */}
      {isLoggedIn ? 
    <UserIcon />
    :
     <AuthButton/>}
     <UserMenuModal/>
    </Flex>
    </>
  )
}
