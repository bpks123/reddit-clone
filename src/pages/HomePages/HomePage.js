import React,{useEffect, useState} from 'react'
import { Button, Flex, Heading, Stack, Text } from '@chakra-ui/react'
import  AllPagesLayout  from '../../components/Layout/AllPagesLayout';
import userLogInStore from '../../stores/AuthenticationStore/userLogInStore'
import CreatePostLink from '../../components/CommunityPageComponent/CreatePostLink';
import HomePagePosts from '../../components/HomePageComponents/HomePagePosts';
export default function HomePage() {

  const { isLoggedIn } = userLogInStore();
  const [postData, setPostData] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedFilterTab, setSelectedFilterTab] = useState('New');

useEffect(()=>{
    fetchPosts()
},[])
async function fetchPosts(){
    try{
        let response=await fetch('https://academics.newtonschool.co/api/v1/reddit/post',{
            headers:  {
                'projectID': '7k1ct68pbbmr'
            }
        })
        let result=await response.json()
        setPostData(result.data)
        // console.log(result.data)
        console.log(postData)
    }
    catch(error){
        alert(error)
    }
}
  return (
    <AllPagesLayout>

      {/* Left Hand Side */}
      <>
        <CreatePostLink/>
        <HomePagePosts postData={postData} setPostData={setPostData} fetchPosts={fetchPosts} />
      </>
      {/* Right Hand side */}
      <>
        Right content
      </>
      
      
    </AllPagesLayout>
  )
}
