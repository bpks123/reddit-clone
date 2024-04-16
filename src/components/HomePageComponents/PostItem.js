import React, { useState } from 'react'
import { Flex, Icon, Image, Stack, Text, chakra } from '@chakra-ui/react'
import { IoArrowUpCircleOutline, IoArrowDownCircleOutline, IoArrowUpCircleSharp, IoArrowRedoOutline, IoBookmarkOutline } from 'react-icons/io5'
import { BsChat } from 'react-icons/bs';
import { FaReddit, FaRegEdit } from 'react-icons/fa';
import { MdDeleteOutline } from 'react-icons/md';
import userLogInStore from '../../stores/AuthenticationStore/userLogInStore'
import useLogInModalStore from '../../stores/ModalStore/LogInModalStore'
import useThemeStore from '../../stores/ThemeStore/useThemeStore'
import { useNavigate } from 'react-router-dom';


export default function PostItem({ post, increaseLike, decreaseLike, deletePost, editPost, handleComment }) {

  const { isLoggedIn, setIsLoggedIn } = userLogInStore();
  const {setLogInModal}=useLogInModalStore()
  const { isDarkMode } = useThemeStore();
  const loggedInUserDetails = JSON.parse(sessionStorage.getItem('loggedInUserDetails'));
  const token = sessionStorage.getItem('userToken');
  const navigateTo = useNavigate();


  return (
    // Posting card Details
    <Flex
    border='1px solid'
    bg={isDarkMode ? "#1a1a1b" : "white"}
    borderColor={isDarkMode ? "#343536" : 'gray.300'}
    borderRadius={4}
    _hover={{ borderColor: "gray.500" }}
    >
      {/* VOTING BUTTON COLUMN Like and dislike*/}
      <Flex
        direction="column"
        align="center"
        bg={isDarkMode ? "#101113" : "gray.100"}
        p={2}
        width="40px"
        borderRadius={4}
      >
        <Icon
          as={IoArrowUpCircleOutline}
          color={"gray.400"}
          fontSize={24}
          cursor="pointer"
          _hover={{ color: "brand.100" }}
            onClick={() => increaseLike(post._id)}
        />
        {/* Total like count text */}
        <Text fontSize="9pt" fontWeight={600} color={isDarkMode && "#d7dadc"}>
          {post.likeCount}
        </Text>

        <Icon
          as={IoArrowDownCircleOutline}
          color="gray.400"
          cursor="pointer"
          _hover={{ color: "brand.100" }}
          fontSize={24}
            onClick={() => decreaseLike(post._id)}
        />
      </Flex>

      {/* POSTS COLUMN */}
      <Flex direction="column" width="100%">
        <Stack spacing={1} p="10px">
          <Stack
            direction="row"
            spacing={0.6}
            align="center"
            fontSize="9pt"
            flexWrap="wrap"
          >
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
                  borderRadius="20px"
                  color="brand.100"
                  bg={isDarkMode && "white"}
                />
              )
            ) : (
              <Icon
                as={FaReddit}
                fontSize={20}
                mr={1}
                color="red"
                borderRadius="20px"
                bg={isDarkMode && "white"}
              />
            )}

            {/* Channel name */}
            {post.channel &&
              <Text
                mr={1}
                cursor="pointer"
                color={isDarkMode && "#d7dadc"}
                _hover={{ color: "blue.500" }}
                fontWeight={700}
                // onClick={() => navigateTo(`/community/${post.channel._id}`)}
              >r/{post.channel.name}
              </Text>}

                {/* Author name */}
              <Text color="gray.500">
              Posted by <chakra.span cursor="pointer"
               _hover={{ textDecoration: "underline", color: "gray.600" }}
                // onClick={() => redirectToProfile(post.author._id)}
              >
                u/{post.author.name}
              </chakra.span>
            </Text>

          </Stack>

          {/* TITLE AND CONTENT */}
          { post.title && 
            <Text fontSize="14pt" fontWeight={600} 
            color={isDarkMode && "#d7dadc"} 
            >{post.title} 
            </Text> }
          {post.content && 
            <Text fontSize="10pt" 
            color={isDarkMode && "#d7dadc"}
            >{post.content}
            </Text>}

          {/* POSTING IMAGE */}
          <Flex justify="center" align="center" p={2}>
            {post.images.length > 0 && <Image height="300px" maxWidth='100%' objectFit="cover"
              src={post.images[0]}
              alt='Post-Image'
            />}
          </Flex>
        </Stack>

        {/* COMMENT SHARE SAVE BUTTON */}
        <Flex ml={1} mb={0.5} color={isDarkMode ? "#818384" : "gray.500"} >

        {/* Comment */}
          <Flex
            align="center"
            padding="8px 10px"
            borderRadius={4}
            _hover={{ bg: isDarkMode ? "#343536" : "gray.200" }}
            cursor="pointer"
            onClick={() => handleComment(post)}
          >
            <Icon as={BsChat} mr={2} />
            <Text fontSize="9pt">{post.commentCount}</Text>
          </Flex>

        {/* Share */}
          <Flex
            align="center"
            padding="8px 10px"
            borderRadius={4}
            _hover={{ bg: isDarkMode ? "#343536" : "gray.200" }}
            cursor="pointer"
          >
            <Icon as={IoArrowRedoOutline} mr={2} />
            <Text fontSize="9pt" display={{base: 'none', md: 'block'}}>Share</Text>
          </Flex>

            {/* Save */}
          <Flex
            align="center"
            padding="8px 10px"
            borderRadius={4}
            _hover={{ bg: isDarkMode ? "#343536" : "gray.200" }}
            cursor="pointer"
          >
            <Icon as={IoBookmarkOutline} mr={2} />
            <Text fontSize="9pt" display={{base: 'none', md: 'block'}}>Save</Text>
          </Flex>

          {isLoggedIn && post.author._id === loggedInUserDetails._id && (
            <Flex
              align="center"
              padding="8px 10px"
              borderRadius={4}
              _hover={{ bg: isDarkMode ? "#343536" : "gray.200" }}
              cursor="pointer"
              onClick={() => editPost(post)}
            >
              <Icon as={FaRegEdit} mr={2} />
              <Text fontSize="9pt" display={{base: 'none', md: 'block'}}>Edit</Text>
            </Flex>
          )}
          {/*Edit and Delete post for own channel is pending to done.. */}
          {isLoggedIn && (
            post.author._id===loggedInUserDetails._id || (post.channel && post.channel.owner === loggedInUserDetails._id)
          )
          && (
            <Flex
              align="center"
              padding="8px 10px"
              borderRadius={4}
              _hover={{ bg: isDarkMode ? "#343536" : "gray.200" }}
              cursor="pointer"
              onClick={() => deletePost(post._id)}
            >
              <Icon as={MdDeleteOutline} mr={2} />
              <Text fontSize="9pt" display={{base: 'none', md: 'block'}}>Delete</Text>
            </Flex>

          )}
        </Flex>
      </Flex>
    </Flex>
  );
}
