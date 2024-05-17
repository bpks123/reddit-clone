import React from 'react'
import { Button, Flex, Icon, Text, Textarea } from '@chakra-ui/react'
import {CiCirclePlus} from "react-icons/ci"
import useLogInModalStore from '../../stores/ModalStore/LogInModalStore'
import userLogInStore from '../../stores/AuthenticationStore/userLogInStore'
import useThemeStore from '../../stores/ThemeStore/useThemeStore'

export default function CommentInput({ commentText, setCommentText, handleCommentClick, btnLoading }) {

  const loggedInUserDetails = JSON.parse( sessionStorage.getItem('loggedInUserDetails') );

  const {isLoggedIn, setIsLoggedIn} = userLogInStore();
  const {setLogInModal}=useLogInModalStore()
  const {isDarkMode} = useThemeStore();

  return (
    <Flex direction="column" position="relative">
      {
        loggedInUserDetails && 
          <Text mb={1} color="gray.500">
                    Comment as {loggedInUserDetails.name}
          </Text>
      }
      {isLoggedIn ? <Textarea
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    fontSize="10pt"
                    borderRadius={4}
                    minHeight="160px"
                    pb={10}
                    border="none"
                    outline="1px solid"
                    outlineColor={isDarkMode ? "#343536" : "gray.300"}
                    color={isDarkMode && "#d7dadc"}
                    placeholder='What are your thoughts?'
                    _placeholder={{ color: "gray.500" }}
                    _focus={{
                        outline: "none",
                        bg: isDarkMode ? "#272729" : "white",
                        border: "1px solid black"
                    }}
                    
                />
                : 
                 <Flex align='center' justify='center'
                        border="1px solid" 
                        borderColor={isDarkMode ? "#d7dadc" : "brand.100"} 
                        color={isDarkMode ? "#d7dadc" : "brand.100"}
                        width='50%' 
                        borderRadius="20px" 
                        padding='6px'
                        cursor="pointer"
                        _hover={{bg: isDarkMode ? "#343536" : "gray.100"}}
                        onClick={()=> setLogInModal(true)}

                        >
                    <Icon as={CiCirclePlus} fontSize="24px" mr={1}/>
                    <Text>Add a comment</Text>
                 </Flex>
                }

                {/* Comment Button */}
            {isLoggedIn &&  <Flex
                    position="absolute"
                    left="1px"
                    right={0.1}
                    bottom="1px"
                    justify="flex-end"
                    p="6px 6px"
                    borderRadius="0px 0px 4px 4px"
                    zIndex={5}
                >
                    <Button
                        height="26px"
                          isDisabled={!commentText.length}
                        isLoading={btnLoading}
                        bg={'#ff4500'}
                        onClick={() => handleCommentClick()}
                    >
                        Comment
                    </Button>

                </Flex>}

    </Flex>
  )
}
