import React,{useEffect,useState} from 'react'
import { Box, Text, chakra } from '@chakra-ui/react'
import AllPagesLayout  from '../../components/Layout/AllPagesLayout'
import { useLocation } from 'react-router-dom'
import useThemeStore from '../../stores/ThemeStore/useThemeStore'
import EditPostForm from '../../components/EditPostPageComponents/EditPostForm'
import useMenuButtonTextStore from '../../stores/NavigatorStore/useMenuButtonTextStore'

export default function EditPostPage() {

  const location=useLocation()

    // console.log("Edit post: ",location.state.postDetails)
  
    const {isDarkMode} = useThemeStore();
    const {setMenuButtonText} = useMenuButtonTextStore();
    const [getHeight,setHeight]=useState(window.innerHeight-44)


    useEffect(()=>{
      setMenuButtonText('Edit Post');
      sessionStorage.setItem('menuButtonText', 'Edit Post');
    }, [])  

  return (
    <div style={{backgroundColor:isDarkMode?"rgb(0,0,0)":"rgba(211,211,211,0.8)", minHeight:getHeight}}>

    <AllPagesLayout>
            {/* LHS */}
            <>
                <Box p="14px 0px" borderBottom="1px solid" borderColor="white">
                    <Text fontSize="30px" fontWeight={600} color={isDarkMode && "#d7dadc"}>Edit a Post</Text>
                </Box>
                <EditPostForm  postDetails={location.state.postDetails} channelId={location.state.channelId} postId={location.state.postId} />
            </>

            {/* RHS */}
            <>
            Right
              {/* <SubmitPostRhs/> */}
            </>
        </AllPagesLayout>
      </div>
  )
}
