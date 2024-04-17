import React,{useEffect, useState} from 'react'
import useThemeStore from '../../stores/ThemeStore/useThemeStore';
import AllPagesLayout  from '../../components/Layout/AllPagesLayout';
import UserDetails from '../../components/ProfilePageComponents/UserDetails';
import UserPosts from '../../components/ProfilePageComponents/UserPosts';
import useMenuButtonTextStore from '../../stores/NavigatorStore/useMenuButtonTextStore';

import { useParams } from 'react-router-dom'

export default function ProfilePage() {

  // To get the userId of the user
  const {userId} = useParams();
  console.log("User Id: ",userId)

  const {isDarkMode} = useThemeStore();
  const {setMenuButtonText} = useMenuButtonTextStore();
  
  const [userPosts, setUserPosts] = useState([]);
  const [userDetails, setUserDetails] = useState(false);


  const [getHeight,setHeight]=useState(window.innerHeight-44)

  useEffect(()=>{
    fetchPosts()
    fetchUserDetails()
    setMenuButtonText('Profile');
    sessionStorage.setItem('menuButtonText', 'Profile');
  }, [])  

  async function fetchPosts(){
    try{
      let response=await fetch('https://academics.newtonschool.co/api/v1/reddit/post?limit=1000',{
        headers:  {
            'projectID': '7k1ct68pbbmr'
        }
      })
      let result=await response.json()
      console.log("All post data: ",result.data)
      let allPosts=result.data
      // Filter allPost data to get user data
      const userCreatedPosts = allPosts.filter((item) => item.author._id === userId);
      console.log("user posts", userCreatedPosts);
      setUserPosts(userCreatedPosts);
    }
    catch(error){
      console.log(error)
    }
  } 
  async function fetchUserDetails(){
    const token=(sessionStorage.getItem("userToken"))
    try{
      let response=await fetch(`https://academics.newtonschool.co/api/v1/reddit/user/${userId}`,{
        method:'GET',
        headers:{
        projectId:'7k1ct68pbbmr',
        Authorization: `Bearer ${token}`
      },
      body:null //For like body will be none
      })
      let result=await response.json()
      console.log("User Details: ",result.data)
      setUserDetails(result.data)

    }
    catch(error){
      console.log(error)
      setUserDetails("No data found")
    }
  }


  return (
    <div style={{backgroundColor:isDarkMode?"rgb(0,0,0)":"rgba(211,211,211,0.8)", minHeight:getHeight}}>

      <AllPagesLayout>
        {/* Left side  */}
        <>
          <UserPosts userPosts={userPosts} setUserPosts={setUserPosts} fetchPosts={fetchPosts}/>
        </>

        {/* Right Side */}
        <>
          <UserDetails userId={userId} userDetails={userDetails} setUserDetails={setUserDetails}/>
        </>
      </AllPagesLayout>
    </div>
  )
}
