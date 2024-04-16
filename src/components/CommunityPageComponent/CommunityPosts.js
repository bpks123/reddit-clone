import React from 'react'
import { Button, Stack, Text } from '@chakra-ui/react'
import useThemeStore from '../../stores/ThemeStore/useThemeStore';
import userLogInStore from '../../stores/AuthenticationStore/userLogInStore';
import useLogInModalStore from '../../stores/ModalStore/LogInModalStore'
import { useNavigate } from 'react-router-dom'

import { toast } from 'react-toastify';

export default function CommunityPosts({ communityPosts, increaseVote, decreaseVote, channelId, deletePost, editPost, handleComment, isJoined }) {

  const navigateTo = useNavigate();
  const { isDarkMode } = useThemeStore();
  const {isLoggedIn} = userLogInStore();
  const {setLogInModal}=useLogInModalStore();

  const onClickHandleAddPost=()=>{

    // check for logged in user
    if (!isLoggedIn) {
        setLogInModal(true);
        return;
      }

    // Before creating post check if user joined community or not only in community page
    if (channelId) {

      if (!isJoined) {
        toast.info('You have not joined the community',{
          position: "top-center",
          autoClose: 2000,
          theme: isDarkMode?"light":"colored",
        })
        return;
      }

    }

    navigateTo('/submitpost',{ state: { channelId } });
  }

  return (
    <>
            <Stack>
                
                    {/* IF THERE ARE NO POSTS SHOW ADD A POST BUTTON */}
                    <Stack padding={10} align="center" justify="center" border="1px dashed" borderColor={isDarkMode ? "#343536" : "black"} borderRadius="4px" height="300px">
                        <Text fontSize="15pt" fontWeight={700}>There are no posts in this subreddit</Text>
                        <Button height="34px" onClick={onClickHandleAddPost}
                          bg={'orange'}
                          borderRadius={'20px'}
                          >Add a post</Button>
                    </Stack>
                
            </Stack>
        </>
  )
}
