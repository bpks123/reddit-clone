import React,{useState,useEffect} from 'react'
import { Flex } from '@chakra-ui/react'
import  AllPagesLayout  from '../../components/Layout/AllPagesLayout'
import useMenuButtonTextStore from '../../stores/NavigatorStore/useMenuButtonTextStore';
import { useLocation } from 'react-router-dom'
import useThemeStore from '../../stores/ThemeStore/useThemeStore';
import SearchTabItem from '../../components/SearchPageComponents/SearchTabItem';
import PostTab from '../../components/SearchPageComponents/PostTab/PostTab';
import CommunityTab from '../../components/SearchPageComponents/CommunityTab/CommunityTab';
import SearchRightContent from '../../components/SearchPageComponents/SearchRightContent';

const searchTabs = [
  {
     title: "Posts"
  },
  {
      title: "Communities"  
  } 
]

export default function SearchPages() {

  // For getting the search parameter
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('q').toLocaleLowerCase();
  console.log("search query: ", query); 
  
  const {setMenuButtonText} = useMenuButtonTextStore();
  const [posts, setPosts] = useState(null);
  const [communities, setCommunities] = useState(null);
  const [getHeight,setHeight]=useState(window.innerHeight-50)
  const {isDarkMode} = useThemeStore();
  const [selectedTab, setSelectedTab] = useState(searchTabs[0].title);


  useEffect(()=>{
    setMenuButtonText('Search Result');
    sessionStorage.setItem('menuButtonText', 'Search Result');
    searchPosts()
    searchCommunity()
  },[query])

  async function searchPosts(){
    try{
      let response=await fetch('https://academics.newtonschool.co/api/v1/reddit/post?limit=1000',{
            headers:  {
                'projectID': '7k1ct68pbbmr'
            }
        })
        let result=await response.json()
        const allPosts=result.data
        console.log('All posts: ',allPosts)
        const searchPostData=allPosts.filter((item)=>{
          
          let author = item.author.name.toLowerCase();
          
          let title;
          if(item.title){
            title = item.title.toLowerCase();
          }
          if(author.includes(query) ){
            return item;
          }
        
          if(title){
            if(title.includes(query)){
                return item;
          }
        }
        })
        console.log('Search Data: ',searchPostData)
        setPosts(searchPostData)
    }
    catch(error){
      console.log(error)
    }
  }

  async function searchCommunity(){
    try {
      let response = await fetch(
        "https://academics.newtonschool.co/api/v1/reddit/channel?limit=1000",
        {
          headers: {
            projectID: "7k1ct68pbbmr",
          },
        }
      );
      let result = await response.json();
      const allCommunity = result.data;
      console.log("All Community Posts: ", allCommunity);

      const filteredCommunity = allCommunity.filter((item)=>{
        const channelName = item.name.toLowerCase();

        if(channelName.includes(query)){
            return item;
        }
    })

    console.log("filter community", filteredCommunity);
    setCommunities(filteredCommunity);

    } catch (error) {
      console.log(error);
    }
  }

  
  return (
    <div style={{backgroundColor:isDarkMode?"rgb(0,0,0)":"rgba(211,211,211,0.8)", minHeight:getHeight}}>
    
      <AllPagesLayout>
{/* Left side */}
          <>
            <Flex direction="column" mt={2} >
                
                <Flex width="100%">
                       {searchTabs.map((item, index)=>(
                        <SearchTabItem key={index} item={item} isSelected={item.title === selectedTab} setSelectedTab={setSelectedTab} />
                       ))} 
                </Flex>
                {selectedTab === "Posts" && <PostTab posts={posts}/>}

                {selectedTab === "Communities" && <CommunityTab communities={communities}/>}

            </Flex>
          </>

{/* RIght side */}
          <>
            <SearchRightContent query={query}/>
          </>
      </AllPagesLayout>
    </div>
  )
}
