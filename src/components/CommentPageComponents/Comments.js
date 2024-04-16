import React from 'react'
import { Box, Flex, Stack, Text } from '@chakra-ui/react'
import CommentItems from './CommentItems'
import CommentInput from './CommentInput'
import useThemeStore from '../../stores/ThemeStore/useThemeStore'

export default function Comments({postId, commentText, setCommentText, btnLoading,  handleCommentClick, allComments, deleteComment}) {

  const {isDarkMode} = useThemeStore();

  return (
    <Box 
      bg={isDarkMode ? "#1a1a1b" : "white"}
      borderRadius="0px 0px 4px 4px"
      p={2}
      border="1px solid"
      borderColor={isDarkMode ? "#343536" : "gray.300"}
      _hover={{ borderColor: "gray.500" }}
      mt={1}
    >
        <Flex
        direction="column"
        pl={10}
        pr={4}
        mb={6}
        fontSize="10pt"
        width="100%"
       
      >
        <CommentInput
        commentText={commentText}
        setCommentText={setCommentText}
        handleCommentClick={handleCommentClick}
        btnLoading={btnLoading}
        />

      </Flex>
      <Stack spacing={6}>
        {allComments ? (
            allComments.length>0 ? (
                allComments.map((comment)=>(
                    <CommentItems 
                    key={comment._id}
                    comment={comment}
                    deleteComment={deleteComment}
                />
                ))
            ):(
              <Text textAlign="center" color={isDarkMode && "#d7dadc"}>
              No comments on this post
            </Text>
            )
        ):(
          <div>Loading...</div>
        )

    }
      </Stack>
    </Box>
  )
}
