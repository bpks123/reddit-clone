import React from "react";
import { Flex, Icon, Image, Stack, Text } from "@chakra-ui/react";
import { FaReddit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useThemeStore from "../../../stores/ThemeStore/useThemeStore";
import userLogInStore from "../../../stores/AuthenticationStore/userLogInStore";
import useLogInModalStore from "../../../stores/ModalStore/LogInModalStore";

export default function SearchedPost({ post }) {
  const navigateTo = useNavigate();
  const { isDarkMode } = useThemeStore();
  const { isLoggedIn, setIsLoggedIn } = userLogInStore();
  const {setLogInModal}=useLogInModalStore()

  function handleCommunityClick(channelId, e) {
    navigateTo(`/community/${channelId}`);
    e.stopPropagation();
  }
  function redirectToProfile(userId,e) {
    e.stopPropagation();

    if(!isLoggedIn){
      setLogInModal(true);
      return;
    }
    navigateTo(`/profile/${userId}`);
  }

  return (
    <Flex
      width="100%"
      bg={isDarkMode ? "#1a1a1b" : "white"}
      border="1px solid"
      borderColor={isDarkMode ? "#343536" : "gray.300"}
      p="14px"
      _hover={{
        border: "1px solid",
        borderColor: "gray.500",
      }}
      borderRadius={"5px"}
      justify="space-between"
      cursor="pointer"
      onClick={() => navigateTo(`/comment/${post._id}`)}
    >
      <Stack spacing={2} justify="space-between">
        {/* CHANNEL NAME, POSTED BY AND POST TITLE */}
        <Stack>
          <Flex spacing={0.6} align="center" fontSize="9pt" flexWrap="wrap">
            {post.channel ? (
              post.channel.image ? (
                <Image
                  src={post.channel.image}
                  height={6}
                  width={6}
                  borderRadius="50%"
                  objectFit="cover"
                  mr={1}
                />
              ) : (
                <Icon
                  as={FaReddit}
                  fontSize={20}
                  mr={1}
                  color={isDarkMode ? "red.500" : "red"}
                />
              )
            ) : (
              <Icon
                as={FaReddit}
                fontSize={20}
                mr={1}
                color={isDarkMode ? "red.500" : "red"}
              />
            )}
            {post.channel && (
              <Text
                mr={1}
                cursor="pointer"
                _hover={{ color: "blue.500" }}
                color={isDarkMode && "#d7dadc"}
                fontWeight={700}
                onClick={(e) => handleCommunityClick(post.channel._id, e)}
              >
                r/{post.channel.name}
              </Text>
            )}
            {/* Auther Name */}
            <Text
              color="gray.500"
              fontWeight={700}
              _hover={{ color: "blue.500" }}
              cursor='pointer'
              onClick={(e) => redirectToProfile(post.author._id,e)}
            >
              Posted by u/{post.author.name}
            </Text>
          </Flex>

          {/* Post Title */}
          {post.title && (
            <Text
              fontSize="16px"
              color={isDarkMode && "#d7dadc"}
              fontWeight={600}
            >
              {post.title}
            </Text>
          )}
        </Stack>
        {/* Likes AND COMMENTS */}
        <Flex gap={2} bottom={0}>
          <Text fontSize="9pt" color="gray.500">
            {post.likeCount} Likes
          </Text>
          <Text fontSize="9pt" color="gray.500">
            {post.commentCount} comments
          </Text>
        </Flex>
      </Stack>

      {/* IMAGE */}

      {post.images.length > 0 && (
        <Stack p="8px 0px" alignSelf="flex-end" ml={2}>
          <Image
            src={post.images[0]}
            height={{ base: "90px", md: "98px" }}
            minWidth={{ base: "100px", md: "134px" }}
            maxWidth={{ base: "100px", md: "134px" }}
            objectFit="cover"
            borderRadius="4px"
          />
        </Stack>
      )}
    </Flex>
  );
}
