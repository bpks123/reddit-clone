import React, { useState } from 'react'
import { Button, Flex, Input, Text } from '@chakra-ui/react'
import useLogInModalStore from '../../../stores/ModalStore/LogInModalStore';
import useSignUpModalStore from '../../../stores/ModalStore/SignUpModalStore';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SignUpInput() {

    const {setLogInModal} = useLogInModalStore();
    const {setSignUpModal} = useSignUpModalStore();

    const [getUserName,setUserName]=useState('')
    const [getUserEmail,setUserEmail]=useState('')
    const [getUserPassword,setUserPassword]=useState('')

    const [buttonLoading, setButtonLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);

    async function createUser(){
        try{
            let response = await fetch(
              "https://academics.newtonschool.co/api/v1/user/signup",
              {
                method: "POST",
                headers: {
                  projectId: "7k1ct68pbbmr",
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name:getUserName,
                    email:getUserEmail,
                    password:getUserPassword,
                    appType:'reddit'
                }),
              });
              if(response.status===403){
                toast.error("Users already exits!!! Please Login to continue...")
              }
              console.log(response)
              if(response.status===201){
                toast.success("Sign Up Successfully!😀😀")
                setSignUpModal(false);
                setLogInModal(true);
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
    const handleSignUpForm=(e)=>{
        e.preventDefault();
        setButtonLoading(true);

        console.log(getUserName+"/ "+getUserEmail+"/ "+getUserPassword)

        // Thsi regex is used to check the username is only alphabet!
        let regex = /^[a-zA-Z]+$/;
        const userName=getUserName;

        if(!regex.test(userName) || userName.length<3){
            setErrorMessage('Name can only contain Aplhabets and must be atleast 3 characters long');
            setButtonLoading(false);
            return;
        }
        if(!getUserEmail.endsWith('@gmail.com')){
            setErrorMessage('Invalid Email');
            setButtonLoading(false);
            return;
        }
        if(getUserPassword.length<5){
            setErrorMessage('The Password must be atleast 5 characters long');
            setButtonLoading(false);
            return;
        }
        createUser();

    }
    function goToLogIn(){
      setSignUpModal(false);
      setLogInModal(true);
  }
  return (
    <Flex direction='column' align='center' width='100%' mt={4}>

        {/* User sign up form */}
    <form onSubmit={handleSignUpForm}> 
       <Input
       type='text'
       name='name'
       placeholder='Name'
       onChange={(e)=>setUserName(e.target.value)}
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
       
       {errorMessage && <Text 
       color='red' 
       fontSize='10pt' 
       textAlign='center'
       >{errorMessage}</Text>}

       <Button type='submit'
       width='100%'
       height='34px'
       mt={2}
       mb={2}
       bg={'#ff4500'}
       color={'white'}
       isLoading={buttonLoading}
       >Sign Up</Button>

     <Flex fontSize='10pt' justifyContent='center' mt={2}>
       <Text mr={1}>Already a Redditer?</Text>
       <Text 
       color='blue.500' 
       fontWeight='700'
       cursor='pointer'
       onClick={goToLogIn}
       >LOG IN</Text>
     </Flex>
    </form>

    </Flex>
  )
}
