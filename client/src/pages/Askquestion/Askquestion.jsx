import React,{useState} from 'react'
import './Askquestion.css'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {askquestion} from '../../actions/question'
import { updateprofile } from '../../actions/users'

const Askquestion = () => {
    
    const [questiontitle, setquestiontitle]= useState('')
    const [questionbody, setquestionbody]= useState('')
    const [questiontags, setquestiontags]= useState('')
    const dispatch = useDispatch()
    const navigate= useNavigate()
    let User = useSelector((state)=>(state.current)) 
    let userplan = User?.plan
   
    let lastquestioned = User?.lastQuestionPostedDate
    let questionaskedtoday = User?.questionsPostedToday
    let User1 = useSelector((state)=>(state.currentuserreducer))
    let userplan1 = User1?.result.plan
    let lastquestioned1 = User1?.result.lastQuestionPostedDate
    let questionaskedtoday1 = User1?.result.questionsPostedToday
    const Handlesubmit= (e) => {
        e.preventDefault()
        if(User !== null ){
        
        lastquestioned=lastquestioned.replace(/T.+$/, '')
               
        let today = new Date().toISOString().split('T')[0];
        
        if (lastquestioned === today ){
            if(userplan === 'basic'){
                if(questionaskedtoday === 0){
                    dispatch(askquestion({questiontitle, questionbody, questiontags, userposted:User.name, userid:User?._id}, navigate))
                    questionaskedtoday = questionaskedtoday + 1;
                    
                    dispatch(updateprofile(User?._id, { questionsPostedToday: questionaskedtoday }));
                    alert("You have successfully posted a question as you are in basic plan you are allowed to post only one question per day")
                    navigate('/')
                }else{
                    alert("Upgrade your plan to ask more questions..")
                    navigate('/')
                }
            }else if(userplan === 'silver'){
                if(questionaskedtoday >= 5){
                    alert("Upgrade your plan to ask more questions..")
                    navigate('/')
                }else{
                    dispatch(askquestion({questiontitle, questionbody, questiontags, userposted:User.name, userid:User._id}, navigate))
                    questionaskedtoday = questionaskedtoday + 1;
                    dispatch(updateprofile(User._id, { questionsPostedToday: questionaskedtoday }));
                    
                    alert("You have successfully posted a question as you are in silver plan you are allowed to post only five question per day")
                    navigate('/')
                }
            }else if(userplan ==='gold'){
                dispatch(askquestion({questiontitle, questionbody, questiontags, userposted:User.name, userid:User?._id}, navigate))
                alert("You have successfully posted a question...")
                navigate('/')
            }
        }else if(lastquestioned < today ){
            questionaskedtoday = 0 ;
            dispatch(updateprofile(User._id, { questionsPostedToday: questionaskedtoday }));
            if(userplan ==='basic'){
                if(questionaskedtoday === 0){
                    dispatch(askquestion({questiontitle, questionbody, questiontags, userposted:User.name, userid:User?._id}, navigate))
                    questionaskedtoday = questionaskedtoday + 1;
                    lastquestioned = new Date()
                    dispatch(updateprofile(User._id, { questionsPostedToday: questionaskedtoday,lastQuestionPostedDate :lastquestioned }));
                    alert("You have successfully posted a question as you are in basic plan you are allowed to post only one question per day")
                    navigate('/')
                }else{
                    alert("Upgrade your plan to ask more questions..")
                    navigate('/')
                }
            }else if(userplan === 'silver'){
                if(questionaskedtoday >= 5){
                    alert("Upgrade your plan to ask more questions..")
                    navigate('/')
                }else{
                    dispatch(askquestion({questiontitle, questionbody, questiontags, userposted:User.name, userid:User?._id}, navigate))
                    questionaskedtoday = questionaskedtoday + 1;
                    lastquestioned = new Date()
                    dispatch(updateprofile(User._id, { questionsPostedToday: questionaskedtoday,lastQuestionPostedDate :lastquestioned }));
                    alert("You have successfully posted a question as you are in silver plan you are allowed to post only five question per day")
                    navigate('/')
                }
            }else if(userplan ==='gold'){
                dispatch(askquestion({questiontitle, questionbody, questiontags, userposted:User.name, userid:User?._id}, navigate))
                alert("You have successfully posted a question...")
                navigate('/')
            }
            
        }
        }else if(User === null){
        
        lastquestioned1=lastquestioned1.replace(/T.+$/, '')
          
        let today = new Date().toISOString().split('T')[0];
      
        if (lastquestioned1 === today ){
            if(userplan1 === 'basic'){
                if(questionaskedtoday1 === 0){
                    dispatch(askquestion({questiontitle, questionbody, questiontags, userposted:User1.result.name, userid:User1?.result._id}, navigate))
                    questionaskedtoday1 = questionaskedtoday1 + 1;
                    
                    dispatch(updateprofile(User1.result._id, { questionsPostedToday: questionaskedtoday1 }));
                    
                    alert("You have successfully posted a question as you are in basic plan you are allowed to post only one question per day")
                    navigate('/')
                }else{
                    alert("Upgrade your plan to ask more questions..")
                    navigate('/')
                }
            }else if(userplan1 === 'silver'){
                if(questionaskedtoday1 >= 5){
                    alert("Upgrade your plan to ask more questions..")
                    navigate('/')
                }else{
                    dispatch(askquestion({questiontitle, questionbody, questiontags, userposted:User1.result.name, userid:User1.result._id}, navigate))
                    questionaskedtoday1 = questionaskedtoday1 + 1;
                    dispatch(updateprofile(User1.result._id, { questionsPostedToday: questionaskedtoday1 }));
                    alert("You have successfully posted a question as you are in silver plan you are allowed to post only five question per day")
                    navigate('/')
                }
            }else if(userplan1 ==='gold'){
                dispatch(askquestion({questiontitle, questionbody, questiontags, userposted:User1.result.name, userid:User1?.result._id}, navigate))
                alert("You have successfully posted a question...")
                navigate('/')
            }
        }else if(lastquestioned1 < today ){
            questionaskedtoday1 = 0 ;
            dispatch(updateprofile(User1.result._id, { questionsPostedToday: questionaskedtoday1 }));
            if(userplan1 ==='basic'){
                if(questionaskedtoday1 === 0){
                    dispatch(askquestion({questiontitle, questionbody, questiontags, userposted:User1.result.name, userid:User1?.result._id}, navigate))
                    questionaskedtoday1 = questionaskedtoday1 + 1;
                    lastquestioned1 = new Date()
                    dispatch(updateprofile(User1.result._id, { questionsPostedToday: questionaskedtoday1,lastQuestionPostedDate :lastquestioned1 }));
                    alert("You have successfully posted a question as you are in basic plan you are allowed to post only one question per day")
                    navigate('/')
                }else{
                    alert("Upgrade your plan to ask more questions..")
                    navigate('/')
                }
            }else if(userplan1 === 'silver'){
                if(questionaskedtoday1 >= 5){
                    alert("Upgrade your plan to ask more questions..")
                    navigate('/')
                }else{
                    dispatch(askquestion({questiontitle, questionbody, questiontags, userposted:User.result.name, userid:User?.result._id}, navigate))
                    questionaskedtoday1 = questionaskedtoday1 + 1;
                    lastquestioned1 = new Date()
                    dispatch(updateprofile(User.result._id, { questionsPostedToday: questionaskedtoday1,lastQuestionPostedDate :lastquestioned1 }));
                    alert("You have successfully posted a question as you are in silver plan you are allowed to post only five question per day")
                    navigate('/')
                }
            }else if(userplan1 ==='gold'){
                dispatch(askquestion({questiontitle, questionbody, questiontags, userposted:User.result.name, userid:User?.result._id}, navigate))
                alert("You have successfully posted a question...")
                navigate('/')
            }
            
        }
        }
        }
  

    const handleEnter =(e)=>{
        if(e.key === 'Enter'){
            setquestionbody(questionbody + "\n")
        }
    }


  return (
    <div className='ask-question'>
        <div className='ask-ques-container'>
            <h1>Ask a public Question</h1>
            <form onSubmit={Handlesubmit}>
                <div className="ask-form-container">
                    <label htmlFor="ask-ques-title">
                        <h4>Title</h4>
                        <p>Be specific and imagine you’re asking a question to another person.</p>
                        <input type="text" id='ask-ques-title' onChange={(e)=>{setquestiontitle(e.target.value)}} placeholder='e.g. Is there any function for finding the index of an element in a vector?' />
                    </label>
                    <label htmlFor="ask-ques-body">
                        <h4>Body</h4>
                        <p>Introduce the problem and expand on what you put in the title. Minimum 20 characters.</p>
                        <textarea name="" id="ask-ques-body" onChange={(e)=>{setquestionbody(e.target.value)}} cols="30" rows="10" onKeyPress={handleEnter}></textarea>
                    </label>
                    <label htmlFor="ask-ques-tags">
                        <h4>Tags</h4>
                        <p>Add up to 5 tags to describe what your question is about.</p>
                        <input type="text" id='ask-ques-tags' onChange={(e)=>{setquestiontags(e.target.value.split(" "))}} placeholder='e.g. (xml typescript wordpress)' />
                    </label>
                </div>
                <input type="submit" value='Review your question' className='review-btn' />
            </form>
        </div>

    </div>
  )
}

export default Askquestion
