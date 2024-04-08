import React,{useState} from 'react'
import { Flex } from '@chakra-ui/react'
import { BiPoll } from "react-icons/bi"
import { BsLink45Deg, BsMic } from "react-icons/bs"
import { IoDocumentText, IoImageOutline } from "react-icons/io5"
import { AiFillCloseCircle } from "react-icons/ai"
import { useNavigate } from 'react-router-dom'
import TabItem from './TabItem'
import TextInputs from './TextInputs'
import ImageUpload from './ImageUpload'
import useThemeStore from '../../stores/ThemeStore/useThemeStore'

const formTabs = [
    {
        title: "Post",
        icon: IoDocumentText,
    },
    {
        title: "Images & Video",
        icon: IoImageOutline,
    },
    {
        title: "Link",
        icon: BsLink45Deg,
    },
    {
        title: "Poll",
        icon: BiPoll,
    },
    {
        title: "Audio",
        icon: BsMic,
    },
]

export default function NewPostForm() {

    const {isDarkMode} = useThemeStore();
    const navigateTo=useNavigate()

    const [selectedTab, setSelectedTab] = useState(formTabs[0].title); // post tab will be selected default
    const [textInputs, setTextInputs] = useState({
        title: "",
        content: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
     
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadedImage, setUploadedImage] = useState(null);

    const [uploadBtnLoading, setUploadBtnLoading] = useState(false);

    function handleInputChange(e) {

        if(errorMsg){
            setErrorMsg('');
        }
        const { name, value } = e.target;

        setTextInputs((prev) => {
            return { ...prev, [name]: value }
        })


    }

    function handleCreatePost(){
        console.log(textInputs.title)
        console.log(textInputs.content)
        if(textInputs.title.length > 100){
            setErrorMsg("Title characters can't be more than 100");
            return;
        }
        setIsLoading(true);
        const postData = new FormData();
        postData.append('title', textInputs.title);
        postData.append('content', textInputs.content);

        createPost(postData)

    }
    async function createPost(postData){
      const token=(sessionStorage.getItem("userToken"))
        
      try{
        let response=await fetch('https://academics.newtonschool.co/api/v1/reddit/post/',{
              method:'POST',
              headers:{
                projectId:'7k1ct68pbbmr',
                Authorization: `Bearer ${token}`,
            },
            body:postData
            })
            console.log(response)
            let result=await response.json()
            console.log("Post status: ",result)
            setIsLoading(false)
            navigateTo('/')
             
      }
      catch(error){
        alert(error)
      }
    }



    return (
    <Flex direction="column" bg={isDarkMode ? "#1a1a1b" : "white"} borderRadius={4} mt={2}>

        {/* 1st component  */}
        <Flex width="100%">
                {formTabs.map((item, index) => (
                    <TabItem item={item} key={index} isSelected={item.title === selectedTab} setSelectedTab={setSelectedTab} />
                ))}
        </Flex>

        {/* 2nd component */}
        <Flex p={4}>
                {selectedTab === "Post" && <TextInputs
                    textInputs={textInputs}
                    handleInputChange={handleInputChange}
                    handleCreatePost={handleCreatePost}
                    isLoading={isLoading}
                    errorMsg={errorMsg}
                />}

                {selectedTab === "Images & Video" && <ImageUpload
                    // selectedFile={selectedFile}
                    // onSelectImage={onSelectImage}
                    // setSelectedTab={setSelectedTab}
                    // setSelectedFile={setSelectedFile}
                    // setUploadedImage={setUploadedImage}
                    // uploadBtnLoading={uploadBtnLoading}
                    // setUploadBtnLoading={setUploadBtnLoading}
                />}
            </Flex>
            
    </Flex>
  )
}
