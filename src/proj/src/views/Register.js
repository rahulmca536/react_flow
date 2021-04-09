import React, {Fragment, useContext, useEffect, useState} from 'react';

import LoginForm from '../components/forms/LoginFormComponent';
import {user_loading,set_error, clear_error, register_user } from '../redux'
import {useHistory} from 'react-router-dom';

import { useForm } from "react-hook-form";
import { connect } from 'react-redux'
import {Redirect, Route} from 'react-router-dom';

import { ToastProvider, useToasts } from 'react-toast-notifications'

import Backstretch from './backstretch.jpg';

const Register =({setloading,loading,set_error, clear_error,token,error,isAuthenticated,register})  => {
  const { addToast } = useToasts()

// }

// function Register({token,error,isAuthenticated,register}) {

  
  let history = useHistory();
  const [email, setemail] = useState();
  const [firstname, setfirstname] = useState();
  const [lastname, setlastname] = useState();

  const [password, setpassword] = useState();
  const [cpassword, setcpassword] = useState();



  useEffect(() => {
    if (token!==null && isAuthenticated) {
      set_error("registered")
      addToast("registered Successfully", { appearance: 'success' })
      history.push('/category');}
  }, [token,isAuthenticated,error]);


  const onChangemail = e => setemail(e.target.value);
  const onChangpassword = e => setpassword(e.target.value);
  const onChangcpassword = e => setcpassword(e.target.value);
  const onChangfirstname= e => setfirstname(e.target.value);
  const onChanglastname= e => setlastname(e.target.value);



  const onSubmit = e => {
    e.preventDefault();
    if (!email || !password || !firstname || !lastname) {
      set_error("fill All items")
    } else if(password!==cpassword){
      set_error("Password Mismatch")
    } else if(!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)){
      set_error("You have entered an invalid email address!")
    } else if(password.length <8){
      set_error("Password Length must be greater than 8")
    }
    else {
      setloading()
      window.grecaptcha.ready(() => {
        window.grecaptcha
          .execute('6Lc3NVMaAAAAAE4W4Dvv7oKaMbEnc9RiyfDovwYn', {
            action: 'submit',
          })
          .then(data => {
            register({"email_address":email,"first_name":firstname,"last_name":lastname, "password":password, captcha_value: data});
            if(token && isAuthenticated){
              history.push('/category')
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

    <p className={' mb-6 text-3xl ..'}>Register a new Account</p>
    <p className={' mb-4 '}>Email</p>

    <input name="email" value={email} type="text"  onChange={onChangemail} className={' md:px-24 bg-gray-200 border  py-4 rounded text-gray-700 w-full  focus:bg-white ' }   />

    <p className={' my-4 '}>First Name</p>

    <input name="firstname" value={firstname} type="text"  onChange={onChangfirstname} className={' md:px-24 bg-gray-200 border  py-4 rounded text-gray-700 w-full  focus:bg-white ' }   />
    <p className={' my-4 '}>Last Name</p>

    <input name="lastname" value={lastname} type="text"  onChange={onChanglastname} className={' md:px-24 bg-gray-200 border  py-4 rounded text-gray-700 w-full  focus:bg-white ' }   />

    <p className={' my-4'}>Password</p>
   
    <input name="password" value={password}  onChange={onChangpassword} type="password"  placeholder="* * * * * * * *"
      className={'pl-3 pr-3  bg-gray-200 border  py-4 px-3 text-center rounded text-gray-700 w-full  focus:bg-white'}  
    />
    
    <p className={' my-4'}>Confirm Password</p>
   
   <input name="cpassword" value={cpassword}  onChange={onChangcpassword} type="password"  placeholder="* * * * * * * *"
     className={'pl-3 pr-3  bg-gray-200 border mb-3 py-4 px-3 text-center rounded text-gray-700 w-full  focus:bg-white'}  
     
   />


    <center>
{loading &&(<input disabled type="submit" value="Loading ..." className={"animate-pulse w-full my-4 py-4 px-3 text-white rounded bg-blue-800"} />)}
{!loading &&(<input type="submit" value="Register" className={"w-full my-4 py-4 px-3 text-white rounded bg-blue-800"} />)}
   
    {/* <input type="submit" value="Register" className={"w-full my-4 py-4 px-3 text-white rounded bg-blue-800"} /> */}

    </center>
  </form>

  </div>
  </div>
          </div>

      </div>

   
    )
}


const mapDispatchToProps = dispatch => {
  return {
    register: (Data) => dispatch(register_user(Data)),
    clear_error: () => dispatch(clear_error()),
    set_error: (data) => dispatch(set_error(data)),
    setloading: () => dispatch(user_loading())




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
)(Register)
