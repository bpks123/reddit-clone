import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useMenuButtonTextStore from '../../stores/NavigatorStore/useMenuButtonTextStore';
export default function CommunityPage() {

    const { channelId } = useParams();
    console.log("Channel Id is: ",channelId)

    const { setMenuButtonText } = useMenuButtonTextStore();
    useEffect(()=>{
        sessionStorage.setItem('menuButtonText', `r/${channelId}`);
        const updatedText = sessionStorage.getItem('menuButtonText');
        setMenuButtonText(updatedText);
    },[])

  return (
    <div>
      Community page
    </div>
  )
}
