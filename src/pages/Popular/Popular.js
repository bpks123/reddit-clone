import React, { useEffect, useState } from "react";
import AllPagesLayout from "../../components/Layout/AllPagesLayout";
import userLogInStore from "../../stores/AuthenticationStore/userLogInStore";
import Loading from "../../components/HomePageComponents/loading.gif";
import useThemeStore from "../../stores/ThemeStore/useThemeStore";
import CommunityRecommendation from "../../components/HomePageComponents/CommunityRecommendation";
import HomePagePosts from '../../components/HomePageComponents/HomePagePosts';
import useMenuButtonTextStore from '../../stores/NavigatorStore/useMenuButtonTextStore';

export default function Popular() {

  const { isLoggedIn } = userLogInStore();
  const [postData, setPostData] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const { isDarkMode } = useThemeStore();
  const {setMenuButtonText} = useMenuButtonTextStore();
  const [getHeight, setHeight] = useState(window.innerHeight - 50);

useEffect(()=>{
    fetchPosts()
},[])

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
        let hotPosts = [...allPosts];
        hotPosts.sort((a, b) => b.commentCount - a.commentCount);
        console.log('hot posts home', hotPosts);
        setPostData(hotPosts);

    }
    catch(error){
        console.log(error)
    }
}

  return (
    <div style={{backgroundColor:isDarkMode?"rgb(0,0,0)":"rgba(211,211,211,0.8)", minHeight:getHeight}}>
        <AllPagesLayout>
        {/* Left side */}
        <>
        {postData.length>0? 
      <HomePagePosts postData={postData} setPostData={setPostData} fetchPosts={fetchPosts} />
        :<img width={'100px'} style={{marginLeft:'40%',marginTop:'20%'}} src={Loading}/>
  }
        </>
        {/* RIght side */}
        <>
            <CommunityRecommendation/>

        </>


        </AllPagesLayout>
    </div>
  );
}
