import React, { useState } from 'react'
import { Flex, Icon, Image, Stack, Text, chakra } from '@chakra-ui/react'
import { IoArrowUpCircleOutline, IoArrowDownCircleOutline, IoArrowUpCircleSharp, IoArrowRedoOutline, IoBookmarkOutline } from 'react-icons/io5'
import { BsChat } from 'react-icons/bs';
import { TbArrowBigUp } from "react-icons/tb";
import { TbArrowBigUpFilled } from "react-icons/tb";
import { TbArrowBigDownFilled } from "react-icons/tb";
import { TbArrowBigDown } from "react-icons/tb";
import { FaReddit, FaRegEdit } from 'react-icons/fa';
import { MdDeleteOutline } from 'react-icons/md';
import userLogInStore from '../../stores/AuthenticationStore/userLogInStore'
import useLogInModalStore from '../../stores/ModalStore/LogInModalStore'
import useThemeStore from '../../stores/ThemeStore/useThemeStore'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './PostItem.css'
export default function PostItem({ post, increaseLike, decreaseLike, deletePost, editPost, handleComment }) {

  const { isLoggedIn, setIsLoggedIn } = userLogInStore();
  const {setLogInModal}=useLogInModalStore()
  const { isDarkMode } = useThemeStore();
  const loggedInUserDetails = JSON.parse(sessionStorage.getItem('loggedInUserDetails'));
  const navigateTo = useNavigate();
  const [isUpvote,setIsUpvoted]=useState(false);
  const [isDownvote,setIsDownvoted]=useState(false);


  function redirectToProfile(userId) {
    if(!isLoggedIn){
      setLogInModal(true);
      return;
    }
    navigateTo(`/profile/${userId}`);
  }
  const handleUpvote = () => {
    setIsUpvoted(true);
    setIsDownvoted(false)
    increaseLike(post._id);
  };

  const handleDownvote = () => {
    setIsDownvoted(true);
    setIsUpvoted(false)
    decreaseLike(post._id);
  };

  const onHandleClick=()=>{
    toast.info('Work in progress.',{
      position: "top-center",
      autoClose: 3000,
      theme: isDarkMode?"light":"colored",
    })
  }
  return (
    // Posting card Details
    <Flex
    border='1px solid'
    bg={isDarkMode ? "#1a1a1b" : "white"}
    borderColor={isDarkMode ? "#343536" : 'gray.300'}
    borderRadius={4}
    _hover={{ borderColor: "gray.500" }}
    >
      

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
                onClick={() => navigateTo(`/community/${post.channel._id}`)}
              >r/{post.channel.name}
              </Text>}

                {/* Author name */}
              <Text color="gray.500">
              <chakra.span cursor="pointer"
               _hover={{ textDecoration: "underline", color: "gray.600" }}
                onClick={() => redirectToProfile(post.author._id)}
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
            <Text fontSize="12pt" 
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

        {/* COMMENT SHARE like BUTTON */}
        <Flex ml={1} mb={0.5} color={isDarkMode ? "#818384" : "gray.500"} >

        {/* Upvote and Downvote*/}
        <Flex
        align="center"
        padding="8px 10px"
        borderRadius={4}
        _hover={{ bg: isDarkMode ? "#343536" : "gray.200" }}
        cursor="pointer"
        >
          
            <Icon as={TbArrowBigUp} mr={2}
            color={isUpvote &&'blue'}
            fontSize={'20px'} className='arrowUp'
            onClick={handleUpvote}
            
            />
            <Text fontSize="9pt" fontWeight={600} color={isDarkMode && "#d7dadc"}>
          {post.likeCount}
        </Text>
        <Icon as={TbArrowBigDown} ml={2} mt={0.5}
            fontSize={'20px'}
            color={isDownvote && 'red'}
            className='arrowDown'
            onClick={handleDownvote}
        
        />
        </Flex>
        
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
            onClick={onHandleClick}
          >
            <Icon as={IoArrowRedoOutline} mr={2} />
            <Text fontSize="9pt" display={{base: 'none', md: 'block'}}>Share</Text>
          </Flex>

           
          {/* Edit */}
          {isLoggedIn && post.author._id === loggedInUserDetails.user._id && (
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
          {/* Delete */}
          {isLoggedIn && (
            post.author._id===loggedInUserDetails.user._id || (post.channel && post.channel.owner === loggedInUserDetails._id)
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
