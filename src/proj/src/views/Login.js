import React, {Fragment, useContext, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

import LoginForm from '../components/forms/LoginFormComponent';
import axios from 'axios';

import {useHistory} from 'react-router-dom';

import { useForm } from "react-hook-form";
import { connect } from 'react-redux'
import {set_error,user_loading,login_user,clear_error } from '../redux'
import { ToastProvider, useToasts } from 'react-toast-notifications'

import Backstretch from './backstretch.jpg';
function Login({set_error,token,error,isAuthenticated,login,clear_error,loading,user_loading}) {

  const { addToast } = useToasts()
  
  let history = useHistory();
  const [email, setemail] = useState();
  const [password, setpassword] = useState();


  useEffect(() => {
  if (token!==null && isAuthenticated) {
    addToast("Login Successfully", { appearance: 'success' })
    history.push('/home')}
  }, [token,isAuthenticated]);



  const onChangemail = e => setemail(e.target.value);
  const onChangpassword = e => setpassword(e.target.value);


  const onSubmit = e => {
    e.preventDefault();
    if (!email || !password) {

      set_error("Fill All Items")     
    } else if(token && isAuthenticated){
      history.push('/home')
    }else {


      user_loading()
      window.grecaptcha.ready(() => {
        window.grecaptcha
          .execute('6Lc3NVMaAAAAAE4W4Dvv7oKaMbEnc9RiyfDovwYn', {
            action: 'submit',
          })
          .then(data => {



            login({"email_address":email, "password":password, captcha_value: data});
            if(token && isAuthenticated){
              
              history.push('/')
            }
          });
      });
    }
  };

    return (
    
      <div class="grid grid-cols-12 gap-4">

        <div class="col-span-4 ...">
        <img class="h-full object-cover w-full" src={Backstretch} alt="Backstretch" />
        </div>
        <div class=" col-span-8 ...">
        <div  className="flex h-screen w-full items-center justify-center">
<div class=" ">
{error &&(
<div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
  <center><strong class="font-bold">{error}</strong></center>
  <span onClick={()=>clear_error()} class="absolute top-0 bottom-0 right-0 px-4 py-3">
    <svg class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
  </span>
</div>)}
    {/* <form onSubmit={handleSubmit(onSubmit) } className={"sm:pl-10 md:pl-10 lg:pl-50 xl:pl-60"} > */}
    <form onSubmit={onSubmit}  >

    <p className={' mb-6 text-3xl ..'}>Log in to your account</p>
    <p className={' mb-4 '}>Email</p>

    <input name="email" value={email} type="text"  onChange={onChangemail} className={' md:px-24 bg-gray-200 border  py-4 rounded text-gray-700 w-full  focus:bg-white ' }   />

    
    <p className={' my-4'}>Password</p>
   
    <section className={"w-full"}>

    <input name="password" value={password}  onChange={onChangpassword} type="password"  placeholder="* * * * * * * *"
      className={'pl-3 pr-3  bg-gray-200 border mb-5 py-4 px-3 text-center rounded text-gray-700 w-full  focus:bg-white'}  
      
    />
    
    </section>
    <center>
    {loading && (<input disabled type="submit" value="Loading..." className={"animate-pulse  w-full my-4 py-4 px-3 text-white rounded bg-blue-800"} />)}
      {!loading && (<input type="submit" value="Sign in" className={"w-full my-4 py-4 px-3 text-white rounded bg-blue-800"} />)}
    </center>

  </form>
  <center>

<p className={' text-centre'}>or</p>
<Link to="/register">
<input type="submit" value="Signup" className={"w-full my-6 py-4 px-3 text-white rounded bg-blue-400 "} />
</Link>
<p className={' text-centre'}>Terms & Privacy Policy</p>
</center>
  </div>
  </div>
          </div>

      </div>

   
    )
}


const mapDispatchToProps = dispatch => {
  return {
    login: (Data) => dispatch(login_user(Data)),
    clear_error: () => dispatch(clear_error()),
    user_loading:()=> dispatch(user_loading()),
    set_error: (data) => dispatch(set_error(data)),
  }
}
const mapStateToProps = state => {
  return {
    userData: state.user.users,
    route: state.user.route,
    token: state.user.token,
    isAuthenticated: state.user.isAuthenticated,
    error: state.user.error,
    loading: state.user.loading


  }
}   
export default connect(
  mapStateToProps, mapDispatchToProps,
)(Login)
