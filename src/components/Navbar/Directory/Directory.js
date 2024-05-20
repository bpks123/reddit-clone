import React, { useEffect, useState } from 'react';
import {
  Flex,
  Icon,
  Image,
  Menu,
  MenuButton,
  MenuList,
  Text,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { BsArrowUpRightCircleFill } from "react-icons/bs";
import { TiHome } from 'react-icons/ti';
import { FaReddit } from 'react-icons/fa'
import { MdError } from 'react-icons/md';
import { IoMdAdd } from 'react-icons/io';
import { FaEdit, FaRegComment } from 'react-icons/fa';
import { IoSearch } from "react-icons/io5";
import { PiShieldCheckeredFill } from "react-icons/pi";
import  Communities  from './Communities';
import useThemeStore from '../../../stores/ThemeStore/useThemeStore';
import useMenuButtonTextStore from '../../../stores/NavigatorStore/useMenuButtonTextStore';

export default function Directory() {

  const { menuButtonText, setMenuButtonText } = useMenuButtonTextStore();
  const { isDarkMode } = useThemeStore();


  return (
    <Menu>
      {/* If user is logged in then the menu will show */}
      <MenuButton
        cursor='pointer'
        padding='0px 6px'
        borderRadius={4}
        mr={2}
        ml={{ base: 0, md: 2 }}
        _hover={{ outline: "1px solid", outlineColor: isDarkMode ? "#343536" : "gray.300"  }}
      >
        <Flex  align='center'
            justify='space-between'
            width={{ base: "auto", lg: '200px' }}
            >

              <Flex align='center'> 
                {/* <Icon as={menuButtonText === 'Home' ? TiHome : menuButtonText === 'Oops!!!' ? MdError : FaReddit} fontSize={24} mr={{ base: 1, md: 2 }} color={menuButtonText !== 'Home' ? "blue.400" : isDarkMode ? "#D7DADC" : "black"} /> */}
                {menuButtonText == 'Home' && <Icon as={TiHome} fontSize={24} mr={{ base: 1, md: 2 }} color={isDarkMode ? "#D7DADC" : "black"}/>}
                {menuButtonText.startsWith('r/') && <Icon as={FaReddit} fontSize={24} mr={{ base: 1, md: 2 }} color="blue.400" bg={isDarkMode && "white"} borderRadius="20px"/>}
                {menuButtonText == 'Create Post' && <Icon as={IoMdAdd} fontSize={24} mr={{ base: 1, md: 2 }} color={isDarkMode ? "#D7DADC" : "black"}/>}
                {menuButtonText == 'Edit Post' && <Icon as={FaEdit} fontSize={20} mr={{ base: 1, md: 2 }} color={isDarkMode ? "#D7DADC" : "black"}/>}
                {menuButtonText == 'Post' && <Icon as={FaRegComment} fontSize={20} mr={{ base: 1, md: 2 }} color={isDarkMode ? "#D7DADC" : "black"}/>}
                {menuButtonText == 'Popular' && <Icon as={BsArrowUpRightCircleFill} fontSize={20} mr={{ base: 1, md: 2 }} color={isDarkMode ? "#D7DADC" : "black"}/>}
                {menuButtonText == 'Search Result' && <Icon as={IoSearch} fontSize={24} mr={{ base: 1, md: 2 }} color={isDarkMode ? "#D7DADC" : "black"}/>}
                {menuButtonText == 'Premium' && <Icon as={PiShieldCheckeredFill} fontSize={24} mr={{ base: 1, md: 2 }} color="brand.100"/>}
                {menuButtonText == 'Profile' && <Image src='/images/ProfileWhiteAvatarIcon.png' width="30px" height="30px" mr={{ base: 1, md: 2 }} borderRadius="20px" objectFit="cover"/>}
                {menuButtonText == 'Oops!!!' && <Icon as={MdError} fontSize={24} mr={{ base: 1, md: 2 }} color="brand.100"/>}
              
              <Flex display={{ base: "none", lg: 'flex' }} >
                {/* BELOW IS MENU BUTTON TEXT */}
                <Text fontWeight={600}
                  fontSize='10pt'
                  color={isDarkMode && "#D7DADC"}
                >
                  {menuButtonText}
                </Text>
              </Flex>

              </Flex>
              {/* DROP-DOWN ARROW */}
            <ChevronDownIcon  color={isDarkMode && "#D7DADC"}/>

        </Flex>
      </MenuButton>
      <MenuList bg={isDarkMode ? "#1a1a1b" : "white"} border={isDarkMode && "1px solid"} borderColor={isDarkMode && "#343536"} maxHeight="300px" overflowY={'auto'}>
        <Communities />
        {/* <Communities createdCommunityData={createdCommunityData} handleCommunityClick={handleCommunityClick} userFollowedCommunity={userFollowedCommunity} /> */}
      </MenuList>
    </Menu>
  )
}
