import React from 'react'
import {useNavigate} from 'react-router-dom'
import "../Sildebar/Sidebar.css";
import { IoHomeOutline } from "react-icons/io5";
import { BsArrowUpRightCircleFill } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { Flex, Icon } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa6";
import { TfiReddit } from "react-icons/tfi";
import { TbSpeakerphone } from "react-icons/tb";
import { FaRegQuestionCircle } from "react-icons/fa";
import { IoBookOutline } from "react-icons/io5";
import useThemeStore from "../../stores/ThemeStore/useThemeStore";
import userLogInStore from "../../stores/AuthenticationStore/userLogInStore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useLogInModalStore from '../../stores/ModalStore/LogInModalStore';

export default function Sildebar() {

  const { isLoggedIn } = userLogInStore();
  const {isDarkMode} = useThemeStore();
  const {setLogInModal}=useLogInModalStore();

  const navigateTo = useNavigate();

  const [open, setOpen] = React.useState(true);
  const [communitiesOpen,setCommunitesOpen]=React.useState(true)
  const [resourcesOpen,setResourcesOpen]=React.useState(true)
  const [height,setHeight]=React.useState(window.innerHeight-50)
  
  // console.log(window.innerWidth)
  const onHandleClick = () => {
    if (!isLoggedIn) {
      setLogInModal(true);
      return;
    }
    toast.info("Work in Progress.", {
      position: "top-center",
      autoClose: 2000,
      theme: isDarkMode ? "light" : "colored",
    });
  };
  const handleClick = () => {
    setOpen(!open);
    setCommunitesOpen(true)
    setResourcesOpen(true)
  };
  const communityHandleClick=()=>{
    setCommunitesOpen(!communitiesOpen)
    setOpen(true);
    setResourcesOpen(true)
  }
  const resourcesHandlClick=()=>{
    setResourcesOpen(!resourcesOpen)
    setOpen(true);
    setCommunitesOpen(true)

  }

  return (
    <div className="sidebar" style={{minHeight:height,backgroundColor:isDarkMode?'black':''}}  >
      <div className="sidebar-content">
        {/* Home and popular */}
          <div className="sidebar-first">
            <div className="sidebar-home" onClick={()=>navigateTo('/')}>
              <Icon as={IoHomeOutline} fontSize={'20px'} color={isDarkMode?'white':''}/>
              <div style={{color:isDarkMode?'white':'' }}>Home</div>
            </div>
            <div className="sidebar-home">
              <Icon as={BsArrowUpRightCircleFill} fontSize={'20px'} color={isDarkMode?'white':''}/>
              <div style={{color:isDarkMode?'white':'' }}>Popular</div>
            </div>
          </div>
        {/*Recent  */}
        <div className='sidebar-second'>
          <div className="sidebar-recent" onClick={handleClick}>
            <div style={{color:isDarkMode?'white':'' }}>RECENT</div>
            <Icon as={open?IoIosArrowDown:IoIosArrowUp} color={isDarkMode?'white':''}/>
          </div>
          {!open && <div className="sidebar-items" style={{color:isDarkMode?'white':'' }}>No recent Items</div>}
        </div>
        {/* Communities */}
        <div className='sidebar-second'>
          <div className="sidebar-recent" onClick={communityHandleClick}>
            <div style={{color:isDarkMode?'white':'' }}>COMMUNITIES</div>
            <Icon as={communitiesOpen?IoIosArrowDown:IoIosArrowUp} color={isDarkMode?'white':''}/>
          </div>
          {!communitiesOpen && <div className="sidebar-items" onClick={onHandleClick}>
            <Icon as={FaPlus} color={isDarkMode?'white':''}/>
            <div style={{color:isDarkMode?'white':'' }}>Create communitey</div>
            </div>}
        </div>
        {/* Resources */}
        <div className='sidebar-second'>
          <div className="sidebar-recent" onClick={resourcesHandlClick}>
            <div style={{color:isDarkMode?'white':'' }}>RESOURCES</div>
            <Icon as={resourcesOpen?IoIosArrowDown:IoIosArrowUp} color={isDarkMode?'white':''}/>
          </div>
          {!resourcesOpen && <div className="sidebar-items" onClick={onHandleClick}>
            <Icon as={TfiReddit} fontSize={'24px'} color={isDarkMode?'white':''}/>
            <div style={{color:isDarkMode?'white':'' }}>About Reddit</div>
            </div>}
            {!resourcesOpen && <div className="sidebar-items" onClick={onHandleClick}>
            <Icon as={TbSpeakerphone} fontSize={'24px'} color={isDarkMode?'white':''}/>
            <div style={{color:isDarkMode?'white':'' }}>Advertise</div>
            </div>}
            {!resourcesOpen && <div className="sidebar-items" onClick={onHandleClick}>
            <Icon as={FaRegQuestionCircle} fontSize={'24px'} color={isDarkMode?'white':''}/>
            <div style={{color:isDarkMode?'white':'' }}>Resources</div>
            </div>}
            {!resourcesOpen && <div className="sidebar-items" onClick={onHandleClick}>
            <Icon as={IoBookOutline} fontSize={'24px'} color={isDarkMode?'white':''}/>
            <div style={{color:isDarkMode?'white':'' }}>Blog</div>
            </div>}
        </div>
      </div>
    </div>
  );
}
