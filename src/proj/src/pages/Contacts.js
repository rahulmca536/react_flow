import React from 'react'
import { TiArrowMaximiseOutline } from 'react-icons/ti';
import { connect } from 'react-redux'
import { success_false,clear_error,filterContact,addTagContact,contactBulkDelete,getContactByid,updateContact,get_contact,selectContact,deselectContact,del_contact,gettags,createcontact,selectAllContacts,deselectAllContacts} from '../redux'
import axios from 'axios';
import Filter from './drawer';
import { CgArrowsV } from "react-icons/cg";
import Filtercomponent from '../components/Filter';
import Tabledata from '../components/table_data';
import { IoIosAddCircle } from "react-icons/io";
import { data } from 'autoprefixer';
// import Multiselect from './../components/Utils/Multiselect';
import { ToastProvider, useToasts } from 'react-toast-notifications'
import Swal from 'sweetalert2';
import Mulcomponent from '../components/Multiselect';


function Contacts({contact_action_loading,loading,message,success_false,error,clear_error,filterContact,addTagContact,contactBulkDelete,current_contact,getContactByid,get_contacts,updateContact,selected_contacts,contacts,del_contact,page_contact,gettags,tags_data,createcontact,success,deselectContact,selectContact,selectAllContacts,deselectAllContacts}) {

  const { addToast } = useToasts()

  const [limit, setlimit] = React.useState(10);
  const [page, setpage] = React.useState(1);
  const [order, setorder] = React.useState(0);
  const [sortby, setsortby] = React.useState("first_name");

  const [success_data, setsuccess_data] = React.useState(success);

  const [filter_drawer, setfilter_drawer] = React.useState(false);
  const [edit_drawer, setedit_drawer] = React.useState(false);
  const [addnew_drawer, setaddnew_drawer] = React.useState(false);
  const [addtag_drawer, setaddtag_drawer] = React.useState(false);
  
  const [current_contact_id, setcurrent_contact_id] = React.useState();

  const [check_state, setCheckState] = React.useState(false);
  const [selectedtags, setselectedtags] = React.useState();
  const [updatedselectedtags, setupdatedselectedtags] = React.useState();

  const [edit_data, setedit_data] = React.useState();
  const [new_data, setnew_data] = React.useState({
    email_address: '',
    first_name: '',
    last_name: '',
    phone: '',
    tags: [],
    notes: '',
    location: {},
  });

  const [tags, settags] = React.useState([]);
  const [tagsname, settagsname] = React.useState([]);

  const [assingned_tag, setassingned_tag] = React.useState();
  const [assingned_tag_button, setassingned_tag_button] = React.useState(false);




const {email_address, first_name, last_name, phone, status, notes} = new_data;
const onChange = e =>
setnew_data({...new_data, [e.target.name]: e.target.value});

const onChangeedit = e =>
setedit_data({...edit_data, [e.target.name]: e.target.value});

const onChangelimit = (data) =>{
  get_contacts({"limit" : data.target.value, "page":page, "order":order, "sortBy":sortby})
  setlimit(data.target.value)
}
const handlesearch = (data) =>{

  let search_data = data.target.value
  if(search_data.length >3){
    filterContact(search_data)
  }

  else{
  }
}



const assign_tag = () =>{
  addTagContact(assingned_tag,selected_contacts)
}

  React.useEffect(() => {
    if(!contacts || contacts.length===0){
      get_contacts({"limit" : limit, "page":page, "order":order, "sortBy":sortby})
    }
    if(!tags_data || tags_data.length===0){
    gettags({"limit":25,"page":1,"sortBy":"tag_name","orderBy":0})

    }


  },[]);

  React.useEffect(() => {
    if (success) {
      setaddnew_drawer(false)
      setedit_drawer(false)
      setaddtag_drawer(false)
      Swal.fire({
        icon: 'success',
        title: message,
        showConfirmButton: false,
        timer: 1500
      });
      // addToast(message, { appearance: 'success' })

      success_false()
    }

  },[success]);

  const onClick_checkbox = e => {
    if (!check_state) {
      selectAllContacts();
    } else {
      deselectAllContacts();
    }
    setCheckState(!check_state);
  };

function order_contacts(data){
  console.log(order,data);
if(order===0){
  get_contacts({"limit" : limit, "page":page_contact.current, "order":1 , "sortBy":data})
  setorder(1)
}else{
  get_contacts({"limit" : limit, "page":page_contact.current, "order":0 , "sortBy":data})
  setorder(0)
}
}



  function delete_contact(data){
console.log(data);
del_contact(data)
  }

  const handleChange=(event)=> {
    let data = [...tags]
    data.push(event)
    settags(data)
  }
  const remove_selected_tag=(event)=> {
    console.log(event);
    const filtered = tags.filter(e=> e !== event);
    console.log(filtered);
    settags(filtered)
  }

  const onSelect = data => {
    console.log(data);
    setupdatedselectedtags(data);
  };

  function edit(data){
    setcurrent_contact_id(data.contact_uuid)
    getContactByid(data.contact_uuid)

    setedit_data(data)
    setsuccess_data(false)
    setedit_drawer(true)
  }

  function addnew_contact(){
    let params = {
      email_address: new_data.email_address,
      first_name: new_data.first_name,
      last_name: new_data.last_name,
      phone: new_data.phone,
      tags: tags,
      notes: new_data.notes,
      location: new_data.location,
    }
    createcontact(params)
    settags([])
  }

  const edit_contact=()=>{

    let params = {
      email_address: edit_data.email_address,
      first_name: edit_data.first_name,
      last_name: edit_data.last_name,
      phone: edit_data.phone,
      tags: updatedselectedtags && updatedselectedtags.length>0 ?updatedselectedtags : current_contact.tag,
      tags:tags,
      notes: edit_data.notes,
      location: edit_data.location,
    }

    updateContact(edit_data.contact_uuid,params)
    
  }

  if (loading) {
    return <div class="min-h-screen flex flex-col items-center justify-center  pb-48">
    {/* <button class="animate-spin inline-block py-4 px-8 bg-yellow-500 text-yellow-100 rounded-lg">Loading . . .</button> */}
    <p class="animate-ping inline-block  text-blue-800 ">Loading . . .</p>
</div>
  }
  if (!loading && contacts.length === 0) {
    return <div class="min-h-screen flex flex-col items-center justify-center  pb-48">
    {/* <button class="animate-spin inline-block py-4 px-8 bg-yellow-500 text-yellow-100 rounded-lg">Loading . . .</button> */}
    <p >No contacts to Show . . .</p>
</div>
  }
    return (

      
        <div class="p-3 ">


{edit_drawer && !success_data && (
  
   <div class="fixed inset-0 transition-opacity" aria-hidden="true">
   <div  class="absolute inset-0 bg-gray-600 w-3/4 opacity-75">

   </div>
      <div  class="bg-white z-index:1  h-full w-1/4 absolute inset-y-0 right-0 overflow-y-auto overflow-x-hidden">
      <div class="fixed inset-0 transition-opacity" aria-hidden="true">
   <div class="absolute inset-0 bg-gray-600 w-3/4 opacity-75"></div>
      <div  class="bg-white z-index:1  h-full w-1/4 absolute inset-y-0 right-0 overflow-y-auto overflow-x-hidden flex justify-center">
        <div>
     <p class="px-8 py-10 font-semibold text-xl">Edit Contact
   <button class="float-right font-semibold text-2xl focus:outline-none" onClick={()=>setedit_drawer(false)}>&times;</button>
   </p>
   {error &&(
<div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
  <center><strong class="font-bold">{error}</strong></center>
  <span onClick={()=>clear_error()} class="absolute top-0 bottom-0 right-0 px-4 py-3">
    <svg class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
  </span>
</div>)}
   <p class=" mx-4 my-2">FirstName :</p>
<input               
 name="first_name"
              Value={edit_data.first_name}
              onChange={onChangeedit}  placeholder="Enter the Firstname" class="border-2 border-gray-400 bg-white p-3  w-full  rounded" type="text" />
<p class=" mx-4 mb-2 mt-6">LastName :</p>
<input             name="last_name"
              Value={edit_data.last_name}
              onChange={onChangeedit} placeholder="Enter the LastName" class="border-2 border-gray-400 bg-white p-3  w-full rounded" type="text" />
<p class=" mx-4 mb-2 mt-6">Email :</p>
<input               name="email_address"
              Value={edit_data.email_address}
              onChange={onChangeedit} placeholder="Enter the Email" class="border-2 border-gray-400 bg-white p-3 w-full rounded" type="text" />
<p class=" mx-4 mb-2 mt-6">PhoneNo :</p>
<input               name="phone"
              Value={edit_data.phone}
              onChange={onChangeedit} placeholder="Enter the PhoneNo" class="border-2 border-gray-400 bg-white p-3 w-full rounded" type="text" />
              <Mulcomponent current={current_contact_id} tags={tags_data} selected={current_contact?current_contact.tag:""} handleChange={handleChange} remove_selected_tag={remove_selected_tag} />

{/* <Multiselect
              options={tags_data}
              labelName="tag_name"
              valueName="tag_uuid"
              selected={current_contact?current_contact.tag:""}
              onSelect={onSelect}
            /> */}
<div>
<button onClick={()=>edit_contact()} class="bg-gray-100 m-8  text-1xl rounded-lg font-semibold  border-2 border-gray-300 py-2 px-4 focus:outline-none focus:bg-blue-100 focus:border-blue-200 focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 ..." >
 Save
</button>
<button onClick={()=>setedit_drawer(false)} class="bg-gray-100   text-1xl rounded-lg font-semibold  border-2 border-gray-300 py-2 px-4 focus:outline-none focus:bg-blue-100 focus:border-blue-200 focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 ..." >
 Cancel
</button>
</div>
{contact_action_loading && (<center><p>Updating ...</p></center>)}


</div>
 </div>
 </div>

 </div>
 </div>
)}

{addnew_drawer && (
   <div class="fixed inset-0 transition-opacity" aria-hidden="true">
   <div class="absolute inset-0 bg-gray-600 w-3/4 opacity-75"></div>
      <div  class="bg-white z-index:1  h-full w-1/4 absolute inset-y-0 right-0 overflow-y-auto overflow-x-hidden flex justify-center">
        <div>
     <p class="px-8 py-10 font-semibold text-xl">Add New Contact
   <button class="float-right font-semibold text-2xl focus:outline-none" onClick={()=>setaddnew_drawer(false)}>&times;</button>
   </p>
   {error &&(
<div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
  <center><strong class="font-bold">{error}</strong></center>
  <span onClick={()=>clear_error()} class="absolute top-0 bottom-0 right-0 px-4 py-3">
    <svg class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
  </span>
</div>)}
   <p class=" mx-4 my-2">FirstName :</p>
<input               name="first_name"
              value={first_name}
              onChange={onChange}  placeholder="Enter the Firstname" class="border-2 border-gray-400 bg-white p-3  w-full  rounded" type="text" />
<p class=" mx-4 mb-2 mt-6">LastName :</p>
<input             name="last_name"
              value={last_name}
              onChange={onChange} placeholder="Enter the LastName" class="border-2 border-gray-400 bg-white p-3  w-full rounded" type="text" />
<p class=" mx-4 mb-2 mt-6">Email :</p>
<input               name="email_address"
              value={email_address}
              onChange={onChange} placeholder="Enter the Email" class="border-2 border-gray-400 bg-white p-3 w-full rounded" type="text" />
<p class=" mx-4 mb-2 mt-6">PhoneNo :</p>
<input               name="phone"
              value={phone}
              onChange={onChange} placeholder="Enter the PhoneNo" class="border-2 border-gray-400 bg-white p-3 w-full rounded" type="text" />

              <p class=" mx-4  mt-6">Select Tag :</p>
              <Mulcomponent tags={tags_data} handleChange={handleChange} remove_selected_tag={remove_selected_tag} />

              {/* <select name=''  onChange={handleChange}  class="w-44 bg-white w-full p-4 mt-2 mx-2" >
              <option  selected disabled>Select Tag </option> 
              {tags_data.map((mydata,y)=>(<option name={mydata.tag_name}
              value={mydata.tag_uuid}>{mydata.tag_name}</option>))}
                </select>
                {tagsname.map((data,y)=>(<p>{data.tag_name}</p>))} */}

<div>
<button onClick={()=>addnew_contact()} class="bg-gray-100 m-8  text-1xl rounded-lg font-semibold  border-2 border-gray-300 py-2 px-4 focus:outline-none focus:bg-blue-100 focus:border-blue-200 focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 ..." >
 Save
</button>
<button onClick={()=>setaddnew_drawer(false)} class="bg-gray-100   text-1xl rounded-lg font-semibold  border-2 border-gray-300 py-2 px-4 focus:outline-none focus:bg-blue-100 focus:border-blue-200 focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 ..." >
 Cancel
</button>
</div>
{contact_action_loading && (<center><p>Creating ...</p></center>)}

</div>
 </div>
 </div>
)}

{addtag_drawer && (
   <div class="fixed inset-0 transition-opacity" aria-hidden="true">
   <div class="absolute inset-0 bg-gray-600 w-3/4 opacity-75"></div>
      <div  class="bg-white z-index:1  h-full w-1/4 absolute inset-y-0 right-0 overflow-y-auto overflow-x-hidden flex justify-center">
        <div>
        <p class="px-8 py-10 font-semibold text-xl">Select tag
   <button class="float-right font-semibold text-2xl focus:outline-none" onClick={()=>setaddtag_drawer(false)}>&times;</button>
   </p>


        <select name='' id='' onChange={e => setassingned_tag(e.target.value)}  class="w-44 bg-white w-full p-4 mt-2 mx-2" >
        <option value="" >Choose Tag</option>
        
              {tags_data.map((mydata,y)=>(<option name={mydata.tag_name}
              value={mydata.tag_uuid}>{mydata.tag_name}</option>))}
                </select>

{/* {assingned_tag_button && (<button onClick={()=>assign_tag()} class="bg-gray-100 m-8  text-1xl rounded-lg font-semibold  border-2 border-gray-300 py-2 px-4 focus:outline-none focus:bg-blue-100 focus:border-blue-200 focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 ..." >
 Assign Tag
</button>)} */}

<button onClick={()=>assign_tag()} class="bg-gray-100 m-8  text-1xl rounded-lg font-semibold  border-2 border-gray-300 py-2 px-4 focus:outline-none focus:bg-blue-100 focus:border-blue-200 focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 ..." >
 Assign Tag
</button>
{contact_action_loading && (<center><p>Assigning ...</p></center>)}
</div>

 </div>
 </div>
)}



        <div class="container-fluid mx-auto flex flex-col">
          <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
 <div class="bg-white h-20">
                <p > <span class="mt-6 mx-6 inline-block align-middle">Total Contacts: 
                </span>
                {selected_contacts.length>1 && (                <span class="mt-6 mx-6 inline-block align-middle">
                <button onClick={()=>setaddtag_drawer(true)} class="bg-green-100  mr-8 px-8 text-1xl rounded-lg font-semibold  border-2 border-gray-300 py-2 px-4 focus:outline-none focus:bg-blue-100 focus:border-blue-200 focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 ..." >
<IoIosAddCircle class="inline text-green-600 text-2xl" /> Add Tag
</button>
<button onClick={()=>contactBulkDelete(selected_contacts)} class="bg-red-100  mr-8 px-8 text-1xl rounded-lg font-semibold  border-2 border-gray-300 py-2 px-4 focus:outline-none focus:bg-blue-100 focus:border-blue-200 focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 ..." >
 Delete Selected Contact
</button>
                </span>)}

                
                <span class="float-right ">
                
                <input onChange={handlesearch} class="mainLoginInput border-2 rounded-lg border-blue-400" type="text" placeholder="                  &#61442;  Search"/>
                <button onClick={()=>setaddnew_drawer(true)} class="bg-gray-100  mr-8 px-8 text-1xl rounded-lg font-semibold  border-2 border-gray-300 py-2 px-4 focus:outline-none focus:bg-blue-100 focus:border-blue-200 focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 ..." >
<IoIosAddCircle class="inline text-green-600 text-2xl" /> Add Contact
</button>
                <button class="inline-block align-middle mr-8 px-8 my-4 bg-gray-100 text-1xl rounded-lg font-semibold  border-2 border-gray-300 py-2 px-4 focus:outline-none focus:bg-blue-100 focus:border-blue-200 focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 ..." >
Table Settings
</button>
                  <button onClick={()=> setfilter_drawer(true)} class=" inline-block align-middle mr-8 my-4 bg-gray-100 px-8 text-1xl rounded-lg font-semibold  border-2 border-gray-300 py-2 px-4 focus:outline-none focus:bg-blue-100 focus:border-blue-200 focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 ..." >
Filter
</button></span>
</p>
</div>  
{filter_drawer && (
  <div  class="bg-gray-200 z-index:1  h-full w-2/5 absolute inset-y-0 right-0 overflow-y-auto overflow-x-hidden">
    <p class="px-8 py-10 font-semibold text-xl">Filter
  <button class="float-right font-semibold text-2xl " onClick={()=>setfilter_drawer(false)}>&times;</button>
  </p>
<Filtercomponent />
</div>
)}



    <table class="min-w-full divide-y divide-gray-200">
    <thead class="bg-gray-50">
      <tr>
      <th>
              <p>
                <label>
                  <input
                    type="checkbox"
                    onClick={onClick_checkbox}
                    checked={check_state}
                  />
                  <span></span>
                </label>
              </p>
            </th>
        <th onClick={() =>order_contacts("first_name") } scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          First Name < CgArrowsV class ="inline text-xs"/>
        </th>
        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Last Name
        </th>
        <th onClick={() =>order_contacts("email_address") } scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Email < CgArrowsV class ="inline text-xs"/>
        </th>
        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          PhoneNo
        </th>
        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Status
        </th>

        <th scope="col" class="relative px-6 py-3">
          <span class="sr-only">Edit</span>
        </th>
      </tr>
    </thead>
    <tbody class="bg-white divide-y divide-gray-200  ">

      
      {contacts.map(data => {
  return (
    <Tabledata
    data={data}
    selectAll={check_state}
    edit={edit}
    delete_contact={delete_contact}
    selectContact={selectContact}
    deselectContact={deselectContact}
     />
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
          <button class="focus:outline-none" onClick={() => get_contacts({"limit" : limit, "page":page_contact.current -1, "order":order, "sortBy":sortby})}>Previous</button>
        </a>
        <button onClick={() => get_contacts({"limit" : limit, "page":1, "order":order, "sortBy":sortby})} className='{" inline-flex items-center px-6 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50" + (page_contact.current  ? "text-gray-200" : "bg-gray-500")}'>
          1
        </button>
        <button onClick={() => get_contacts({"limit" : limit, "page":2, "order":order, "sortBy":sortby})}  class=" inline-flex items-center px-6 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
          2
        </button>
        <button onClick={() => get_contacts({"limit" : limit, "page":3, "order":order, "sortBy":sortby})} class="hidden md:inline-flex  items-center px-6 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
          3
        </button>
        <button onClick={() => get_contacts({"limit" : limit, "page":4, "order":order, "sortBy":sortby})} class="hidden md:inline-flex  items-center px-6 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
          4
        </button>
        <button onClick={() => get_contacts({"limit" : limit, "page":5, "order":order, "sortBy":sortby})} class="hidden md:inline-flex  items-center px-6 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
          5
        </button>
        <button onClick={() => get_contacts({"limit" : limit, "page":6, "order":order, "sortBy":sortby})} class="hidden md:inline-flex  items-center px-6 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
          6
        </button>
        <button onClick={() => get_contacts({"limit" : limit, "page":7, "order":order, "sortBy":sortby})} class="hidden md:inline-flex  items-center px-6 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
          7
        </button>
        <button onClick={() => get_contacts({"limit" : limit, "page":8, "order":order, "sortBy":sortby})} class="hidden md:inline-flex  items-center px-6 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
          8
        </button>
        <button onClick={() => get_contacts({"limit" : limit, "page":9, "order":order, "sortBy":sortby})} class=" inline-flex items-center px-6 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
          9
        </button>
        <button onClick={() => get_contacts({"limit" : limit, "page":10, "order":order, "sortBy":sortby})} class=" inline-flex items-center px-6 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
          10
        </button>
        <a  class=" inline-flex items-center px-6 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
          <span class="sr-only">Next</span>
          {/* <!-- Heroicon name: solid/chevron-right --> */}
          <button class="focus:outline-none"  onClick={() => get_contacts({"limit" : limit, "page":page_contact.next, "order":order, "sortBy":sortby})}>Next</button>

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

    </div>
    )
}


const mapDispatchToProps = dispatch => {
  return {
    get_contacts: (data) => dispatch(get_contact(data)),
    del_contact: (data) => dispatch(del_contact(data)),
    gettags: (data) => dispatch(gettags(data)),
    createcontact: (data) => dispatch(createcontact(data)),
    selectAllContacts:()=>dispatch(selectAllContacts()),
    deselectAllContacts:()=>dispatch(deselectAllContacts()),
    selectContact:(data)=>dispatch(selectContact(data)),
    deselectContact:(data)=>dispatch(deselectContact(data)),
    updateContact:(e,data)=>dispatch(updateContact(e,data)),
    getContactByid:(data)=>dispatch(getContactByid(data)),
    contactBulkDelete:(data)=>dispatch(contactBulkDelete(data)),
    addTagContact:(e,data)=>dispatch(addTagContact(e,data)),
    filterContact:(data)=>dispatch(filterContact(data)),
    clear_error:()=>dispatch(clear_error()),
    success_false:()=>dispatch(success_false()),



  }
}
const mapStateToProps = state => {
  return {
    contacts: state.contact.contacts,
    page_contact: state.contact.page_contact,
    tags_data: state.tags.tags_id,
    success: state.contact.success,
    selected_contacts: state.contact.selected_contacts,
    current_contact: state.contact.current_contact,
    error: state.contact.error,
    message: state.contact.message,
    loading: state.contact.loading,
    contact_action_loading: state.contact.action_loading




  }
}   
export default connect(
  mapStateToProps, mapDispatchToProps,
)(Contacts)
