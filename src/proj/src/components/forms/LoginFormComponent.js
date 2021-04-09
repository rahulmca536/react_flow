// import React, {Fragment, useContext, useEffect, useState} from 'react';
// import {useHistory} from 'react-router-dom';

// import { useForm } from "react-hook-form";
// import { connect } from 'react-redux'

// const LoginFormComponent = ({token,isAuthenticated,login}) => {
//   let history = useHistory();
//   const [user, setUser] = useState({
//     email_address: '',
//     password: '',
//   });
//   const {email_address, password,error} = user;

//   const onChange = e => setUser({...user, [e.target.name]: e.target.value});

//   useEffect(() => {
//     if (token !== null) {
//       history.push('/');
//     }
//     if (
//       error === 'Invalid Credentials' ||
//       error === 'Unauthorized User' ||
//       error === 'Invalid Credential'
//     ) {
//       // setAlert(error, 'danger');
//       // clearErrors();
//     }
//   }, [error, isAuthenticated, history]);

//   const { register, handleSubmit, watch, errors } = useForm();

//   const onSubmit = data => {
//     console.log(data);

//     if (email_address === '' || password === '') {
//       // setAlert('please fill all fields', 'danger');
//     } else {
     
//       window.grecaptcha.ready(() => {
//         window.grecaptcha
//           .execute('6Lc3NVMaAAAAAE4W4Dvv7oKaMbEnc9RiyfDovwYn', {
//             action: 'submit',
//           })
//           .then(token => {
//             login({email_address, password, captcha_value: token});
//           });
//       });
//     }
//   }; // your form submit function which will invoke after successful validation

//   // console.log(watch("example")); // you can watch individual input by pass the name of the input

//   return (
//   <div  className="flex h-screen w-full items-center justify-center">
// <div class=" ">
//     {/* <form onSubmit={handleSubmit(onSubmit) } className={"sm:pl-10 md:pl-10 lg:pl-50 xl:pl-60"} > */}
//     <form  onSubmit={handleSubmit(onSubmit) }  >

//     <p className={' mb-6 text-3xl ..'}>Log in to your account</p>
//     <p className={' mb-4 '}>Email</p>
//     <input name="email" value={email_address} onChange={onChange} className={' md:px-24 bg-gray-200 border  py-4 rounded text-gray-700 w-full  focus:bg-white ' + (errors.hasOwnProperty('username') ? "border-red-500" : '')}  defaultValue="" ref={register} />

    
//     <p className={' my-4'}>Password</p>
   
//     <section className={"w-full"}>
//     <input
//                         name="password"
//                         value={password}
//                         onChange={onChange} type="password"  placeholder="* * * * * * * *"
//       className={'pl-3 pr-3  bg-gray-200 border mb-5 py-4 px-3 rounded text-gray-700 w-full  focus:bg-white ' + (errors.hasOwnProperty('username') ? "border-red-500" : '')}  defaultValue="" ref={register}
//       ref={register({ required: true, maxLength: 10 })}
//     />
//     {errors.exampleRequired && <p>This field is required</p>}
//     </section>
//     <center>
//     <input type="submit" value="Sign in" className={"w-full my-4 py-4 px-3 text-white rounded bg-blue-800"} />
//     <p className={' text-centre'}>or</p>
//     <input type="submit" value="Sign in with Google" className={"w-full my-6 py-4 px-3 text-white rounded bg-blue-400 "} />
//     <p className={' text-centre'}>Terms & Privacy Policy</p>
//     </center>
//   </form>
//   </div>
//   </div>


//   );

//   // const [credentials, setCredentials] = useState({ username: '', password: '' });
//   // const [errors, setErrors] = useState({});

//   // const handleLoginForm = (evt) => {
//   //   evt.preventDefault();

//   //   setErrors(errors => ({ ...validateCredentials(credentials) }));
//   // };

//   // const validateCredentials = (credentials) => {
//   //   let errors = {};

//   //   if (credentials.username === '') {
//   //     errors = Object.assign(errors, {
//   //       username: 'This field is required',
//   //     });
//   //   }

//   //   if (credentials.password === '') {
//   //     errors = Object.assign(errors, {
//   //       password: 'This field is required',
//   //     });
//   //   }

//   //   return errors;
//   // }

//   // const handleInputChange = (evt) => {
//   //   evt.persist()
//   //   setCredentials(credentials => ({ ...credentials, [evt.target.name]: evt.target.value }));
//   // }

//   // return (
//   //   <form className="flex flex-wrap w-full" onSubmit={handleLoginForm.bind(this)}>
//   //     <section className="pl-6 pr-3 w-1/2">
//   //       <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
//   //         Email
//   //     </label>
//   //       <input
//   //         id="username"
//   //         className={'border mb-2 py-2 px-3 rounded text-gray-700 w-full focus:bg-primary ' + (errors.hasOwnProperty('username') ? "border-red-500" : '')}
//   //         name="username"
//   //         type="text"
//   //         placeholder="e.g. some.example"
//   //         value={credentials.username}
//   //         onChange={handleInputChange.bind(this)}
//   //       />
//   //       {errors.hasOwnProperty('username') &&
//   //         <p class="text-red-500 text-xs italic">{errors.username}</p>
//   //       }
//   //     </section>
//   //     <section className="pl-3 pr-6 w-1/2">
//   //       <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
//   //         Password
//   //     </label>
//   //       <input
//   //         id="password"
//   //         className={'border mb-2 py-2 px-3 rounded text-gray-700 w-full focus:bg-primary ' + (errors.hasOwnProperty('password') ? "border-red-500" : '')}
//   //         name="password"
//   //         type="password"
//   //         placeholder="* * * * * * * *"
//   //         value={credentials.password}
//   //         onChange={handleInputChange.bind(this)}
//   //       />
//   //       {errors.hasOwnProperty('username') &&
//   //         <p class="text-red-500 text-xs italic">{errors.username}</p>
//   //       }
//   //     </section>
//   //     <section className="flex justify-end px-6 mt-3 w-full">
//   //       <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:border-none">
//   //         Sign in
//   //     </button>
//   //     </section>
//   //   </form>
//   // );
// }

// const mapDispatchToProps = dispatch => {
//   return {


//   }
// }
// const mapStateToProps = state => {
//   return {
//     userData: state.user.users,
//     route: state.user.route,
//     token: state.user.token,
//     isAuthenticated: state.user.isAuthenticated,
//     error: state.user.error

//   }
// }   
// export default connect(
//   mapStateToProps, mapDispatchToProps,
// )(LoginFormComponent)
