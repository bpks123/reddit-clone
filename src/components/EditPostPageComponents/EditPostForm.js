import React, { useState } from "react";
import { Flex, Icon, Text } from "@chakra-ui/react";
import { CiEdit } from "react-icons/ci";
import EditTextInput from "./EditTextInput";
import { useNavigate } from "react-router-dom";
import useThemeStore from "../../stores/ThemeStore/useThemeStore";

export default function EditPostForm({ channelId, postDetails, postId }) {
  console.log(postDetails);

  const [textInputs, setTextInputs] = useState({
    title: postDetails.title,
    content: postDetails.content,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const navigateTo = useNavigate();
  const { isDarkMode } = useThemeStore();

  function handleInputChange(e) {
    if (errorMsg) {
      setErrorMsg("");
    }
    const { name, value } = e.target;

    setTextInputs((prev) => {
      return { ...prev, [name]: value };
    });
  }

  // TO edit the posts
  async function handleEditPost() {
    if (textInputs.title.length > 100) {
      setErrorMsg("Title characters can't be greater than 100");
      return;
    }

    setIsLoading(true); // post button loading true
    const postData = new FormData();

    postData.append("title", textInputs.title);
    postData.append("content", textInputs.content);

    editPost(postData);
  }

  async function editPost(postData) {
    const token=(sessionStorage.getItem("userToken"))
    try{
      let response=await fetch(`https://academics.newtonschool.co/api/v1/reddit/post/${postDetails._id}`,{
            method:'PATCH',
            headers:{
              projectId:'7k1ct68pbbmr',
              Authorization: `Bearer ${token}`,
          },
          body:postData
          })
          console.log(response)
          let result=await response.json()
          console.log("Post status: ",result)
          setIsLoading(false)
          navigateTo('/')
           
    }
    catch(error){
      console.log(error)
      setIsLoading(false); // after fail also button loading false

    }
    
  }
  return (
    <Flex
      direction="column"
      bg={isDarkMode ? "#1a1a1b" : "white"}
      borderRadius={4}
      mt={2}
    >
      <Flex width="100%">
        <Flex
          justify="center"
          align="center"
          flexGrow={1}
          p="14px 0px"
          fontWeight={700}
          color={isDarkMode ? "#d7dadc" : "brand.100"}
          borderBottom="2px solid"
          borderBottomColor={isDarkMode ? "#d7dadc" : "brand.100"}
        >
          <Flex align="center" height="22px" mr={2}>
            <Icon as={CiEdit} />
          </Flex>
          <Text fontSize="10pt">Edit</Text>
        </Flex>
      </Flex>

      <Flex p={4}>
        <EditTextInput
          errorMsg={errorMsg}
          textInputs={textInputs}
          handleInputChange={handleInputChange}
          handleEditPost={handleEditPost}
          isLoading={isLoading}
        />
      </Flex>
    </Flex>
  );
}
