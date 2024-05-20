import React from 'react'
import { Flex } from '@chakra-ui/react'
import './AllpageLayout.css'
export default function AllPagesLayout({children}) {
  return (
    // border="1px solid black"
    <Flex className='full-layout'>           

        <Flex className='main-layout'
        //  width="95%"
         justify="center"
        //  maxWidth="860px"
         
         padding={2}
        >

            {/* LHS */}
            <Flex
             direction='column'
             width={{base: "100%", md: "65%"}}
             mr={{base: 0, md: 6}}
            //  border="1px solid blue"
            >
                {children && children[0]}
            </Flex>

            {/* RHS */}
            <Flex
              direction="column"
              display={{base: "none", md: "flex"}}
              flexGrow={1}
            //   border="1px solid green"
            >
                {children && children[1]}
            </Flex>


        </Flex>

    </Flex>
)
}
// SO WE WILL HAVE TWO CHILDREN IN ALLPAGESLAYOUT
// LHS DIV AND RHS DIV