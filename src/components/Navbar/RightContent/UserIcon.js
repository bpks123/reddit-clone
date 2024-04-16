import React from 'react'
import { Flex, Icon } from '@chakra-ui/react'
import { BsArrowUpRightCircle, BsChatDots } from "react-icons/bs";
import { GrAdd } from "react-icons/gr";
import {
  IoFilterCircleOutline,
  IoNotificationsOutline,
  IoVideocamOutline,
} from "react-icons/io5";
import useThemeStore from '../../../stores/ThemeStore/useThemeStore';

export default function UserIcon() {

    const {isDarkMode} = useThemeStore();

  return (
    <Flex display={{base: 'none', md: 'flex'}}>
      <Flex
                display={{ base: 'none', md: 'flex' }}
                align="center"
                borderRight='1px solid'
                borderColor='gray.200'
            >
              <Flex
                    mr={1.5}
                    ml={1.5}
                    padding={1}
                    cursor="pointer"
                    borderRadius={4}
                    _hover={{ bg: isDarkMode ? "#343536" : 'gray.200' }}
                    color={isDarkMode && "#d7dadc"}
                >
                    <Icon as={BsArrowUpRightCircle} fontSize={20} />
                </Flex>
                <Flex
                    mr={1.5}
                    ml={1.5}
                    padding={1}
                    cursor="pointer"
                    borderRadius={4}
                    _hover={{ bg: isDarkMode ? "#343536" : 'gray.200' }}
                    color={isDarkMode && "#d7dadc"}
                >
                    <Icon as={IoFilterCircleOutline} fontSize={22} />
                </Flex>
                <Flex
                    mr={1.5}
                    ml={1.5}
                    padding={1}
                    cursor="pointer"
                    borderRadius={4}
                    _hover={{ bg: isDarkMode ? "#343536" : 'gray.200' }}
                    color={isDarkMode && "#d7dadc"}
                >
                    <Icon as={IoVideocamOutline} fontSize={22} />
                </Flex>
      </Flex>
      <>
      <Flex
                    mr={1.5}
                    ml={1.5}
                    padding={1}
                    cursor="pointer"
                    borderRadius={4}
                    _hover={{ bg: isDarkMode ? "#343536" : 'gray.200' }}
                    color={isDarkMode && "#d7dadc"}
                >
                    <Icon as={BsChatDots} fontSize={20} />
                </Flex>
            <Flex
                    mr={1.5}
                    ml={1.5}
                    padding={1}
                    cursor="pointer"
                    borderRadius={4}
                    _hover={{ bg: isDarkMode ? "#343536" : 'gray.200' }}
                    color={isDarkMode && "#d7dadc"}
                >
                    <Icon as={IoNotificationsOutline} fontSize={20} />
                </Flex>
            <Flex
                   display={{base: 'none', md: 'flex'}}
                    mr={1.5}
                    ml={1.5}
                    padding={1}
                    cursor="pointer"
                    borderRadius={4}
                    _hover={{ bg: isDarkMode ? "#343536" : 'gray.200' }}
                    color={isDarkMode && "#d7dadc"}
                >
                    <Icon as={GrAdd} fontSize={20} />
                </Flex>
      </>
    </Flex>
  )
}
