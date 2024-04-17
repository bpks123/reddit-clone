import React,{useEffect} from 'react'
import JoinReddit from '../../components/PremiumPageComponents/JoinReddit'
import PremiumFooter from '../../components/PremiumPageComponents/PremiumFooter'
import PremiumLandingImage from '../../components/PremiumPageComponents/PremiumLandingImage'
import useMenuButtonTextStore from '../../stores/NavigatorStore/useMenuButtonTextStore'

export default function RedditPremium() {
  
  const {setMenuButtonText} = useMenuButtonTextStore();

  useEffect(()=>{
   setMenuButtonText('Premium');
   sessionStorage.setItem('menuButtonText', 'Premium');
  }, [])
  return (
    <div>
      <PremiumLandingImage/>
      <JoinReddit/>
      <PremiumFooter/>
    </div>
  )
}
