import React from 'react'
import { Box, Button, Flex, Icon, Stack, Text } from '@chakra-ui/react'
import {GiCheckedShield} from "react-icons/gi"
import useThemeStore from '../../../stores/ThemeStore/useThemeStore'
import { useNavigate } from 'react-router-dom'

export default function RedditPrimiumBox() {

    const {isDarkMode} = useThemeStore();
    const navigateTo = useNavigate();
    

  return (
    <Box borderRadius="4px" p={2} bg={isDarkMode ? "#1a1a1b" : "white"} border="1px solid" borderColor={isDarkMode ? "#343536" : "gray.300"}>
      <Flex>
        <Icon as={GiCheckedShield} fontSize="24px" color={isDarkMode?'red':"brand.100"} mt={1} mr={2}/>
        <Stack gap={0} fontSize="9pt" color={isDarkMode && "#d7dadc"}>
          <Text fontWeight={700}>Reddit Premium</Text>
          <Text>The best Reddit experience</Text>
        </Stack>
      </Flex>

      <Button width="100%" borderRadius="20px" color={'white'} bg={'#ff4500'} height="30px" mt={2} onClick={()=> navigateTo('/redditpremium')}>Try Now</Button>
    </Box>
  )
}
