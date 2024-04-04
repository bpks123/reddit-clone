import React from 'react'
import { Flex } from '@chakra-ui/react'
import  AuthButton from './AuthButton'
import UserIcon from './UserIcon'
import UserMenuModal  from './UserMenuModel'
export default function RightContent() {
  return (
    <>
      <Flex justify='center' align='center'>

    <UserIcon />

    {/* This authbutton enables when user not logged in */}
     {/* <AuthButton/> */}
     <UserMenuModal/>
    </Flex>
    </>
  )
}
