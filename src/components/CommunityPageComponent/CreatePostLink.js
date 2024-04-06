import React from 'react'
import { Flex, Icon, Input } from '@chakra-ui/react'
import { FaReddit } from "react-icons/fa"
import { BsLink45Deg } from "react-icons/bs"
import userLogInStore from '../../stores/AuthenticationStore/userLogInStore'
import useLogInModalStore from '../../stores/ModalStore/LogInModalStore'
import { useNavigate } from 'react-router-dom'

export default function CreatePostLink({ channelId, isAlertOpen, setIsAlertOpen, isJoined }) {
  
  const { isLoggedIn } = userLogInStore();
  const {setLogInModal}=useLogInModalStore();
  const navigateTo = useNavigate();

  const redirectToSubmitPost=()=>{

    // check for logged in user
    if (!isLoggedIn) {
        setLogInModal(true);
        return;
      }

    // Before creating post check if user joined community or not only in community page
    if (channelId) {

        if (!isJoined) {
          setIsAlertOpen(true);
          setTimeout(() => {
            setIsAlertOpen(false);
          }, 2000)
          return;
        }
  
      }
       //  if a logged in user 
    navigateTo('/submitpost', { state: { channelId } });
  }
    
  return (
    <Flex
      justify="space-evenly"
      align='center'
      bg={"white"}
      height="56px"
      borderRadius={4}
      border="1px solid"
      borderColor={"gray.300"}
      p={2}
      mb={4}
    >
      <Icon as={FaReddit} fontSize={36} color="gray.300" mr={4} />
      <Input
        placeholder="Create a Post"
        fontSize="10pt"
        bg={"gray.50"}
        borderColor={"gray.200"}
        borderRadius={4}
        value=""
        mr={4}
        _placeholder={{ color: "gray.500" }}
        _hover={{
          bg: "white",
          border: "1px solid",
          borderColor:"blue.500",
        }}
        _focus={{
          outline: "none",
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}

        onClick={redirectToSubmitPost}
      />
      <Icon as={BsLink45Deg} fontSize={24} color="gray.400" cursor="pointer" />

    </Flex>
  )
}
