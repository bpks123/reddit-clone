import React,{useEffect, useState} from 'react'
import { Button, Flex, Heading, Stack, Text } from '@chakra-ui/react'
import  AllPagesLayout  from '../../components/Layout/AllPagesLayout';
import userLogInStore from '../../stores/AuthenticationStore/userLogInStore'
import CreatePostLink from '../../components/CommunityPageComponent/CreatePostLink';
import HomePagePosts from '../../components/HomePageComponents/HomePagePosts';
import FilterBox from '../../components/HomePageComponents/FilterBox';
import Loading from '../../components/HomePageComponents/loading.gif'
import useMenuButtonTextStore from '../../stores/NavigatorStore/useMenuButtonTextStore';
import CommunityRecommendation from '../../components/HomePageComponents/CommunityRecommendation';
import useThemeStore from '../../stores/ThemeStore/useThemeStore';
import RedditPrimiumBox from '../../components/HomePageComponents/RHSComponent/RedditPrimiumBox';
import RedditHomeBox from '../../components/HomePageComponents/RHSComponent/RedditHomeBox';

export default function HomePage() {

  const { isLoggedIn } = userLogInStore();
  const [postData, setPostData] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedFilterTab, setSelectedFilterTab] = useState('New');
  const {setMenuButtonText} = useMenuButtonTextStore();
  const {isDarkMode} = useThemeStore();
  const [getHeight,setHeight]=useState(window.innerHeight-50)

useEffect(()=>{
    fetchPosts()
},[selectedFilterTab])

useEffect(()=>{
  setMenuButtonText('Home');
  sessionStorage.setItem('menuButtonText', 'Home');
}, [])  


async function fetchPosts(){
    try{
        let response=await fetch('https://academics.newtonschool.co/api/v1/reddit/post?limit=1000',{
            headers:  {
                'projectID': '7k1ct68pbbmr'
            }
        })
        let result=await response.json()
        let allPosts=result.data
        let bestPosts=[...allPosts].reverse()
        // setPostData()
        // console.log(result.data)
        console.log(postData)

        // If user not logged in. It will shows new posts.
        if(!isLoggedIn || selectedFilterTab === "Best" ){
          console.log("Best data",bestPosts)
          setPostData(bestPosts)
          return;
        }

      // IF SELECTED "NEW" SHOW NEWEST POST
        if (selectedFilterTab === "New") {
          console.log('new posts home', allPosts);
          setPostData(allPosts);
          return;
        }

        // IF SELECTED "HOT" SHOW MOST COMMENTS POSTS
      if (selectedFilterTab === "Hot") {
        let hotPosts = [...allPosts];
        hotPosts.sort((a, b) => b.commentCount - a.commentCount);
        console.log('hot posts home', hotPosts);
        setPostData(hotPosts);
        return;
      }

      // IF SELECTED "TOP" SHOW MOST LIKED POSTS
      if (selectedFilterTab === 'Top') {
        let topPosts = [...allPosts];
        topPosts.sort((a, b) => b.likeCount - a.likeCount);
        console.log('top posts home', topPosts);
        setPostData(topPosts);
        return;
      }
      
    }
    catch(error){
        console.log(error)
    }
}
  return (
    <div style={{backgroundColor:isDarkMode?"rgb(0,0,0)":"rgba(211,211,211,0.8)", minHeight:getHeight}}>
      <AllPagesLayout>

{/* Left Hand Side */}
  <>
    <CreatePostLink/>
    {isLoggedIn && <FilterBox selectedFilterTab={selectedFilterTab} setSelectedFilterTab={setSelectedFilterTab}/>}
    {postData.length>0? 
      <HomePagePosts postData={postData} setPostData={setPostData} fetchPosts={fetchPosts} />
        :<img width={'100px'} style={{marginLeft:'40%',marginTop:'20%'}} src={Loading}/>
  }
  </>
{/* Right Hand side */}
  <>
     {isLoggedIn && <RedditPrimiumBox/>}
     {isLoggedIn && <RedditHomeBox/>}
    <CommunityRecommendation/>
  </>


    </AllPagesLayout>
    </div>
    
  )
}
