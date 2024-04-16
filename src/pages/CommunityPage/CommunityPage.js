import React, { useEffect,useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useMenuButtonTextStore from '../../stores/NavigatorStore/useMenuButtonTextStore';
import CommunityPageHeader from '../../components/CommunityPageComponent/CommunityPageHeader';
import  AllPagesLayout  from '../../components/Layout/AllPagesLayout';
import useThemeStore from '../../stores/ThemeStore/useThemeStore';
import CreatePostLink from '../../components/CommunityPageComponent/CreatePostLink';
import CommunityPosts from '../../components/CommunityPageComponent/CommunityPosts'
import AboutCommunityRHS  from '../../components/CommunityPageComponent/AboutCommunityRHS';


export default function CommunityPage() {

    const { channelId } = useParams();
    console.log("Channel Id is: ",channelId)

    const { setMenuButtonText } = useMenuButtonTextStore();
    const [communityData, setCommunityData] = useState([]);
    const [communityPosts, setCommunityPosts] = useState([]);
    const [isJoined, setIsJoined] = useState(false);

    const {isDarkMode}=useThemeStore()
    const [getHeight,setHeight]=useState(window.innerHeight-44)

    useEffect(()=>{
        getCommunityByChannelID()
        
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

    }

    const increaseVote= async (postId)=>{
        console.log("You have voted")
    }
    const decreaseVote = async (postId) => {
      console.log("You have unlike the vote")
    }
    async function deletePost(postId) {
      console.log('You have deleted the post')
    } 
    function editPost(postDetails) {
      console.log("Edited the post")
    }
    function handleComment(postDetails) {
      console.log('handle the post comment')
    }



  return (
    <div style={{
      backgroundColor: isDarkMode ? "rgb(0,0,0)" : "rgba(211,211,211,0.8)",
      minHeight: getHeight,
    }}>
      <CommunityPageHeader communityData={communityData} channelId={channelId}/>
      <AllPagesLayout>
        {/* Left side  */}
        <>
          <CreatePostLink/>
          <CommunityPosts/>
        </>
        {/* Right Side */}
        <>
          <AboutCommunityRHS communityData={communityData}/>
        </>
      </AllPagesLayout>
    </div>
  )
}
