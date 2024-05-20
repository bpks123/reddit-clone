import React from 'react'
import { Box, Button, Flex, Image, Stack, Text } from '@chakra-ui/react'
import useThemeStore from '../../../stores/ThemeStore/useThemeStore'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function RedditHomeBox() {

  const {isDarkMode} = useThemeStore();
  const navigateTo = useNavigate();

  function createPost(channelId){
    console.log("home page channelId", channelId);

    navigateTo('/submitpost', {state: {channelId}});
  }

  const onHandleClick=()=>{
    toast.info('Work in Progress.',{
      position: "top-center",
      autoClose: 2000,
      theme: isDarkMode?"light":"colored",
    })
  }
  
  return (
    <Stack mt={2} mb={2} gap={0}  maxWidth="320px" borderRadius="4px" overflow="hidden" border="1px solid" borderColor={isDarkMode ? "#343536" : "gray.300"} >

     <Image src='/images/redditPersonalHome.png' width="100%" height="30px" objectFit="cover"/>

    <Box  p={2} bg={isDarkMode ? "#1a1a1b" : "white"}  position="relative" color={isDarkMode && "#d7dadc"}>

    <Image src={'/images/redditStanding.png'} position="absolute" top="-12px" height="68px" width="40px" />

         <Flex align="center" justify="center" width="55%" height="55px"> 
            <Text fontWeight={600}>Home</Text>
         </Flex>

         <Text fontSize="10pt">Your personal Reddit frontpage. Come here to check in your favourite communities.  </Text>
         <Button 
             width="100%" 
             height="30px" 
             mt={6} borderRadius="20px"
             _hover={{bg: isDarkMode ? "#343536" : "gray.100"}} 
             onClick={()=> createPost()}
             bg={'#ff4500'}
             color={'white'}
             >
              Create Post
        </Button>
        <Button variant="outline" 
             width="100%" 
             height="30px" 
             mt={6} borderRadius="20px"
             _hover={{bg: isDarkMode ? "#343536" : "gray.100"}} 
             onClick={onHandleClick}
             bg={'blue.500'}
             >
              Create Community
        </Button>

    </Box>
    </Stack>
  )
}
