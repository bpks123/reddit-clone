import React, { useEffect, useState } from 'react'
import { Flex, Image } from '@chakra-ui/react'
import  RightContent  from '../Navbar/RightContent/RightContent'
import  Directory from '../Navbar/Directory/Directory'
import SearchInput from './SearchInput'
import userLogInStore from '../../stores/AuthenticationStore/userLogInStore'
import useThemeStore from '../../stores/ThemeStore/useThemeStore'
import { useNavigate } from 'react-router-dom'

export default function Navbar() {

  const {isLoggedIn} = userLogInStore();
  const {isDarkMode}  = useThemeStore();
  const navigateTo = useNavigate();

  
  return (
    <Flex bg={isDarkMode ? "#1A1A1B" : 'white'} height='50px' 
          padding={{base: '6px 0px', md: '6px 12px'}}
          justify={{md: 'space-between'}}
          borderBottom={isDarkMode && '1px solid'}
          borderBottomColor={isDarkMode && '#343536'}
          position="sticky"
          top={0}
          zIndex="999"
          >

       {/* NAVBAR -> LOGO DIV  */}
       <Flex align='center'
             width={{base: "40px", md: "auto"}}
             mr={{base: 0, md: 2}}
             cursor='pointer'
             onClick={()=>navigateTo('/')}
             display={{base: isLoggedIn && 'none', md: 'flex'}}
             >
          {/* reddit logo */}
        <Image src="/images/redditFace.svg" height='30px' ml={{base: 1, md:0}} mt={{base: 1, md:0}} /> 
        {/* reddit text logo */}
        <Image src={isDarkMode ? "/images/redditWhiteText.svg" : "/images/redditText.svg"}
        height={isDarkMode ? "16px" : "46px"}
        ml={isDarkMode && 1}
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
