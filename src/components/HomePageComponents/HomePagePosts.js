import React from 'react'
import { Flex, Heading, Icon, Image, Stack, Text } from '@chakra-ui/react'
import userLogInStore from '../../stores/AuthenticationStore/userLogInStore'
import useLogInModalStore from '../../stores/ModalStore/LogInModalStore'
import PostItem from './PostItem'
export default function HomePagePosts({postData, setPostData, fetchPosts}) {

  const {isLoggedIn, setIsLoggedIn} = userLogInStore();
  const {setLogInModal}=useLogInModalStore()
  return (
    <>
      <Stack>
        {postData? postData.length>0 && postData.map((post,index)=>(
            <PostItem  post={post} index={index}/>
        )):
        <div>Loading...</div>
        }
      </Stack>
    </>
  )
}
