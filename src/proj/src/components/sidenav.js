import React from 'react'
import { RiDashboardLine } from 'react-icons/ri';
import { CgProfile } from 'react-icons/cg';
import { AiOutlineMail } from 'react-icons/ai';
import { FiSettings } from 'react-icons/fi';
import { IoIosAddCircle } from "react-icons/io";
import { AiFillTags } from "react-icons/ai";
import { FcAdvertising } from "react-icons/fc";


import {Link} from 'react-router-dom';
import UserDropdown from "./UserDropdown.js";

function sidenav({children}) {
    return (
<div class="md:flex flex-col md:flex-row md:min-h-screen overflow-hidden" >
  <div  class="flex flex-col  md:w-20 text-gray-700 bg-gray-800 dark-mode:text-gray-200 dark-mode:bg-gray-800 flex-shrink-0" x-data="{ open: false }" id="mobile-menu">
    {/* <div class="flex-shrink-0 px-8 py-4 flex flex-row items-center justify-between">
      <a href="#" class="text-lg font-semibold tracking-widest text-gray-900 uppercase rounded-lg dark-mode:text-white focus:outline-none focus:shadow-outline">Flowtrail UI</a>

    </div> */}
    <nav  class="fixed hidden flex-grow space-y-8 md:block px-2 pb-4 md:pb-0 md:overflow-y-auto">
                  <div class="flex-shrink-0 px-4 pt-4">
            <img class="h-8 w-8 "  src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg" alt="Workflow" />
          </div>
      <a class="block px-4 py-2  text-3xl text-white rounded-lg dark-mode:bg-gray-700 dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-100 focus:text-gray-900 hover:bg-gray-600 focus:bg-gray-200 focus:outline-none focus:shadow-outline" >
      <Link to="/"><RiDashboardLine /></Link></a>
     
      <a class="block px-4 py-2  text-3xl text-white rounded-lg dark-mode:bg-gray-700 dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-100 focus:text-gray-900 hover:bg-gray-600 focus:bg-gray-200 focus:outline-none focus:shadow-outline" >
      <Link to="/contacts"><CgProfile /></Link></a>
        
      <a class="block px-4 py-2  text-3xl text-white rounded-lg dark-mode:bg-gray-700 dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-100 focus:text-gray-900 hover:bg-gray-600 focus:bg-gray-200 focus:outline-none focus:shadow-outline" >
      <Link to="/tags"><AiFillTags /></Link></a>

      <a class="block px-4 py-2  text-3xl rounded-lg dark-mode:bg-gray-700 dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-100 focus:text-gray-900 hover:bg-gray-600 focus:bg-gray-200 focus:outline-none focus:shadow-outline" >
      <Link to="/campaign"><FcAdvertising /></Link></a>

      <a class="block px-4 py-2  text-3xl text-white rounded-lg dark-mode:bg-gray-700 dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-100 focus:text-gray-900 hover:bg-gray-600 focus:bg-gray-200 focus:outline-none focus:shadow-outline" ><AiOutlineMail /></a>
      <a class="block px-4 py-2  text-3xl text-white rounded-lg dark-mode:bg-gray-700 dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-100 focus:text-gray-900 hover:bg-gray-600 focus:bg-gray-200 focus:outline-none focus:shadow-outline" ><FiSettings /></a>


    </nav>
  </div>
  <div class="w-full">
<nav class="bg-white ">
  <div class="mx-auto px-4 sm:px-6 lg:px-6">
    <div class="flex items-center justify-between md:h-24">


      <div class="flex items-center">
        {/* <div class="flex-shrink-0">
          <img class="h-8 w-8" src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg" alt="Workflow" />
        </div> */}
        <div class="hidden md:block">
          <div class=" flex items-baseline space-x-4">
          <a href="#" class="text-black text-xl  hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</a>
            {/* <a href="#" class="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium">Dashboard</a>
            <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Team</a>
            <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Projects</a>
            <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Calendar</a>
            <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Reports</a> */}
          </div>
        </div>
      </div>
      <div class="hidden md:block">
        <div class=" ml-4 flex items-center md:ml-6">

        <input class="mainLoginInput" type="text" placeholder="                  &#61442;  Search"/>

        <button class="  mr-16 ml-8 px-8 text-1xl rounded-lg font-semibold  border-2 border-gray-300 py-2 px-4 focus:outline-none focus:bg-blue-100 focus:border-blue-200 focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 ..." >
<IoIosAddCircle class="inline text-green-600 text-2xl" /> Add new
</button>
          {/* <button class="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
            <span class="sr-only">View notifications</span>
            <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button> */}

          <div class="ml-3 relative">
          <UserDropdown />
            {/* <div>
              <button type="button" class="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" id="user-menu" aria-expanded="false" aria-haspopup="true">
                <span class="sr-only">Open user menu</span>
                <img class="h-12 w-12 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
              </button>
            </div> */}
          </div>
        </div>
      </div>


    </div>
    <div class="mr-2 flex md:hidden">
        <button type="button" class="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
          <span class="sr-only">Open main menu</span>

          <svg class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>

          <svg class="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>


  </div>


</nav>
<div  class="flex flex-col w-10 md:hidden text-gray-700 bg-gray-800 dark-mode:text-gray-200 dark-mode:bg-gray-800 flex-shrink-0">
  {/* <div class="flex-shrink-0 px-8 py-4 flex flex-row items-center justify-between">
    <a href="#" class="text-lg font-semibold tracking-widest text-gray-900 uppercase rounded-lg dark-mode:text-white focus:outline-none focus:shadow-outline">Flowtrail UI</a>

  </div> */}
  <nav  class="hidden flex-grow space-y-8 md:block px-2 pb-4 md:pb-0 md:overflow-y-auto">
                <div class="flex-shrink-0 px-4">
          <img class="h-8 w-8 "  src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg" alt="Workflow" />
        </div>
    <a class="block px-4 py-2  text-3xl text-white rounded-lg dark-mode:bg-gray-700 dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-100 focus:text-gray-900 hover:bg-gray-600 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="#"><RiDashboardLine /></a>
    <a class="block px-4 py-2  text-3xl text-white rounded-lg dark-mode:bg-gray-700 dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-100 focus:text-gray-900 hover:bg-gray-600 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="#"><CgProfile /></a>
    <a class="block px-4 py-2  text-3xl text-white rounded-lg dark-mode:bg-gray-700 dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-100 focus:text-gray-900 hover:bg-gray-600 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="#"><AiOutlineMail /></a>
    <a class="block px-4 py-2  text-3xl text-white rounded-lg dark-mode:bg-gray-700 dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-100 focus:text-gray-900 hover:bg-gray-600 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="#"><FiSettings /></a>


  </nav>
</div>
<main class="bg-gray-100 h-full ">
  {/* <div class="max-w-7xl h-screen "> */}


          {children}

    

</main>
</div>
</div>



    )
}

export default sidenav
