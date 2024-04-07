import React from 'react'
import { Box, Flex, Icon, Stack, Text } from '@chakra-ui/react'
import { FaReddit } from 'react-icons/fa'
import { MdDelete } from "react-icons/md";
import userLogInStore from '../../stores/AuthenticationStore/userLogInStore'
import { useNavigate } from 'react-router-dom'


export default function CommentItems({comment,deleteComment}) {

    const {isLoggedIn} = userLogInStore();
    const loggedInUserDetails = JSON.parse(sessionStorage.getItem('loggedInUserDetails') ) ;
    const navigateTo = useNavigate();

    function timeStamp(timeString){
        const dateObject = new Date(timeString);
        const options = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };

        const formattedDateWithTime = dateObject.toLocaleDateString('en-US', options);
        return formattedDateWithTime;
    }

  return (
    <Flex ml={8}>
            <Box mr={2}>
                <Icon as={FaReddit} fontSize={30} color="gray.300" />
            </Box>
            <Stack spacing={1}>
                <Stack direction="row" align="center" fontSize="8pt">
                    <Text fontWeight={700} 
                        //   color={isDarkMode &&  "#d7dadc"}
                           _hover={{color: "blue.500"}} 
                           cursor="pointer"
                        //    onClick={()=> redirectToProfile(comment.author)}
                           >
                            {comment.author}{" - "}{comment.author_details.name}
                            </Text>
                    <Text color="gray.500">{timeStamp(comment.createdAt)}</Text>
                </Stack>

                <Text fontSize="10pt" >{comment.content}</Text>
                
                {/* Delete post is visible is user added comment. */}
                <Stack direction="row" align="center" cursor="pointer" color="gray.500">
                  <>
                   {/* <Text fontSize="9pt" _hover={{ color: "blue.500" }}>
                    Edit
                   </Text> */}
                  {isLoggedIn && loggedInUserDetails._id === comment.author && <Text
                     fontSize="9pt"
                     _hover={{color: "blue.500"}}
                     onClick={()=>deleteComment(comment._id)}
                   >
                    Delete
                   </Text>
                   }
                  </>
                </Stack>
            </Stack>
    </Flex>        
  )
}
