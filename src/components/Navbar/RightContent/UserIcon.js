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
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function UserIcon() {

    const {isDarkMode} = useThemeStore();

    const onHandleClick=()=>{
        toast.info('This button will enable soon...',{
          position: "top-center",
          autoClose: 3000,
          theme: isDarkMode?"light":"colored",
        })
      }

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
                    onClick={onHandleClick}
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
                    onClick={onHandleClick}
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
                    onClick={onHandleClick}
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
                    onClick={onHandleClick}
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
                    onClick={onHandleClick}
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
                    onClick={onHandleClick}
                >
                    <Icon as={GrAdd} fontSize={20} />
                </Flex>
      </>
    </Flex>
  )
}
