import React from 'react'
import { Flex, Text } from '@chakra-ui/react'
import {TiStarburstOutline} from "react-icons/ti";
import {LiaFireAltSolid} from "react-icons/lia";
import {HiOutlineArrowUpOnSquare} from "react-icons/hi2";
import {MdRocket} from "react-icons/md";
import FilterTabItem from './FilterTabItem';
import useThemeStore from '../../stores/ThemeStore/useThemeStore';

const filterTabs = [
    {
        tabName: "New",
        icon: TiStarburstOutline
    },
    {
        tabName: "Hot",
        icon: LiaFireAltSolid
    },
    {
        tabName: "Top",
        icon: HiOutlineArrowUpOnSquare
    },
    {
        tabName: "Best",
        icon: MdRocket
    }
]
export default function FilterBox({ selectedFilterTab, setSelectedFilterTab }) {

  const {isDarkMode} = useThemeStore();
    
  return (
    <Flex bg={isDarkMode ? "#1a1a1b" : "white"}
            mb={4}
            padding={3}
            borderRadius="4px"
            border="1px solid"
            borderColor={isDarkMode ? "#343536" : "gray.300"}
        >
        <Flex width="100%" gap={{base: 2, md: 12}}>
                {filterTabs.map((item, index)=>(
               <FilterTabItem 
               key={index} 
               item={item} 
               isSelected={item.tabName === selectedFilterTab} 
               setSelectedFilterTab={setSelectedFilterTab}  />     
                ))}
            </Flex>
    </Flex>
  );
}
