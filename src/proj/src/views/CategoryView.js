import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import { FaBeer } from 'react-icons/fa';
import { TiTick } from 'react-icons/ti';
import Backstretch from './backstretch.jpg';
import {useHistory} from 'react-router-dom';

function CategoryView() {
  let history = useHistory();
let initial_data = [
  {id:1,name:"E-commerce stores",value:"E-commerce",show:false},
  {id:2,name:"Software as service (saas)",value:"saas",show:false},
  {id:3,name:"IT & Services",value:"it",show:false},
  {id:4,name:"Marketing services",value:"marketing",show:false},
  {id:5,name:"Advertisement agencies",value:"ad",show:false},
  {id:6,name:"Financial services",value:"finance",show:false},
  {id:7,name:"Insurance",value:"insurance",show:false},
  {id:8,name:"Gaming",value:"gaming",show:false}]
const [data, setdata] = useState(initial_data);
  const [next, nextshow] = useState(false);
  const [button1, showbutton1] = useState(false);

  const redirect = () => {
    history.push('/')
  }

  function show(id) {
    let data_index = data.findIndex(x => x.id == id);
    data[data_index].show=true
    for(let i=0;i<data.length;i++){
      if(data[i].id!=id){
        data[i].show=false
      }
    }
    setdata(data)
    console.log(data);
    nextshow(true)
  }
  return (
    <div>
    <div class="grid grid-cols-12 gap-4">

      <div class="col-span-4 ...">
      <img class="h-full object-cover w-full" src={Backstretch} alt="Backstretch" />
      </div>
      <div class=" col-span-8 ...">
      <div className="flex h-screen   items-center ">

<div class="flex flex-wrap p-14" >
  <div class=" w-full h-1/4 ">
    <p className={'mb-6 text-lg  md:mb-6 md:text-2xl ..'}>Choose a Category that fits's your Business</p>

  </div>
  {data.map((e,i)=>( 
            <div class="w-full md:w-1/2 h-1/4 ">
            <button class="text-left w-full md:w-4/5  border-2 border-gray-300 m-2 py-4 focus:outline-none focus:bg-blue-100 focus:border-blue-200 focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 ..." onClick={() => show(e.id)}>
              <FaBeer class="inline mx-8" /> &nbsp; {e.name} &nbsp;
              {e.show && (<TiTick class="inline mx-8" />)}
  
            </button>
          </div>
  ))}



  <div class=" w-full md:w-1/2 h-1/4 ">
  <Link to="/categoryenter">
    <p className={' mt-6 text-2  text-blue-400'}>I dont find my type of Business</p>
</Link>
  </div>
  <div class=" w-full md:w-1/2 h-1/4 flex justify-center ..">
    {next && (<button onClick={redirect} class="  bg-blue-600 text-white  border-2 border-gray-300 mt-5 p-1 px-3 " >&nbsp;&nbsp;Next&nbsp;&nbsp;</button>)}

  </div>
</div>


</div>
        </div>

    </div>

  </div>

  )
}

export default CategoryView
