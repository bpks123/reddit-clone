import React, { useEffect,useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useMenuButtonTextStore from '../../stores/NavigatorStore/useMenuButtonTextStore';
import CommunityPageHeader from '../../components/CommunityPageComponent/CommunityPageHeader';
import  AllPagesLayout  from '../../components/Layout/AllPagesLayout';
import useThemeStore from '../../stores/ThemeStore/useThemeStore';
import CreatePostLink from '../../components/CommunityPageComponent/CreatePostLink';
import CommunityPosts from '../../components/CommunityPageComponent/CommunityPosts'
import AboutCommunityRHS  from '../../components/CommunityPageComponent/AboutCommunityRHS';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useLogInModalStore from '../../stores/ModalStore/LogInModalStore';
import userLogInStore from '../../stores/AuthenticationStore/userLogInStore';

export default function CommunityPage() {

    const { channelId } = useParams();
    console.log("Channel Id is: ",channelId)

    const {setLogInModal}=useLogInModalStore()
    const {isLoggedIn, setIsLoggedIn} = userLogInStore();
    const navigateTo=useNavigate()
    const { setMenuButtonText } = useMenuButtonTextStore();
    const [communityData, setCommunityData] = useState([]);
    const [communityPosts, setCommunityPosts] = useState([]);
    const [isJoined, setIsJoined] = useState(false);

    const {isDarkMode}=useThemeStore()
    const [getHeight,setHeight]=useState(window.innerHeight-50)

    useEffect(()=>{
        getCommunityByChannelID()
        getPostsOfCommunity()
    },[])

    async function getCommunityByChannelID(){
      const token=(sessionStorage.getItem("userToken"))
      try{
        let response = await fetch(`https://academics.newtonschool.co/api/v1/reddit/channel/${channelId}`,{
              headers:{
                projectId:'7k1ct68pbbmr',
                Authorization: `Bearer ${token}`,
            }
        })
        let result=await response.json()
        console.log(result.data)

        // Show channel name in the menu
        sessionStorage.setItem('menuButtonText', `r/${result.data.name}`);
        const updatedText = sessionStorage.getItem('menuButtonText');
        setMenuButtonText(updatedText);

        // Set the data of channel ID
        setCommunityData(result.data)
      }
      catch(error){
        console.log(error)
      }
    }

    async function getPostsOfCommunity(){
      try{
        let response=await fetch('https://academics.newtonschool.co/api/v1/reddit/post?limit=1000',{
            headers:  {
                'projectID': '7k1ct68pbbmr'
            }
        })
        let result=await response.json()
        // Getting all posts
        const allPosts=result.data
        console.log('All posts: ',allPosts)

        const filterByChannelId=allPosts.filter((item)=>{
          if(item.channel){
            return item.channel._id===channelId
          }
        })
        console.log('Filter by Channel ID: ',filterByChannelId)
        setCommunityPosts(filterByChannelId)
      }
      catch(error){
        console.log(error)
      }
    }

  // For increase the like when user press like button
    const increaseLike= async (postId)=>{
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
            getPostsOfCommunity()
     }
     catch(error){
      alert(error)
     }
    }

  // For decrease the like button when user dislike the posts
    const decreaseLike = async (postId) => {
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
          getPostsOfCommunity()
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
          getPostsOfCommunity()
    }
    catch(error){
      console.log(error)
    }
  }

  // Edit the Post
  function editPost(postDetails){
    navigateTo('/editPost', {state: {postDetails}});
  }

  // Comment the post
  function handleComment(postDetails){
    navigateTo(`/comment/${postDetails._id}`, {state: {postDetails}});
 }


  return (
    <div
      style={{
        backgroundColor: isDarkMode ? "rgb(0,0,0)" : "rgba(211,211,211,0.8)",
        minHeight: getHeight,
      }}
    >
      <CommunityPageHeader
        communityData={communityData}
        channelId={channelId}
        isJoined={isJoined} setIsJoined={setIsJoined}
      />
      <AllPagesLayout>
        {/* Left side  */}
        <>
          <CreatePostLink channelId={channelId} isJoined={isJoined}/>
          <CommunityPosts
            communityPosts={communityPosts}
            increaseLike={increaseLike}
            decreaseLike={decreaseLike}
            channelId={channelId}
            deletePost={deletePost}
            editPost={editPost}
            handleComment={handleComment}
            isJoined={isJoined}
          />
        </>
        {/* Right Side */}
        <>
          <AboutCommunityRHS communityData={communityData} communityPosts={communityPosts} isJoined={isJoined}/>
        </>
      </AllPagesLayout>
    </div>
  );
}
