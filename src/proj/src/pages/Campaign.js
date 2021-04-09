import React from 'react'
import { FaMailBulk } from "react-icons/fa";
import { FaTrafficLight } from "react-icons/fa";
import {useHistory} from 'react-router-dom';
import Editor from '../pages/Editor';



function Campaign() {
  let history = useHistory();
    return (
      <div class="p-4   ">
      <div class="container-fluid mx-auto flex  flex-col bg-white">
      <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
  
      
        <div className="relative  flex-auto">


                  <div class="flex h-full m-20 h justify-center font-serif">
                    <div class="flex flex-col">
                    <div >
<p class="text-3xl p-4">How would you like to engeage your customer!</p>
<p class="text-gray-600 px-4">In Gozenreach, you can import contacts via csv an gmail and setup optinly  to your website to get your leads</p>
<div class="flex w-full">
  <div class=" w-1/4 p-4">

    <button class="group my-8 p-6 rounded-lg border border-gray-200 focus:border-blue-900 w-full text-left">
      

      <FaMailBulk class="text-blue-300 text-5xl" />

      <p class=" text-2xl font-semibold py-4">Transaction email</p>
      <p class="text-xl">Real-time email sent to specific contacts or segments. Automates customer communication.</p>
    </button>


  </div>
  <div class=" w-1/4 p-4">

<button  onClick={()=>history.push("/emailcampaign")} class="group my-8 p-6 rounded-lg border border-gray-200 focus:border-blue-900 w-full text-left">


<FaMailBulk class="text-blue-300 text-5xl" />

<p class=" text-2xl font-semibold py-4">Email campaign</p>
<p class="text-xl">An email campaign is a sequence of marketing efforts that contacts multiple recipients at once.</p>
</button>


</div>
<div class=" w-1/4 p-4">

<button class="group my-8 p-6 rounded-lg border border-gray-200 focus:border-blue-900 w-full text-left">


<FaTrafficLight class="text-blue-300 text-5xl" />

<p class=" text-2xl font-semibold py-4">Email journey</p>
<p class="text-xl">Send targeted content at the right time, every time with email marketing automation</p>
</button>


</div>

</div>
</div>

                    </div>
                  </div>
                </div>
    
    </div>
          </div>
          </div>
          </div>
    )
}

export default Campaign;






