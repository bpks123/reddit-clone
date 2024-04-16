import React, { useEffect, useState } from 'react'
import { Flex, Image, Text } from '@chakra-ui/react'
import useThemeStore from '../../stores/ThemeStore/useThemeStore'
import Loading from './loading.gif'
import {useNavigate} from 'react-router-dom'
export default function CommunityRecommendation() {

    const {isDarkMode} = useThemeStore();
    const [getTopcommunity, setTopCommunity] = useState([]);
    const navigateTo=useNavigate()

useEffect(()=>{
    getTop5Community()
},[])
    async function getTop5Community(){
        try{
            let response=await fetch('https://academics.newtonschool.co/api/v1/reddit/channel?limit=1000',{
                headers:  {
                    'projectID': '7k1ct68pbbmr'
                }
            })
            let result=await response.json()
            // Doing slice for getting top 5 data
            setTopCommunity(result.data.slice(result.data.length-5,result.data.length))
            console.log('communities: ',result.data.slice(result.data.length-5,result.data.length))

        }
        catch(error){
            console.log(error)
        }
    }
    const onClickHandle=(id)=>{
        navigateTo(`/community/${id}`)
    }

  return (
    <Flex
      direction="column"
      bg={isDarkMode ? "#1a1a1b" : "white"}
      borderRadius={4}
      border="1px solid"
      borderColor={isDarkMode ? "#343536" : "gray.300"}
    >
      <Flex
        align="flex-end"
        color="white"
        p="6px 10px"
        height="70px"
        borderRadius="4px 4px 0px 0px"
        fontWeight={700}
        bgImage="url(/images/topCommunites.jpg)"
        backgroundSize="cover"
        bgGradient="linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75)), url('images/topCommunites.jpg')"
      >
        Top Communities
      </Flex>
      <Flex direction="column">
        {
            getTopcommunity.length>0?
            (
                getTopcommunity.map((community,index)=>{
                    return (
                      <Flex
                        align="center"
                        fontSize="10pt"
                        borderTop="1px solid"
                        borderColor={isDarkMode ? "#343536" : "gray.200"}
                        p="10px 12px"
                        _hover={{ color: "blue.500" }}
                        color={isDarkMode && "#d7dadc"}
                        cursor={"pointer"}
                        onClick={() => onClickHandle(community._id)}
                        key={index}
                      >
                        <Flex width="100%" align="center">
                          <Flex width="15%">
                            <Text>{index + 1}</Text>
                          </Flex>
                          <Image
                            src={community.image}
                            borderRadius="full"
                            boxSize="28px"
                            mr={2}
                            objectFit="cover"
                          />
                          <span
                            style={{
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            r/{community.name}
                          </span>
                        </Flex>
                      </Flex>
                    );
                })
            )
            :<Image src={Loading}
                boxSize="60px"
                marginLeft="40%"
                padding="4%"
                />
        }
        
      </Flex>
    </Flex>
  );
}
