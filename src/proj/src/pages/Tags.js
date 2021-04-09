import React from 'react'
import { TiArrowMaximiseOutline } from 'react-icons/ti';
import { connect } from 'react-redux'
import { clear_error,success_false,updateTag,createTag,deleteTag,get_contact, del_contact, gettags, createcontact } from '../redux'
import axios from 'axios';
import Filter from './drawer';
import { CgArrowsV } from "react-icons/cg";
import Filtercomponent from '../components/Filter';
import { IoIosAddCircle } from "react-icons/io";
import { ToastProvider, useToasts } from 'react-toast-notifications'
import Swal from 'sweetalert2';

function Tags({ action_loading,clear_error,error,success_false,message,updateTag,page_tag,createtag,deleteTag,get_contacts, contacts, del_contact, page_contact, gettags, tags_data, createcontact, success }) {
const { addToast } = useToasts()
  const [limit, setlimit] = React.useState(10);
  const [page, setpage] = React.useState(1);
  const [order, setorder] = React.useState(0);
  const [sortby, setsortby] = React.useState("tag_name");

  const [edit_data, setedit_data] = React.useState();
  const [created_tag, setcreated_tag] = React.useState();



  const [addtag_drawer, setaddtag_drawer] = React.useState(false);
  const [edit_drawer, setedit_drawer] = React.useState(false);
  const [tags, settags] = React.useState([]);


  React.useEffect(() => {
    if (!tags_data || tags_data.length === 0 || page_tag.limit===25) {
      gettags({"limit":limit,"page":page,"sortBy":sortby,orderBy:order})
      
    }
  }, []);

  React.useEffect(() => {
    console.log(success);
    if(action_loading){
      Swal.showLoading();
    }
    if (success) {
      setaddtag_drawer(false)
      setedit_drawer(false)
     
          Swal.fire({
            icon: 'success',
            title: message,
            showConfirmButton: false,
            timer: 1500
          });
      // addToast(message, { appearance: 'success' })
      success_false()
    }
  }, [success]);

  const onChangelimit = (data) =>{
    gettags({"limit" : data.target.value, "page":page, "orderBy":order, "sortBy":sortby})
    setlimit(data.target.value)
  }

  const onChange = e =>{
    let edit_param = {tag_uuid:edit_data.tag_uuid,tag_name:e.target.value}
    setedit_data(edit_param);
  }

  function edit(data){


    setedit_data(data)
    setedit_drawer(true)
  }
  function update_tag(){
console.log(edit_data);
    updateTag(edit_data.tag_uuid,{tag_name:edit_data.tag_name})
  }

  function inputKeyDown(e) {
    const val = e.target.value;
    if (e.key === 'Enter' && val) {
      console.log(val);
      e.currentTarget.value = ""
      let data = [...tags]
      data.push(val)
      settags(data)
      console.log(data);
      createtag({ "tag_name": val })
    }
  }
  function create_tag(){
    createtag({ "tag_name": created_tag })
  }
  function removeTag(i) {
    let newTags = [...tags]
    newTags.splice(i, 1);
    settags(newTags)
  }
  function order_tag(){
    console.log(order);
  if(order===0){
    gettags({"limit":10,"page":1,"sortBy":'tag_name',orderBy:1})
    setorder(1)
  }else{
    gettags({"limit":10,"page":1,"sortBy":'tag_name',orderBy:0})
    setorder(0)
  }
  }

  if (!tags_data || tags_data.length === 0) {
    return <div class="min-h-screen flex flex-col items-center justify-center  pb-48">
      {/* <button class="animate-spin inline-block py-4 px-8 bg-yellow-500 text-yellow-100 rounded-lg">Loading . . .</button> */}
      <p class="animate-pulse inline-block py-4 px-8 bg-red-300 text-red-100 rounded-lg">Loading</p>
      {/* <button class="animate-ping inline-block py-4 px-8 bg-blue-500 text-blue-100 rounded-lg">Loading . . .</button> */}
    </div>
  }
  return (
    <div class="p-3 ">



      {addtag_drawer && (
   <div class="fixed inset-0 transition-opacity" aria-hidden="true">
   <div class="absolute inset-0 bg-gray-600 w-3/4 opacity-75"></div>
      <div  class="bg-white z-index:1  h-full w-1/4 absolute inset-y-0 right-0 overflow-y-auto overflow-x-hidden flex justify-center">
        <div>
        <p class="px-8 py-10 font-semibold text-xl">Create tag
   <button class="float-right font-semibold text-2xl focus:outline-none" onClick={()=>setaddtag_drawer(false)}>&times;</button>
   </p>

   {error &&(
<div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
  <center><strong class="font-bold">{error}</strong></center>
  <span onClick={()=>clear_error()} class="absolute top-0 bottom-0 right-0 px-4 py-3">
    <svg class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
  </span>
</div>)}

   <div className="flex-wrap mt-4">
   <input class="w-full p-2 border-2 rounded border-black " type="text" onChange={e => setcreated_tag(e.target.value)} />
   <center><button onClick={()=>create_tag()} class="bg-gray-100 m-8  text-1xl rounded-lg font-semibold  border-2 border-gray-300 py-2 px-4 focus:outline-none focus:bg-blue-100 focus:border-blue-200 focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 ..." >
 Create
</button>
<button onClick={()=>setaddtag_drawer(false)} class="bg-gray-100   text-1xl rounded-lg font-semibold  border-2 border-gray-300 py-2 px-4 focus:outline-none focus:bg-blue-100 focus:border-blue-200 focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 ..." >
 Cancel
</button></center>
{action_loading && (<center><p>Creating ...</p></center>)}
                            {/* <ul className=" flex inline">
                              {tags.map((tag, i) => (
                                <li class="flex px-2 items-center justify-center" key={tag}>
                                  <span class="bg-gray-200 py-1 px-2 rounded-l">{tag}</span>
                                  <button class="bg-gray-300 py-1 border-none px-2 rounded-r border-blue-300" type="button" onClick={() => removeTag(i)}>×</button>
                                </li>
                              ))}
                              <li className="flex-grow">
                                <input type="text" class="w-full p-2" onKeyDown={inputKeyDown} /></li>
                            </ul> */}
                          </div>

        {/* <select name='' id='' onChange={e => setassingned_tag(e.target.value)}  class="w-44 bg-white w-full p-4 mt-2 mx-2" >
        <option value="" >Choose Tag</option>
              {tags_data.map((mydata,y)=>(<option name={mydata.tag_name}
              value={mydata.tag_uuid}>{mydata.tag_name}</option>))}
                </select> */}



{/* <button onClick={()=>assign_tag()} class="bg-gray-100 m-8  text-1xl rounded-lg font-semibold  border-2 border-gray-300 py-2 px-4 focus:outline-none focus:bg-blue-100 focus:border-blue-200 focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 ..." >
 Assign Tag
</button> */}
</div>
 </div>
 </div>
)}

{edit_drawer  && (
   <div class="fixed inset-0 transition-opacity" aria-hidden="true">
   <div  class="absolute inset-0 bg-gray-600 w-3/4 opacity-75">

   </div>
      <div  class="bg-white z-index:1  h-full w-1/4 absolute inset-y-0 right-0 overflow-y-auto overflow-x-hidden">
      <div class="fixed inset-0 transition-opacity" aria-hidden="true">
   <div class="absolute inset-0 bg-gray-600 w-3/4 opacity-75"></div>
      <div  class="bg-white z-index:1  h-full w-1/4 absolute inset-y-0 right-0 overflow-y-auto overflow-x-hidden flex justify-center">
        <div>
     <p class="px-8 py-10 font-semibold text-xl">Edit Tag
   <button class="float-right font-semibold text-2xl focus:outline-none" onClick={()=>setedit_drawer(false)}>&times;</button>
   </p>

<input               
 name="first_name"
              Value={edit_data.tag_name}
              onChange={onChange}  placeholder="Enter the Firstname" class="border-2 border-gray-400 bg-white p-3  w-full  rounded" type="text" />

<div>
<button onClick={()=>update_tag()}  class="bg-gray-100 m-8  text-1xl rounded-lg font-semibold  border-2 border-gray-300 py-2 px-4 focus:outline-none focus:bg-blue-100 focus:border-blue-200 focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 ..." >
 Save
</button>
<button onClick={()=>setedit_drawer(false)} class="bg-gray-100   text-1xl rounded-lg font-semibold  border-2 border-gray-300 py-2 px-4 focus:outline-none focus:bg-blue-100 focus:border-blue-200 focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 ..." >
 Cancel
</button>
</div>
{action_loading && (<center><p>Updating ...</p></center>)}



</div>
 </div>
 </div>

 </div>
 </div>
)}


      <div class="container-fluid mx-auto flex flex-col">
        <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <div class="bg-white h-20">
                <p > <span class="mt-6 mx-6 inline-block align-middle">Total Tags: </span>
                  <span class="float-right ">
                    <button onClick={() =>setaddtag_drawer(true) } class="bg-gray-100  mr-8 px-8 text-1xl rounded-lg font-semibold  border-2 border-gray-300 py-2 px-4 focus:outline-none focus:bg-blue-100 focus:border-blue-200 focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 ..." >
                      <IoIosAddCircle class="inline text-green-600 text-2xl" /> Create Tag
</button>

                    <button class=" inline-block align-middle mr-8 my-4 bg-gray-100 px-8 text-1xl rounded-lg font-semibold  border-2 border-gray-300 py-2 px-4 focus:outline-none focus:bg-blue-100 focus:border-blue-200 focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 ..." >
                      Filter
</button>
                  </span>
                </p>
              </div>

              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th onClick={() =>order_tag() } scope="col" class="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tag Name < CgArrowsV class="inline text-xs" />
                    </th>

                    <th scope="col" class="relative px-6 py-3">
                      <span class="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200  ">


                  {tags_data.map(data => {
                    return (
                      <tr>

                        <td class="px-6 py-4 whitespace-nowrap flex justify-center">
                          <div class="flex items-center">


                            <div class="text-sm font-medium text-gray-900">
                              {data.tag_name}
                            </div>
                          </div>
                        </td>


                        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">



                          <p class=" flex inline text-indigo-600 hover:text-indigo-900 ">

                            <button class="focus:outline-none" onClick={() => edit(data)}  >Edit </button>
                            <button class="focus:outline-none pl-4"  onClick={() => deleteTag(data.tag_uuid)}>Delete </button> </p>

                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
  <div class="flex-1 flex justify-between sm:hidden">
    <a  class=" inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500">
      Previous
    </a>
    <a  class="ml-3  inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500">
      Next
    </a>
  </div>
  <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
   
      <nav class="  inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
        <a  class=" inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
          <span class="sr-only">Previous</span>
          {/* <!-- Heroicon name: solid/chevron-left --> */}
          <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
          </svg>
          <button class="focus:outline-none" onClick={() => gettags({"limit" : limit, "page":page_tag.current -1, "orderBy":order, "sortBy":sortby})}>Previous</button>
        </a>
        <button onClick={() => gettags({"limit" : limit, "page":1, "orderBy":order, "sortBy":sortby})} className='{" inline-flex items-center px-6 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50" + (page_tag.current  ? "text-gray-200" : "bg-gray-500")}'>
          1
        </button>
        <button onClick={() => gettags({"limit" : limit, "page":2, "orderBy":order, "sortBy":sortby})}  class=" inline-flex items-center px-6 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
          2
        </button>
        <button onClick={() => gettags({"limit" : limit, "page":3, "orderBy":order, "sortBy":sortby})} class="hidden md:inline-flex  items-center px-6 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
          3
        </button>
        <button onClick={() => gettags({"limit" : limit, "page":4, "orderBy":order, "sortBy":sortby})} class="hidden md:inline-flex  items-center px-6 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
          4
        </button>

        <a  class=" inline-flex items-center px-6 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
          <span class="sr-only">Next</span>
          {/* <!-- Heroicon name: solid/chevron-right --> */}
          <button class="focus:outline-none"  onClick={() => gettags({"limit" : limit, "page":page_tag.next, "orderBy":order, "sortBy":sortby})}>Next</button>

          <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
          </svg>
        </a>
        <select name="limit" value={limit} onChange={onChangelimit} class="border-2 border-gry-400 ml-8 w-20 bg-white px-4">
        <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </select>
      </nav>

  </div>
</div>

      {/* <div class="min-h-screen flex flex-col items-center justify-center bg-purple-600 pb-48">

        <h2 class="text-4xl text-purple-100 mb-8">Tailwind Animation Classes in 1.6!</h2>

        <div class="flex space-x-8 text-3xl">

         <button class="animate-pulse inline-block py-4 px-8 bg-red-500 text-red-100 rounded-lg">Pulse</button>

          <button class="animate-bounce inline-block py-4 px-8 bg-teal-500 text-teal-100 rounded-lg">Bounce</button>
        </div>

      </div> */}
    </div>
  )
}


const mapDispatchToProps = dispatch => {
  return {
    get_contacts: (data) => dispatch(get_contact(data)),
    del_contact: (data) => dispatch(del_contact(data)),
    gettags: (data) => dispatch(gettags(data)),
    createcontact: (data) => dispatch(createcontact(data)),
    deleteTag: (data)=> dispatch(deleteTag(data)),
    createtag: (data) => dispatch(createTag(data)),
    updateTag: (e,data)=> dispatch(updateTag(e,data)),
    success_false:()=>dispatch(success_false()),
    clear_error:()=>dispatch(clear_error())

  }
}
const mapStateToProps = state => {
  return {
    contacts: state.contact.contacts,
    page_contact: state.contact.page_contact,
    tags_data: state.tags.tags_id,
    page_tag: state.tags.page_tag,
    message:state.tags.message,
    error:state.tags.error,

    success: state.tags.success,
    action_loading: state.tags.action_loading



  }
}
export default connect(
  mapStateToProps, mapDispatchToProps,
)(Tags)