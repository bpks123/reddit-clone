import React, { useEffect,useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useMenuButtonTextStore from '../../stores/NavigatorStore/useMenuButtonTextStore';
import CommunityPageHeader from '../../components/CommunityPageComponent/CommunityPageHeader';

export default function CommunityPage() {

    const { channelId } = useParams();
    console.log("Channel Id is: ",channelId)

    const { setMenuButtonText } = useMenuButtonTextStore();
    const [communityData, setCommunityData] = useState([]);

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

  return (
    <div>
      <CommunityPageHeader communityData={communityData} channelId={channelId}/>

    </div>
  )
}
