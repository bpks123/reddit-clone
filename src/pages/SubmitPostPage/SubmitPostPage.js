import React,{useEffect, useState} from 'react'
import AllPagesLayout from '../../components/Layout/AllPagesLayout'
import { Box, Text } from '@chakra-ui/react'
import { useLocation } from 'react-router-dom'
import NewPostForm from '../../components/SubmitPostPageComponents/NewPostForm'
import useThemeStore from '../../stores/ThemeStore/useThemeStore'
import useMenuButtonTextStore from '../../stores/NavigatorStore/useMenuButtonTextStore'
import { SubmitPostRhs } from '../../components/SubmitPostPageComponents/SubmitPostRhs'
export default function SubmitPostPage() {

  const location=useLocation()
  console.log("current data", location.state);
  const [getHeight,setHeight]=useState(window.innerHeight-50)

  const {isDarkMode} = useThemeStore();
  const {setMenuButtonText} = useMenuButtonTextStore();

  useEffect(()=>{
    setMenuButtonText('Create Post');
    sessionStorage.setItem('menuButtonText', 'Create Post');
  }, [])  
  

  return (
    <div style={{backgroundColor:isDarkMode?"rgb(0,0,0)":"rgba(211,211,211,0.8)", minHeight:getHeight}}>
      <AllPagesLayout>
        {/* LHS */}
        <>
          <Box
            p="14px 0px"
            borderBottom="1px solid"
            borderColor={isDarkMode ? "#343536" : "white"}
            color={isDarkMode && "#d7dadc"}
          >
            <Text fontSize="30px" fontWeight={600}>
              Create a Post
            </Text>
          </Box>
          <NewPostForm channelId={location.state.channelId && location.state.channelId}/>
        </>

        {/* RHS */}
        <>
          <SubmitPostRhs/>
        </>
        
      </AllPagesLayout>
    </div>
  );
}
