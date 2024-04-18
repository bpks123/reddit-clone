import React from 'react'
import { Flex } from '@chakra-ui/react'
import SearchedPost from './SearchedPost'

export default function PostTab({posts}) {

  return (
    <Flex direction="column" mt="30px" borderRadius="5px" gap={'5px'} overflow="hidden">
        
        {
            posts ?
            (posts.length>0 ?
                posts.map((item,index)=><SearchedPost key={index} post={item}/>)
                :
                <div>No post found</div>
            )
            :
            <div>Loading....</div>
        }

    </Flex>
  )
}
