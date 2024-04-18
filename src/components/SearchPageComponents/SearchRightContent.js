import React from "react";
import { Box, Flex, Icon, Stack, Text } from "@chakra-ui/react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { RiCakeLine } from "react-icons/ri";
import {
  BsFilePostFill,
  BsFilePost,
  BsFillFileEarmarkPostFill,
} from "react-icons/bs";
import useThemeStore from "../../stores/ThemeStore/useThemeStore";
import userLogInStore from "../../stores/AuthenticationStore/userLogInStore";

export default function SearchRightContent({query}) {
  const { isDarkMode } = useThemeStore();
  const { isLoggedIn } = userLogInStore();
  return (
    <Box position="fixed" top="100px" width={"20%"}>
      <Flex
        justify="space-between"
        align="center"
        bg="brand.100"
        color={isDarkMode ? "#d7dadc" : "white"}
        p={3}
        borderRadius="4px 4px 0px 0px"
        backgroundColor={"orange"}
      >
        <Text fontSize="10pt" fontWeight={700}>
          About Search
        </Text>
        <Icon as={HiOutlineDotsHorizontal} />
      </Flex>
      <Flex align={'center'} backgroundColor={"white"} width="100%" p={3} fontSize="15pt" fontWeight={500} color={isDarkMode && "#d7dadc"}>
            Search Result for
      </Flex>
      <Flex align={'center'} backgroundColor={"white"} overflow={'hidden'} width="100%" p={2} fontSize="15pt" fontWeight={500} color={isDarkMode && "#d7dadc"}>
            {`" ${query} "`}
        </Flex>
    </Box>
  );
}
