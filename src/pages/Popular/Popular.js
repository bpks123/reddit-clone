import React, { useEffect, useState } from "react";
import AllPagesLayout from "../../components/Layout/AllPagesLayout";
import userLogInStore from "../../stores/AuthenticationStore/userLogInStore";
import Loading from "../../components/HomePageComponents/loading.gif";
import useThemeStore from "../../stores/ThemeStore/useThemeStore";
import CommunityRecommendation from "../../components/HomePageComponents/CommunityRecommendation";

export default function Popular() {

  const { isLoggedIn } = userLogInStore();
  const [postData, setPostData] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const { isDarkMode } = useThemeStore();
  const [getHeight, setHeight] = useState(window.innerHeight - 50);
  return (
    <div style={{backgroundColor:isDarkMode?"rgb(0,0,0)":"rgba(211,211,211,0.8)", minHeight:getHeight}}>
        <AllPagesLayout>

            

        </AllPagesLayout>
    </div>
  );
}
