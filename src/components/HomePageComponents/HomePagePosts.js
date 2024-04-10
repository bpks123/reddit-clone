import React,{useState} from 'react'
import { Flex, Heading, Icon, Image, Stack, Text } from '@chakra-ui/react'
import userLogInStore from '../../stores/AuthenticationStore/userLogInStore'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useLogInModalStore from '../../stores/ModalStore/LogInModalStore'
import PostItem from './PostItem'
import { useNavigate } from 'react-router-dom';


export default function HomePagePosts({postData, setPostData, fetchPosts}) {

  const {isLoggedIn, setIsLoggedIn} = userLogInStore();
  const {setLogInModal}=useLogInModalStore()
  const navigateTo = useNavigate();
  console.log(postData)

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

  // For decrease the like button when user dislike the posts
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
        {postData.map((post, index) => (
          <PostItem
            key={index}
            post={post}
            increaseLike={increaseLike}
            decreaseLike={decreaseLike}
            editPost={editPost}
            deletePost={deletePost}
            handleComment={handleComment}
          />
        ))}
      </Stack>
    </>
  );
}
