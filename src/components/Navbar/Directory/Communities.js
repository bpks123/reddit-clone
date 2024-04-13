import React from 'react'
import { Box, Flex, Icon, MenuItem, Text } from '@chakra-ui/react'
import { GrAdd } from 'react-icons/gr'
import { TiHome } from 'react-icons/ti'
import { FaArrowUpRightDots } from 'react-icons/fa6'
import  FollowedCommunityList  from './FollowedCommunityList'
import {useNavigate} from 'react-router-dom'
import useThemeStore from '../../../stores/ThemeStore/useThemeStore'

export default function Communities() {

  const { isDarkMode } = useThemeStore();
  const navigateTo = useNavigate();
  

  return (
    <>
      {/* MENU BOX */}
      <Box mt={3} mb={3} >
         {/* FEEDS HOME POPULAR */}
         <Text pl={3} mb={1} fontSize="7pt" fontWeight={500} color="gray.500">
          FEEDS
        </Text>
        {/* 1st menu item */}
        <MenuItem
          width='100%'
          fontSize='10pt'
          bg={isDarkMode && "#1a1a1b"}
          color={isDarkMode && "#d7dadc"}
          _hover={{ bg: isDarkMode ? "#343536" : "gray.100" }}
          onClick={()=>navigateTo('/')}
          // onClick={(e) => handleCommunityClick(e)}
        >
          <Flex align='center'>
            <Icon as={TiHome}
              fontSize={20}
              mr={2}
            />
            Home
          </Flex>
        </MenuItem>

        {/* 2nd menu item */}
        <MenuItem
          width='100%'
          fontSize='10pt'
          bg={isDarkMode && "#1a1a1b"}
          color={isDarkMode && "#d7dadc"}
          _hover={{ bg: isDarkMode ? "#343536" : "gray.100" }}
        >
          <Flex align='center'>
            <Icon as={FaArrowUpRightDots}
              fontSize={20}
              mr={2}
            />
            Poplular
          </Flex>
        </MenuItem>

        {/* MODERATING COMMUNITIES LIST */}
        <Text pl={3} mt={2} mb={1} fontSize="7pt" fontWeight={500} color="gray.500">
          MODERATING
        </Text>

        {/* CREATE COMMUNITY OPTION */}
        <MenuItem
          width='100%'
          fontSize='10pt'
          bg={isDarkMode && "#1a1a1b"}
          color={isDarkMode && "#d7dadc"}
          _hover={{ bg: isDarkMode ? "#343536" : "gray.100" }}
          // onClick={() => setCommunityModal(true)}
        >
          <Flex align='center'>
            <Icon as={GrAdd}
              fontSize={20}
              mr={2}
            />
            Create Community
          </Flex>
        </MenuItem>
        
      </Box>
    </>
  )
}
