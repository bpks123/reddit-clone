import React from 'react'
import { Flex, Icon, Input } from '@chakra-ui/react'
import { FaReddit } from "react-icons/fa"
import { BsLink45Deg } from "react-icons/bs"
import userLogInStore from '../../stores/AuthenticationStore/userLogInStore'
import useLogInModalStore from '../../stores/ModalStore/LogInModalStore'
import { useNavigate } from 'react-router-dom'
import useThemeStore from '../../stores/ThemeStore/useThemeStore'

export default function CreatePostLink() {
  
  const { isLoggedIn } = userLogInStore();
  const {setLogInModal}=useLogInModalStore();
  const navigateTo = useNavigate();
  const { isDarkMode } = useThemeStore();

  const redirectToSubmitPost=()=>{

    // check for logged in user
    if (!isLoggedIn) {
        setLogInModal(true);
        return;
      }

    navigateTo('/submitpost');
  }
    
  return (
    <Flex
    justify="space-evenly"
    align='center'
    bg={isDarkMode ? "#1a1a1b" : "white"}
    height="56px"
    borderRadius={4}
    border="1px solid"
    borderColor={isDarkMode ? "#343536" : "gray.300"}
    p={2}
    mb={4}
    >
      <Icon as={FaReddit} fontSize={36} color="gray.300" mr={4} />
      <Input
        placeholder="Create a Post"
        fontSize="10pt"
        bg={isDarkMode ? "#272729" : "gray.50"}
        borderColor={isDarkMode ? "none" : "gray.200"}
        borderRadius={4}
        value=""
        mr={4}
        _placeholder={{ color: "gray.500" }}
        _hover={{
          bg: isDarkMode ? "#343536" : "white",
          border: "1px solid",
          borderColor: isDarkMode ? "#d7dadc" : "blue.500",
        }}
        _focus={{
          outline: "none",
          bg: isDarkMode ? "#343536" : "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}

        onClick={redirectToSubmitPost}
      />
      <Icon as={BsLink45Deg} fontSize={24} color="gray.400" cursor="pointer" />

    </Flex>
  )
}
