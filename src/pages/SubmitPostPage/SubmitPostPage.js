import React,{useEffect} from 'react'
import AllPagesLayout from '../../components/Layout/AllPagesLayout'
import { Box, Text } from '@chakra-ui/react'
import { useLocation } from 'react-router-dom'
import NewPostForm from '../../components/SubmitPostPageComponents/NewPostForm'
import useThemeStore from '../../stores/ThemeStore/useThemeStore'
import useMenuButtonTextStore from '../../stores/NavigatorStore/useMenuButtonTextStore'

export default function SubmitPostPage() {

  const location=useLocation()
  console.log("current data", location.state);

  const {isDarkMode} = useThemeStore();
  const {setMenuButtonText} = useMenuButtonTextStore();

  useEffect(()=>{
    setMenuButtonText('Create Post');
    sessionStorage.setItem('menuButtonText', 'Create Post');
  }, [])  
  

  return (
    <AllPagesLayout>

     {/* LHS */}
     <>
      <Box p="14px 0px" borderBottom="1px solid" borderColor={isDarkMode ? "#343536" : "white"} color={isDarkMode && "#d7dadc"}>
        <Text fontSize="30px" fontWeight={600}>Create a Post</Text>
      </Box>
      <NewPostForm channelId={location.state.channelId && location.state.channelId}/>
     </>

     {/* RHS */}
     <>
      {/* <SubmitPostRhs/> */}
     </>

   </AllPagesLayout>
  )
}
