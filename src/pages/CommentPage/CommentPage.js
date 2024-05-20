import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import AllPagesLayout from '../../components/Layout/AllPagesLayout';
import PostItem from '../../components/HomePageComponents/PostItem';
import useLogInModalStore from '../../stores/ModalStore/LogInModalStore';
import userLogInStore from '../../stores/AuthenticationStore/userLogInStore';
import useMenuButtonTextStore from '../../stores/NavigatorStore/useMenuButtonTextStore';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Comments from '../../components/CommentPageComponents/Comments';
import useThemeStore from '../../stores/ThemeStore/useThemeStore';
import { SubmitPostRhs } from '../../components/SubmitPostPageComponents/SubmitPostRhs';
export default function CommentPage() {

    const { postId } = useParams();
    console.log("Post Id: ",postId)

    const {isLoggedIn, setIsLoggedIn} = userLogInStore();
    const {setLogInModal}=useLogInModalStore();
    const {setMenuButtonText} = useMenuButtonTextStore();
    const navigateTo = useNavigate();

    const [currentPostDetails, setCurrentPostDetails] = useState(null);
    const [allComments, setAllComments] = useState(null);
    const {isDarkMode} = useThemeStore();

    const [commentText, setCommentText] = useState('');
    const [btnLoading, setBtnLoading] = useState(false);
    const [getHeight,setHeight]=useState(window.innerHeight-50)

    useEffect(()=>{
        setMenuButtonText('Post');
        sessionStorage.setItem('menuButtonText', 'Post');
      }, [])    

    // Fetching all posts and fileter with current post ID
    const fetchAllPosts=async()=>{
        try{
            let response=await fetch('https://academics.newtonschool.co/api/v1/reddit/post?limit=1000',{
                headers:  {
                    'projectID': '7k1ct68pbbmr'
                }
            })
            let result=await response.json()
            // Filter the post with user PostId
            const selectedPost=result.data.find((item)=>item._id===postId)
            // console.log("All Posts: ",result.data)
            console.log("selected Post: ",selectedPost)
            setCurrentPostDetails(selectedPost)
            
        }
        catch(error){
            alert(error)
        }
    }

    // Gets comment of current post Id
    const getCommentsOfPost=async()=>{

      const token=(sessionStorage.getItem("userToken"))
        try{
            let response=await fetch(`https://academics.newtonschool.co/api/v1/reddit/post/${postId}/comments/`,{
                method:'GET',
                headers:{
                projectId:'7k1ct68pbbmr',
                Authorization: `Bearer ${token}`
            },
            body:null //For like body will be none
            })
            let result=await response.json()
            console.log("Post comment: ",result.data)
            setAllComments(result.data.reverse())
        }
        catch(error){
            alert(error)
        }
    }

    useEffect(()=>{
        fetchAllPosts();
        getCommentsOfPost();
    },[])
    
// For increase the like when user press like button
const increaseLike=async(postId)=>{
    if(!isLoggedIn){
      setLogInModal(true);
      return;
   }
   try{
      const token=(sessionStorage.getItem("userToken"))
      // API used to like the post
      let response=await fetch(`https://academics.newtonschool.co/api/v1/reddit/like/${postId}`,{
            method:'POST',
            headers:{
            projectId:'7k1ct68pbbmr',
            Authorization: `Bearer ${token}`
          },
          body:null //For like body will be none
          })
          // console.log(response)
          let result=await response.json()
          console.log(result)
          toast.success(result.message)
          fetchAllPosts()
   }
   catch(error){
    alert(error)
   }
  }

  // For decrease the like button when user dislike the posts
  const decreaseLike=async(postId)=>{
    if(!isLoggedIn){
      setLogInModal(true);
      return;
   }
   try{
      const token=(sessionStorage.getItem("userToken"))
      // API used to dislike the post
      let response=await fetch(`https://academics.newtonschool.co/api/v1/reddit/like/${postId}`,{
            method:'DELETE',
            headers:{
            projectId:'7k1ct68pbbmr',
            Authorization: `Bearer ${token}`
          },
          body:null //For dislike body will be none
          })
          // console.log(response)
          let result=await response.json()
          console.log(result)
          toast.success(result.message)
          fetchAllPosts()
   }
   catch(error){
    alert(error)
   }
  }

  // To handle error just return the funtion so when user again click on comment it will not throw error
  function handleComment() {
    return;
  }

  async function handleCommentClick(){
    setBtnLoading(true)
    const token=(sessionStorage.getItem("userToken"))
    try{
      let response=await fetch(`https://academics.newtonschool.co/api/v1/reddit/comment/${postId}`,{
            method:'POST',
            headers:{
              projectId:'7k1ct68pbbmr',
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
          },
          body:JSON.stringify({
            content:commentText
          })
          })
          let result=await response.json()
          console.log("Comment status: ",result)
          setBtnLoading(false);
          fetchAllPosts();
          getCommentsOfPost();    
          setCommentText('')    
    }
    catch(error){
      alert(error)
    }
    
  }

  // Delete the post comment
  async function deleteComment(commentId){
    console.log("Delte comment: ",commentId)
    try{
      const token=(sessionStorage.getItem("userToken"))
      // API used to delete the post comment
      let response=await fetch(`https://academics.newtonschool.co/api/v1/reddit/comment/${commentId}`,{
            method:'DELETE',
            headers:{
              projectId:'7k1ct68pbbmr',
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
          }
          })
          console.log("Response",response)
          getCommentsOfPost()
          fetchAllPosts()
   }
   catch(error){
    console.log(error)
   }

  }
  return (
    <div style={{backgroundColor:isDarkMode?"rgb(0,0,0)":"rgba(211,211,211,0.8)", minHeight:getHeight}}>
      <AllPagesLayout>
        {currentPostDetails && 
        <>
          <PostItem 
              post={currentPostDetails}
              decreaseLike={decreaseLike}
              increaseLike={increaseLike}
              handleComment={handleComment}
          />
          <Comments postId={postId}
            commentText={commentText} 
            setCommentText={setCommentText} 
            btnLoading={btnLoading} 
            handleCommentClick={handleCommentClick}
            allComments={allComments}
            deleteComment={deleteComment}
          />
          </>
        }
        <>
        {/* Right side heading */}
        <SubmitPostRhs/>

        </>
      </AllPagesLayout>
  </div>
  )
}
