import React, { useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import { RiDeleteBin5Line } from "react-icons/ri";


const INIT_DATA = [{ "data": [{ name: "name",condition:"is",value:"sdds" }],"boolean": "AND" }] ;
const name_array= ["email","name","phone"];
const condition_array= ["is","isnot"];

function Filter() {
    const [inputList, setInputList] = useState(INIT_DATA);

    // handle input change
    const handleInputChange = (e, index, i) => {
        const { name, value } = e.target;
        const list = [...inputList];
        list[index].data[i].firstName = value;
        setInputList(list);
    };

    // handle click event of the Remove button
    const handleRemoveClick = (index, i) => {
        const list = [...inputList];
        const newl = list[index].data;
        newl.splice(i, 1);
        setInputList(list);
    };

    // handle click event of the Remove card button
    const handlecardremoveClick = (index) => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
    };

    // handle click event of the Add button
    const handleAddClick = index => {
        console.log("sfsfs");
        const addlist = [...inputList];
        addlist[index].data.push({ name: "",condition:"",value:"" })
        setInputList(addlist);
    };

    // handle click event of the Add Card button
    const handleAddarrClick = () => {
        setInputList([...inputList, { "data": [{ name: "",condition:"",value:""}],"boolean":"AND" }]);
    };
    return (

            <div className=" ">

<div class=" px-6">
<p class="text-xl mb-4">Name *</p>
<input placeholder="Enter the Firstname" class="bg-white p-3 mt-2 flex w-full rounded" type="text" />

{inputList.map((card_data,index)=>(<div class="border  border-gray-400 rounded mt-8">
    <div class="border border-gray-100 p-4 bg-white">
    <label class="inline-flex items-center">
      <input type="radio" class="form-radio" name="accountType" value="personal" checked/>
      <span class="text-xl  ml-2">Match all</span>
    </label>
    <label class="inline-flex items-center ml-6">
      <input type="radio" class="form-radio" onClick={()=>alert('hello')} name="accountType" value="busines" />
      <span class="text-xl ml-2" >Match any</span>
    </label>
  </div>

    {card_data.data.map((or_data, i)=>(
        <>
        {card_data.data.length>0 &&(<>
                    <div class="flex flex-nowrap p-4">

                    <select  class="w-44 bg-white p-4 mt-4 mx-2" >
                        {or_data.name && (<>        {name_array.map((mydata,y)=>(<>
                            {or_data.name === mydata &&(<option  selected>{mydata}</option>)}
                            {or_data.name !== mydata &&(<><option >{mydata}</option></>)}
                </>))}</> )}
                {!or_data.name && (<><option  selected disabled>Choose field</option> {name_array.map((mydata,y)=>(<option>{mydata}</option>))}</> )}
                  </select>
                
                  <select  class="w-44 bg-white p-4 mt-4 mx-2" >
                        {or_data.condition && (<>        {condition_array.map((mydata,y)=>(<>
                            {or_data.condition === mydata &&(<option  selected>{mydata}</option>)}
                            {or_data.condition !== mydata &&(<><option >{mydata}</option></>)}
                </>))}</> )}
                {!or_data.condition && (<><option  selected disabled>Choose field</option> {condition_array.map((mydata,y)=>(<option>{mydata}</option>))}</> )}
                  </select>

                  {or_data.value && (<input value={or_data.value }  class="p-4 mt-4 mx-2 text-center" type="text" />)}
                  {!or_data.value && (<input   class="p-4 mt-4 mx-2 text-center" type="text" />)}
                
                 
                  <p>
                {/* {or_data.condition && or_data.name && or_data.value &&(<RiDeleteBin5Line/>)} */}
                <RiDeleteBin5Line class="mt-8 ml-2 text-red-500"/>

                </p>
                  </div>
                  <div class="border-l-2 border-fuchsia-600 ..."></div>
                  </>
        )}

  </>
    ))}
            <button onClick={() => handleAddClick(index)} class="bg-white m-4 px-8 text-1xl rounded-lg font-semibold  border-2 border-gray-300 py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 ..." >
<IoIosAddCircle class="inline text-green-600 text-2xl" /> Add Condition
</button>


  </div>
))}
<center>
<button onClick={() => handleAddarrClick()} class="bg-white  my-8 px-8 text-1xl rounded-lg font-semibold  border-2 border-gray-300 py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 ..." >
<IoIosAddCircle class="inline text-green-600 text-2xl" /> Add new filter
</button>
</center>



{/* {inputList.map((card_data, index) => (
                     <div className="Main">
                     <div className="card-cont">
                    {card_data.or.map((or_data, i) => (
        <div key={i}>
        <p>Card {index} Index {i}</p>
        <input
            placeholder="Enter the Firstname"
            value={card_data.firstName}
            onChange={e => handleInputChange(e, index, i)}
        /><br /><br />

        <div className="btn-box">
            {<button onClick={() => handleAddClick(index)}>OR</button>}
            {i !== 0 && <button
                className="mr10"
                onClick={() => handleRemoveClick(index, i)}>Remove data</button>}
        </div>
        {i === 0 && <button onClick={handleAddarrClick}>AND</button>}

        {i === 0 && index !== 0 && <button onClick={() => handlecardremoveClick(index)}>Remove Card</button>}
    </div>
                        ))}
                                </div>
  
  </div>
            ))}<br />
            <button >Save Changes</button> */}


</div>



            </div>

   
    )
}

export default Filter
