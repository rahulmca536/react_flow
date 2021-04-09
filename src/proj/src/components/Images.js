import React from 'react'
import LoginForm from '../components/forms/LoginFormComponent';


import Backstretch from './backstretch.jpg';
function Images({children}) {
    return (
    
      <div class="grid grid-cols-12 gap-4">

        <div class="col-span-4 ...">
        <img class="h-screen object-cover w-full" src={Backstretch} alt="Backstretch" />
        </div>
        <div class=" col-span-8 ...">
        {children}
          </div>

      </div>

   
    )
}

export default Images
