import React from 'react'
import { Button, Flex, Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons';

export default function SearchInput() {
  return (
    <Flex flexGrow={1} maxWidth={'600px'} align='center' mr={2}>
      <InputGroup>
        <InputLeftElement pointerEvents='none'>
          <SearchIcon color={'gray.400'} mb={1} />
        </InputLeftElement>
        <Input type='text'
                    placeholder='Search Reddit'
                    fontSize='10pt'
                    border="none"
                    borderRadius="20px"
                    // color={isDarkMode && "#D7DADC"}
                    _placeholder={{ color: "gray.500" }}
                    
                    _hover={{
                        bg:'white',
                        border: '1px solid',
                        borderColor: "blue.500",
                    }}
                    _focus={{
                        outline: 'none',
                        border: "1px solid",
                        borderColor:"blue.500",
                        bg:'white',
                    }}
                    outline="none"
                    height='34px'
                    bg={'gray.100'}
                    // value={searchText}
                    // onChange={(e) => setSearchText(e.target.value)}
                />
      </InputGroup>
      <Button
                height="36px"
                borderRadius="20px"
                ml={1}
            >
                Search
            </Button>
    </Flex>

  )
}
