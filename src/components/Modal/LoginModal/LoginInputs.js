import React,{useState} from 'react'
import { Button, Flex, Input, Text } from '@chakra-ui/react'
import useLogInModalStore from '../../../stores/ModalStore/LogInModalStore';
import useSignUpModalStore from '../../../stores/ModalStore/SignUpModalStore';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import userLogInStore from '../../../stores/AuthenticationStore/userLogInStore';
export default function LoginInputs() {

    const {showLogInModal, setLogInModal} = useLogInModalStore();
    const {showSignUpModal, setSignUpModal} = useSignUpModalStore();
    const {isLoggedIn, setIsLoggedIn} = userLogInStore();
    
    const [getUserEmail,setUserEmail]=useState('')
    const [getUserPassword,setUserPassword]=useState('')

    const [buttonLoading, setButtonLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);

async function LoginUser(){
        try{
            let response = await fetch(
              "https://academics.newtonschool.co/api/v1/user/login",
              {
                method: "POST",
                headers: {
                  projectId: "7k1ct68pbbmr",
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email:getUserEmail,
                    password:getUserPassword,
                    appType:'reddit'
                }),
              });
              console.log(response)
              if(response.status===401){
                toast.error("Icorrect Email Id or Password!")
              }
              if(response.status===200){
                let result=await response.json()
                console.log(result)
                sessionStorage.setItem('userToken', result.token);
                sessionStorage.setItem('loggedInUserDetails', JSON.stringify(result.data));
                setIsLoggedIn(true)
                toast.success("Login Successfully!😀😀")
                setLogInModal(false);
              }
            setButtonLoading(false)
            setErrorMessage(false)
        }
        catch(error){
            alert("Register Failed!! Try again...")
            setButtonLoading(false)
            setErrorMessage(false)
        }
    }
    const handleLoginForm=(e)=>{
        e.preventDefault();
        setButtonLoading(true);

        console.log(getUserEmail+"/ "+getUserPassword)
        LoginUser();

    }

    function goToSignUp(){
        setLogInModal(false)
        setSignUpModal(true);
    }
  return (
    <Flex direction='column' align='center' width='100%' mt={4}>

        <form onSubmit={handleLoginForm}>
        {/* 1. For Entering User Email */}
        <Input
        type='email'
        name='email'
        placeholder='email'
        onChange={(e)=>setUserEmail(e.target.value)}
        required
        mb={2}
        bg='gray.50'
        fontSize='10pt'
        _placeholder={{color: 'gray.500'}}
        _hover={{
            bg: 'white',
            border: "1px solid",
            borderColor: "blue.500",
        }}
        _focus={{
            outline: 'none',
            bg: 'white',
            border: '1px solid',
            borderColor: 'blue.500',
        }}
        />

        {/*2. For Entering User Password */}
        <Input
        type='password'
        name='password'
        placeholder='password'
        onChange={(e)=>setUserPassword(e.target.value)}
        required
        mb={2}
        bg='gray.50'
        fontSize='10pt'
        _placeholder={{color: 'gray.500'}}
        _hover={{
            bg: 'white',
            border: "1px solid",
            borderColor: "blue.500",
        }}
        _focus={{
            outline: 'none',
            bg: 'white',
            border: '1px solid',
            borderColor: 'blue.500',
        }}
        />

        {/* Print error message if some error whlie login */}
        {errorMessage && <Text 
        textAlign='center' 
        color='red' 
        fontSize='10pt'
        >{errorMessage}</Text>}

        {/* SUbmit button */}
        <Button type='submit'
        width='100%'
        height='34px'
        mt={2}
        mb={2}
        isLoading={buttonLoading}
        >Log In</Button>

        {/* For sign up if not have account */}
        <Flex fontSize='10pt' justifyContent='center' mt={2}>
        <Text mr={1}>New here?</Text>
        <Text 
        color='blue.500' 
        fontWeight='700'
        cursor='pointer'
        onClick={goToSignUp}
        >SIGN UP</Text>
      </Flex>
        </form>
    </Flex>
  )
}
