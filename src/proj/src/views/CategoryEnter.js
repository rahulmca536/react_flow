import React from 'react'
import {Link} from 'react-router-dom';
import Backstretch from './backstretch.jpg';

function CategoryEnter() {
    return (
      <div class="grid grid-cols-12 gap-4">

      <div class="col-span-4 ...">
      <img class="h-screen object-cover w-full" src={Backstretch} alt="Backstretch" />
      </div>
      <div class=" col-span-8 ...">
      <div  className="flex w-full md:flex h-3/5 w-3/4  items-center justify-center ">
               <div>
               <p className={' mb-6 text-lg md:text-3xl ..'}>Enter category that fits your business</p>

               <p className={' text-gray-500 text-1xl ..'}>Business category</p>

               <input class="w-full py-2 mt-2 rounded bg-gray-200 border border-black focus:border-white focus:outline-none focus:ring-2 focus:bg-white focus:ring-blue-400 "></input>
               <div class="w-full flex">
                 <div class="w-2/3">
                 <Link to="/category">
 
 <p className={' mt-6 text-2  text-blue-400'}>Get back to categories</p>

 </Link>
                 </div>
                 <div class="w-1/3 flex justify-end">
                 
               <button class="block w-2/3 bg-blue-600 text-white  border-2 border-gray-300 mt-5 p-1  " ><Link to="/">&nbsp;&nbsp;Next&nbsp;&nbsp;</Link></button>
              
                 </div>
                 

               </div>
               </div>

        </div>
        
        </div>

    </div>






    )
}

export default CategoryEnter
{/* <div class="min-h-screen bg-yellow-300 p-10">

<div class="space-y-10 md:space-y-0 md:grid md:grid-cols-2">


  <div class="md:flex md:flex-col md:justify-center">
    <h2 class="text-black text-2xl md:text-4xl lg:text-6xl font-bold mb-4">
      Whoa Responsive!
    </h2>

    <p class="md:text-lg text-gray-900">Responsive can be done using Tailwind!</p>
  </div>


  <div class="">
    <div class="w-full h-64 rounded-lg shadow-2xl bg-black md:bg-purple-400">hi</div>
  </div>

</div>

</div> */}
