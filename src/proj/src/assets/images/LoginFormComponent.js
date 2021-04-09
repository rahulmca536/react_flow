import React, { useState } from 'react';
import { useForm } from "react-hook-form";

const LoginFormComponent = () => {

  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = data => {
    console.log(data);
  }; // your form submit function which will invoke after successful validation

  console.log(watch("example")); // you can watch individual input by pass the name of the input

  return (
  <div  className="flex h-screen w-full items-center justify-center">
<div class=" bg-green ">
    {/* <form onSubmit={handleSubmit(onSubmit) } className={"sm:pl-10 md:pl-10 lg:pl-50 xl:pl-60"} > */}
    <form onSubmit={handleSubmit(onSubmit) }  >

    <p className={' mb-6 text-3xl ..'}>Log in to your account</p>
    <p className={' mb-4 '}>Email</p>
    <input name="example" className={'  bg-gray-200 border  py-2 rounded text-gray-700 w-full  focus:bg-white ' + (errors.hasOwnProperty('username') ? "border-red-500" : '')}  defaultValue="" ref={register} />

    
    <p className={' my-4'}>Password</p>
   
    <section className={"w-full"}>
    <input
      name="exampleRequired" type="password"  placeholder="* * * * * * * *"
      className={'pl-3 pr-3  bg-gray-200 border mb-5 py-2 px-3 rounded text-gray-700 w-full  focus:bg-white ' + (errors.hasOwnProperty('username') ? "border-red-500" : '')}  defaultValue="" ref={register}
      ref={register({ required: true, maxLength: 10 })}
    />
    {errors.exampleRequired && <p>This field is required</p>}
    </section>
    <center>
    <input type="submit" value="Sign in" className={"w-full my-4 py-2 px-3 text-white rounded bg-blue-800"} />
    <p className={' text-centre'}>or</p>
    <input type="submit" value="Sign in with Google" className={"w-full my-6 py-2 px-3 text-white rounded bg-blue-400 "} />
    <p className={' text-centre'}>Terms & Privacy Policy</p>
    </center>
  </form>
  </div>
  </div>


  );

  // const [credentials, setCredentials] = useState({ username: '', password: '' });
  // const [errors, setErrors] = useState({});

  // const handleLoginForm = (evt) => {
  //   evt.preventDefault();

  //   setErrors(errors => ({ ...validateCredentials(credentials) }));
  // };

  // const validateCredentials = (credentials) => {
  //   let errors = {};

  //   if (credentials.username === '') {
  //     errors = Object.assign(errors, {
  //       username: 'This field is required',
  //     });
  //   }

  //   if (credentials.password === '') {
  //     errors = Object.assign(errors, {
  //       password: 'This field is required',
  //     });
  //   }

  //   return errors;
  // }

  // const handleInputChange = (evt) => {
  //   evt.persist()
  //   setCredentials(credentials => ({ ...credentials, [evt.target.name]: evt.target.value }));
  // }

  // return (
  //   <form className="flex flex-wrap w-full" onSubmit={handleLoginForm.bind(this)}>
  //     <section className="pl-6 pr-3 w-1/2">
  //       <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
  //         Email
  //     </label>
  //       <input
  //         id="username"
  //         className={'border mb-2 py-2 px-3 rounded text-gray-700 w-full focus:bg-primary ' + (errors.hasOwnProperty('username') ? "border-red-500" : '')}
  //         name="username"
  //         type="text"
  //         placeholder="e.g. some.example"
  //         value={credentials.username}
  //         onChange={handleInputChange.bind(this)}
  //       />
  //       {errors.hasOwnProperty('username') &&
  //         <p class="text-red-500 text-xs italic">{errors.username}</p>
  //       }
  //     </section>
  //     <section className="pl-3 pr-6 w-1/2">
  //       <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
  //         Password
  //     </label>
  //       <input
  //         id="password"
  //         className={'border mb-2 py-2 px-3 rounded text-gray-700 w-full focus:bg-primary ' + (errors.hasOwnProperty('password') ? "border-red-500" : '')}
  //         name="password"
  //         type="password"
  //         placeholder="* * * * * * * *"
  //         value={credentials.password}
  //         onChange={handleInputChange.bind(this)}
  //       />
  //       {errors.hasOwnProperty('username') &&
  //         <p class="text-red-500 text-xs italic">{errors.username}</p>
  //       }
  //     </section>
  //     <section className="flex justify-end px-6 mt-3 w-full">
  //       <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:border-none">
  //         Sign in
  //     </button>
  //     </section>
  //   </form>
  // );
}

export default LoginFormComponent;
