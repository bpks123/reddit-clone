import React from 'react'
import { Box, Flex, Stack, Text } from '@chakra-ui/react'
import CommentItems from './CommentItems'
import CommentInput from './CommentInput'
export default function Comments({postId, commentText, setCommentText, btnLoading,  handleCommentClick, allComments, deleteComment}) {
  return (
    <Box bg={"white"} 
         borderRadius="4px" 
         p={2}
         border="1px solid"
         borderColor={'gray.300'} 
         _hover={{ borderColor: "gray.500" }} 
         mt={1.5}
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
              <Text textAlign="center" >
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
