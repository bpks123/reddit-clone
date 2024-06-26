import React from 'react'
import { Button, Flex, Input, Stack, Textarea, Text } from '@chakra-ui/react'
import useThemeStore from '../../stores/ThemeStore/useThemeStore'

export default function EditTextInput({errorMsg, textInputs, handleInputChange, handleEditPost, isLoading}) {
  
  const {isDarkMode} = useThemeStore();
  
  return (
    <Stack spacing={3} width="100%">

    {/* TITLE INPUT */}
     <Text color={isDarkMode ? "#d7dadc" : "gray.500"} ml={2}>Edit Title</Text>
       <Input
        name='title'
        value={textInputs.title}
        onChange={handleInputChange}
        fontSize="10pt"
        borderRadius={4}
        border="none"
        outline="1px solid"
        outlineColor={isDarkMode ? "#343536" : "gray.300"}
        color={isDarkMode && "#d7dadc"}
        placeholder='Title'
        _placeholder={{color: "gray.500"}}
        _focus={{
          outline: "none",
          bg: isDarkMode ? "#272729" : "white",
          border: "1px solid",
          borderColor: "black"
        }}
        />

        {errorMsg && <Text fontSize="9pt" color="red" ml={2}>{errorMsg}</Text>}
       {/* CONTENT INPUT */}
       <Text color={isDarkMode ? "#d7dadc" : "gray.500"} ml={2}>Edit Content</Text>
       <Textarea
        name='content'
        value={textInputs.content}
        onChange={handleInputChange}
        fontSize="10pt"
        borderRadius={4}
        border="none"
        outline="1px solid"
        outlineColor={isDarkMode ? "#343536" : "gray.300"}
        color={isDarkMode && "#d7dadc"}
        placeholder='Text (Optional)'
        _placeholder={{color: "gray.500"}}
        _focus={{
            outline: "none",
            bg: isDarkMode ? "#272729" : "white",
            border: "1px solid",
            borderColor: "black"
        }}
       />
 
     {/* POST BUTTON */}
       <Flex justify="flex-end"> 
        <Button
          height="34px"
          padding="0px 30px"
          isDisabled={!textInputs.title}
          isLoading={isLoading}
          onClick={handleEditPost}
          bg={'#ff4500'}
        >Post</Button>
       </Flex>
   </Stack>
  )
}
