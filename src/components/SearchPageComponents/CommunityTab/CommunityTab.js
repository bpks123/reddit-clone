import React from 'react'
import { Flex } from '@chakra-ui/react'
import CommunitySearch from './CommunitySearch'

export default function CommunityTab({communities}) {
  return (
    <Flex direction="column" mt="30px" borderRadius="4px" overflow="hidden">

      {communities ? communities.length > 0 ? 
          communities.map((community, index)=>(

            <CommunitySearch key={index} community={community}/>
          ))
      : <div>No community found</div> : <div>Loading...</div>}

  </Flex>
  )
}
