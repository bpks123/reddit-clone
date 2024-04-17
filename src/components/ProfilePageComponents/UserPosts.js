import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Stack, Text } from '@chakra-ui/react';
import useThemeStore from '../../stores/ThemeStore/useThemeStore';
import userLogInStore from '../../stores/AuthenticationStore/userLogInStore';
import useLogInModalStore from '../../stores/ModalStore/LogInModalStore';
import PostItem from '../HomePageComponents/PostItem';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function UserPosts({ userPosts, setUserPosts, fetchPosts }) {

  const { isLoggedIn, setIsLoggedIn } = userLogInStore();
  const {setLogInModal}=useLogInModalStore()
  const { isDarkMode } = useThemeStore();
  const loggedInUserDetails = JSON.parse(sessionStorage.getItem('loggedInUserDetails'));
  const navigateTo = useNavigate();

  // For increase the like when user press like button
  const increaseLike=async(postId)=>{
    if(!isLoggedIn){
      setLogInModal(true);
      return;
   }
   try{
      const token=(sessionStorage.getItem("userToken"))
      // API used to like the post
      let response=await fetch(`https://academics.newtonschool.co/api/v1/reddit/like/${postId}`,{
            method:'POST',
            headers:{
            projectId:'7k1ct68pbbmr',
            Authorization: `Bearer ${token}`
          },
          body:null //For like body will be none
          })
          // console.log(response)
          let result=await response.json()
          console.log(result)
          toast.success(result.message)
          fetchPosts()
   }
   catch(error){
    alert(error)
   }
  }

  const decreaseLike=async(postId)=>{
    if(!isLoggedIn){
      setLogInModal(true);
      return;
   }
   try{
      const token=(sessionStorage.getItem("userToken"))
      // API used to like the post
      let response=await fetch(`https://academics.newtonschool.co/api/v1/reddit/like/${postId}`,{
            method:'DELETE',
            headers:{
            projectId:'7k1ct68pbbmr',
            Authorization: `Bearer ${token}`
          },
          body:null //For like body will be none
          })
          // console.log(response)
          let result=await response.json()
          console.log(result)
          toast.success(result.message)
          fetchPosts()
   }
   catch(error){
    alert(error)
   }
  }

  // Delete the post 
  async function deletePost(PostId){
    console.log("Delte comment: ",PostId)
    try{
      const token=(sessionStorage.getItem("userToken"))
      // API used to delete the post
      let response=await fetch(`https://academics.newtonschool.co/api/v1/reddit/post/${PostId}`,{
            method:'DELETE',
            headers:{
              projectId:'7k1ct68pbbmr',
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
          }
          })
          console.log("Delete post info",response)
          if(response.ok){
            toast.success("Post successfully deleted!")
          }
          fetchPosts()
    }
    catch(error){
      console.log(error)
    }
  }

  function editPost(postDetails){
    navigateTo('/editPost', {state: {postDetails}});
  }


  function handleComment(postDetails){
    navigateTo(`/comment/${postDetails._id}`, {state: {postDetails}});
 }

  return (
    <>
    <Stack>
        {userPosts.length>0 ? userPosts.map((post, index) => (
          <PostItem
            key={index}
            post={post}
            increaseLike={increaseLike}
            decreaseLike={decreaseLike}
            editPost={editPost}
            deletePost={deletePost}
            handleComment={handleComment}
          />
        ))
        :
        <Text color={isDarkMode && "#d7dadc"}>No posts</Text>
        }
      </Stack>
    </>
  )
}
