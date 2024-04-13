import React,{useState} from 'react'
import { Button, Flex, Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons';
import useThemeStore from '../../stores/ThemeStore/useThemeStore';
import userLogInStore from '../../stores/AuthenticationStore/userLogInStore';


export default function SearchInput() {

  const {isDarkMode} = useThemeStore();
  const { isLoggedIn } = userLogInStore();
  const [searchText, setSearchText] = useState('');


  return (
    <Flex flexGrow={1} maxWidth={isLoggedIn ? 'auto' : '600px'} align='center' mr={2}>
      <InputGroup>
        <InputLeftElement pointerEvents='none'>
          <SearchIcon color={isDarkMode ? "#D7DADC" : 'gray.400'} mb={1} />
        </InputLeftElement>
        <Input type='text'
                    placeholder='Search Reddit'
                    fontSize='10pt'
                    border="none"
                    borderRadius="20px"
                    color={isDarkMode && "#D7DADC"}
                    _placeholder={{ color: "gray.500" }}
                    
                    _hover={{
                        bg:'white',
                        border: '1px solid',
                        borderColor: isDarkMode ? "white" : "blue.500",
                    }}
                    _focus={{
                        outline: 'none',
                        border: "1px solid",
                        borderColor:isDarkMode ? "#D7DADC" : "blue.500",
                        bg:isDarkMode ? "#343536" :'white',
                    }}
                    outline="none"
                    height='34px'
                    bg={isDarkMode ? "#272729" : 'gray.100'}
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />
      </InputGroup>
      <Button
                height="36px"
                borderRadius="20px"
                ml={1}
                isDisabled={!searchText.length}

            >
                Search
            </Button>
    </Flex>

  )
}
