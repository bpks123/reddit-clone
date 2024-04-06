import React, { useEffect, useState } from 'react'
import { Flex, Image } from '@chakra-ui/react'
import  RightContent  from '../Navbar/RightContent/RightContent'
import  Directory from '../Navbar/Directory/Directory'
import SearchInput from './SearchInput'
import userLogInStore from '../../stores/AuthenticationStore/userLogInStore'
export default function Navbar() {

  const {isLoggedIn} = userLogInStore();
  
  return (
    <Flex bg={'white'} height='44px' 
          padding={{base: '6px 0px', md: '6px 12px'}}
          justify={{md: 'space-between'}}
          // borderBottom={isDarkMode && '1px solid'}
          // borderBottomColor={isDarkMode && '#343536'}
          position="sticky"
          top={0}
          zIndex="999"

          >

       {/* NAVBAR -> LOGO DIV  */}
       <Flex align='center'
             width={{base: "40px", md: "auto"}}
             mr={{base: 0, md: 2}}
             cursor='pointer'
             display={{ md: 'flex'}}
             >
          {/* reddit logo */}
        <Image src="/images/redditFace.svg" height='30px'  /> 
        {/* reddit text logo */}
        <Image src={"/images/redditText.svg"} 
        height={"46px"}
        // ml={isDarkMode && 1}
        //unset = oposite of none
        display={{base: 'none', md: 'unset'}}/>
       </Flex>
       
       {/* HOME ICON AND DIRECTORY */}
       {isLoggedIn && <Directory />}

       
       {/* NAVBAR -> SEARCHINPUT */}
       <SearchInput/>
     
       {/* LOGIN LOGOUT BUTTON OR USER PROFILE */}
       <RightContent/>

    </Flex>
  )
}
