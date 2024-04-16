import React, { useEffect, useState } from 'react'
import { Alert, AlertIcon, Box, Button, Flex, Icon, Image, Text, useStatStyles } from '@chakra-ui/react'
import { FaReddit } from 'react-icons/fa'
import useThemeStore from '../../stores/ThemeStore/useThemeStore'
import userLogInStore from '../../stores/AuthenticationStore/userLogInStore'
import useSignUpModalStore from '../../stores/ModalStore/SignUpModalStore'

export default function CommunityPageHeader({ communityData, channelId}) {

  const { isLoggedIn } = userLogInStore();
  const { isDarkMode } = useThemeStore();
  const { setSignUpModal } = useSignUpModalStore();
  

  return (
      <Flex direction="column" width="100%">
        {/* 1st image */}
        <Image
          src="/images/redditChannelHOMEWallpaper.png"
          height="180px"
          objectFit="cover"
          borderTop={isDarkMode ? " " : "2px solid"}
          borderTopColor="gray.200"
        />
        {/* 2nd Profile details */}
        <Flex
          justify="center"
          bg={isDarkMode ? "#1a1a1b" : "white"}
          flexFlow={1}
          height="70px"
        >
          <Flex width="95%" maxWidth="860px">
            {communityData.image ? (
              <Image
                src={communityData.image}
                height={20}
                width={20}
                position="relative"
                top={-4}
                border={isDarkMode ? "4px solid #1a1a1b" : "4px solid white"}
                borderRadius="50%"
              />
            ) : (
              <Icon
                as={FaReddit}
                fontSize={64}
                position="relative"
                top={-4}
                bg="white"
                color="brand.100"
                border="4px solid"
                borderColor={isDarkMode ? "#1a1a1b" : "white"}
                borderRadius="50%"
              />
            )}
            <Flex padding="10px 15px">
              <Flex direction="column" mr={6}>
                <Text
                  fontWeight={800}
                  fontSize="16pt"
                  color={isDarkMode && "#d7dadc"}
                >
                  {communityData.name}
                </Text>

                <Text fontWeight={600} fontSize="10pt" color="gray.400">
                  r/{communityData.name}
                </Text>
              </Flex>

              <Button
                variant={
                  isLoggedIn ? "outline" : "solid"
                }
                height="30px"
                pr={6}
                pl={6}
                borderRadius={'20px'}
                bg={'orange'}
              >
                {isLoggedIn ? "Join":"Login To Join"}
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
  );
}
