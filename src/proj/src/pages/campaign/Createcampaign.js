import React from 'react'
import { connect } from 'react-redux'
import { clear_current_campaign,set_save_quit_route,gettags,createCampaign,set_success_campaign} from '../../redux'
import Swal from 'sweetalert2';
import Selecttag from '../../components/campaign/Selecttag';
import {useHistory} from 'react-router-dom';


export const Createcampaign = ({clear_current_campaign,set_save_quit_route,save_quit_route,selected_tags,current_campaign_email,current_campaign,createCampaign,loading,success_campaign,set_success_campaign}) => {
  let history = useHistory();
    
  const [openTab, setOpenTab] = React.useState(1);
    const [advanced, setadvanced] = React.useState(false);
    const [showModal, setShowModal] = React.useState(false);
    const [campaign_data, setcampaign_data] = React.useState({
      campaign_name: '',
      campaign_type:'',
      subject:'',
      from:'',
      user_name:'',
      reply_to:''
    });
    const {campaign_name, campaign_type, subject, from, user_name, reply_to} = campaign_data;
    const onChange = e =>
    setcampaign_data({...campaign_data, [e.target.name]: e.target.value});


    React.useEffect(() => {
      clear_current_campaign()      
    },[]);

    React.useEffect(() => {

      if (save_quit_route) {
        history.push('/emailcampaign')
        set_save_quit_route()
        clear_current_campaign()
      }
      if (success_campaign) {      
        Swal.fire({
          icon: 'success',
          title: "Campaign Created",
          showConfirmButton: false,
          timer: 1500
        });
        set_success_campaign()

      }
      
  
    },[success_campaign,save_quit_route]);

    function Create_campaign(e){
      if(e==="quit"){
        createCampaign(campaign_data,true)
      }else{
        if(!campaign_name|| !campaign_type || !subject || !from || !user_name|| !reply_to){
          alert("fill all")
        }
        else if(current_campaign_email){
          setOpenTab(2)
        }else{
          createCampaign(campaign_data,false)
          setOpenTab(2)
        }
      }
  
    }

    return (
      <>
             {showModal ? (
        <>
          <div
            className="justify-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Modal Title
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                    I always felt like I could do anything. That’s the main
                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">

                  <button
                    className="bg-emerald-500 text-green active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Save Changes
                  </button>
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
      
        <div className="flex flex-wrap">
          <div className="w-full">
          <div class="flex justify-center sticky top-0 ">
          <ul
              className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
              role="tablist"
            >
              <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                <a
                  className={
                    "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                    (openTab === 1
                      ? "text-white bg-blue-600"
                      : "text-blue-600 bg-white")
                  }
                  onClick={e => {
                    e.preventDefault();
                    setOpenTab(1);
                  }}
                  data-toggle="tab"
                  href="#link1"
                  role="tablist"
                >
                  <i className="fas fa-space-shuttle text-base mr-1"></i> Setup
                </a>
              </li>
              <li className="-mb-px mr-2 last:mr-0 flex-auto text-center flex items-center"> <i class="fas fa-chevron-right"></i></li>
             
              <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                <a
                  className={
                    "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                    (openTab === 2
                      ? "text-white bg-blue-600"
                      : "text-blue-600 bg-white")
                  }
                  onClick={e => {
                    e.preventDefault();
                    setOpenTab(2);
                  }}
                  data-toggle="tab"
                  href="#link2"
                  role="tablist"
                >
                  <i className="fas fa-cog text-base mr-1"></i>  Design
                </a>
              </li>
              <li className="-mb-px mr-2 last:mr-0 flex-auto text-center flex items-center"> <i class="fas fa-chevron-right"></i></li>

              <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                <a
                  className={
                    "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                    (openTab === 3
                      ? "text-white bg-blue-600"
                      : "text-blue-600 bg-white")
                  }
                  onClick={e => {
                    e.preventDefault();
                    setOpenTab(3);
                  }}
                  data-toggle="tab"
                  href="#link3"
                  role="tablist"
                >
                  <i className="fas fa-briefcase text-base mr-1"></i>  Recipients
                </a>
              </li>
              <li className="-mb-px mr-2 last:mr-0 flex-auto text-center flex items-center"> <i class="fas fa-chevron-right"></i></li>

              <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                <a
                  className={
                    "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                    (openTab === 4
                      ? "text-white bg-blue-600"
                      : "text-blue-600 bg-white")
                  }
                  onClick={e => {
                    e.preventDefault();
                    setOpenTab(4);
                  }}
                  data-toggle="tab"
                  href="#link4"
                  role="tablist"
                >
                  <i className="fas fa-briefcase text-base mr-1"></i>  Confirmation
                </a>
              </li>
            </ul>
            </div>

            <div className="relative flex flex-col min-w-0 break-words bg-white h-full w-full mb-6 shadow-lg rounded ">
              <div className="px-4 py-5 flex-auto overscroll-auto ">
                <div className="tab-content tab-space">
                  <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                    <div class="flex justify-center">
                      <div>

<p class="font-semibold my-2 ">Campaign Name</p>
<input  name="campaign_name"
              value={campaign_name}
              onChange={onChange}  placeholder="Enter the Campaign name" class="border-2 outline-none focus:ring-2 focus:ring-blue-400 bg-white p-2  w-full  rounded" type="text" />
<p class=" mt-2 mb-4 text-xs text-gray-600">Give your campaign an internal name to help organize and locate it easily within your account. For example:'Sale_October'
</p>

<p class="font-semibold my-2 ">Campaign Type</p>
<input  name="campaign_type"
              value={campaign_type}
              onChange={onChange} placeholder="Enter the Campaign Tsype" class="border-2 outline-none focus:ring-2 focus:ring-blue-400 bg-white p-2  w-full  rounded" type="text" />
<p class=" mt-2 mb-4 text-xs text-gray-600">Give your campaign an internal name to help organize and locate it easily within your account. For example:'Sale_October'
</p>

<p class="font-semibold my-2 ">Subject Line</p>
<input  name="subject"
              value={subject}
              onChange={onChange}  placeholder="Subject" class="border-2 outline-none focus:ring-2 focus:ring-blue-400 bg-white p-2  w-full  rounded" type="text" />
<p class=" mt-2 mb-4 text-xs text-gray-600">Write a subject line that clearly describes your email content. it will be visible in your recipient's inbox and is the first content they will see. For example: 'private sale:25% off our new collection'
</p>

<p class="font-semibold my-2 ">From Email</p>
<input name="from"
              value={from}
              onChange={onChange} placeholder="qqq@gmail.com" class="border-2 outline-none focus:ring-2 focus:ring-blue-400 bg-white p-2  w-full  rounded" type="text" />
<p class=" mt-2 mb-4 text-xs text-gray-600">Choose the email address to be shown in your receipients inbox when they recieve your campaign or <button class=" focus:outline-none font-semibold text-blue-600" >Add a new sender</button>.
</p>

<p class="font-semibold my-2 ">From Name</p>
<input   name="user_name"
              value={user_name}
              onChange={onChange} placeholder="ccc" class="border-2 outline-none focus:ring-2 focus:ring-blue-400 bg-white p-2  w-full  rounded" type="text" />
<p class=" mt-2 mb-4 text-xs text-gray-600">Enter a name (e.g. your company name) to help campaign recipients recognize you in their inbox.
</p>
{!advanced && (<button class="focus:outline-none text-blue-600"  onClick={()=>setadvanced(true)}>Show Advanced Options <i class="fas fa-arrow-down"></i></button>)}

{advanced &&(<>
  <p class="font-semibold my-2 ">Customize the Reply-To Email address</p>
<input  name="reply_to"
              value={reply_to}
              onChange={onChange}  placeholder="[DEFAULT_REPLY_TO]" class="border-2 outline-none focus:ring-2 focus:ring-blue-400 bg-white p-2  w-full  rounded" type="text" />
<p class=" mt-2 mb-4 text-xs text-gray-600">Enter the email addresss where you want to receive replies from  your contacts.
</p>
</>)}
{advanced &&(<button class="focus:outline-none text-blue-600" onClick={()=>setadvanced(false)}>Hide Advanced Options <i class="fas fa-arrow-up"></i></button>)}
<br/>
<div class="float-right">
{loading && (<button className={"animate-pulse  my-4 py-4 px-3 "} >Loading...</button>)}

<button onClick={(e)=>Create_campaign("quit")} class="bg-gray-100  m-4 text-1xl rounded-lg font-semibold  border-2 border-gray-300 py-2 px-4 focus:outline-none focus:bg-blue-100 focus:border-blue-200 focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 ...">Save & Quit</button> 
<button                 onClick={(e)=>Create_campaign("next")} class="bg-blue-400 m-4 text-white text-1xl rounded-lg                     e.preventDefault();
                  setOpenTab(2);font-semibold  border-2 border-gray-300 py-2 px-4 focus:outline-none focus:border-blue-200 focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 ...">Next Step <i class="fas fa-arrow-right"></i></button>
</div>

                  
                  </div>
                  </div>
                  </div>
                  <div className={openTab === 2 ? "block" : "hidden"} id="link2">
<div>
  <div class="sticky top-0 ...">Sticky Heading 1</div>
  <p class="py-4">Quisque cursus...</p>
</div>
<div>
  <div class="sticky top-0 ...">Sticky Heading 2</div>
  <p class="py-4">Integer lacinia...</p>
</div>
<div>
  <div class="sticky top-0 ...">Sticky Heading 3</div>
  <p class="py-4">Nullam mauris...</p>
</div>
                  </div>
                  <div className={openTab === 3 ? "block" : "hidden"} id="link3">

                  <div class="container mx-auto flex flex-col w-3/5 m-4">
        <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <Selecttag />
                  <div class="float-right mr-4">
          <button  class="bg-gray-100  m-4 text-1xl rounded-lg font-semibold  border-2 border-gray-300 py-2 px-4 focus:outline-none focus:bg-blue-100 focus:border-blue-200 focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 ...">Save & Quit</button> 
<button onClick={()=> setOpenTab(4)} class="bg-blue-400 m-4 text-white text-1xl rounded-lg   e.preventDefault();  setOpenTab(2);font-semibold  border-2 border-gray-300 py-2 px-4 focus:outline-none focus:border-blue-200 focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 ...">
    Next Step <i class="fas fa-arrow-right"></i></button>
    </div>
        </div>

      </div>
                  </div>
                  <div className={openTab === 4 ? "block" : "hidden"} id="link4">
                  <div class="container mx-auto flex flex-col w-3/5 m-4">
        <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div class="border-b border-gray-200 sm:rounded-lg ">
            {current_campaign && current_campaign_email && selected_tags.length>0 &&
                    (<>
                    
                      <center>
                      <p class="text-2xl p-4">Your Campaign is ready to be sent!</p>
                    <p class="text-xl p-4">Review the report below before sending your campaign</p>
                      </center>

                    <div class="border border-gray-300 rounded-lg...">
                    <p class="p-3 border border-gray-300 bg-gray-100"><i class="fas fa-check-circle text-green-400"></i>  Setup <span class="float-right"> <button onClick={()=> setOpenTab(1)} class="focus:outline-none">Return to this step</button></span></p>
<div class="m-3">
<p class="p-2"> Subject : {current_campaign_email.message.subject}</p>
                    <p class="p-2"> From : {current_campaign_email.from_email}</p>
</div>


                    <p class="p-3 my-4 border border-gray-300 bg-gray-100"><i class="fas fa-check-circle text-green-400"></i>  Design <span class="float-right"> <button onClick={()=> setOpenTab(2)} class="focus:outline-none">Return to this step</button></span></p>

<p class="p-3 border border-gray-300 bg-gray-100"><i class="fas fa-check-circle text-green-400"></i>  Recipients     <span class="text-sm ml-6">Total number of recipients: {selected_tags.length} </span> <span class="float-right"> <button onClick={()=> setOpenTab(3)} class="focus:outline-none">Return to this step</button></span></p>
<div class="m-3">
<p class="p-2"> Tag List : {selected_tags.map((data,i) => {return (<>{data.tag_name}{i!==selected_tags.length-1 && (<>, </>)}</>)})}
                  </p>
</div>
                    </div>
                    </>)
                    }
{!current_campaign ||  !current_campaign_email || !selected_tags.length>0 &&(<>no data</>)}


                    </div>
                    <div class="float-right mr-4">
          <button  class="bg-gray-100  m-4 text-1xl rounded-lg font-semibold  border-2 border-gray-300 py-2 px-4 focus:outline-none focus:bg-blue-100 focus:border-blue-200 focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 ...">Save & Quit</button> 
<button onClick={() => setShowModal(true)} class="bg-gray-100  m-4 text-1xl rounded-lg font-semibold  border-2 border-gray-300 py-2 px-4 focus:outline-none focus:bg-blue-100 focus:border-blue-200 focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 ...">
    Send a test </button>
    <button onClick={() => setShowModal(true)} class="bg-blue-400 m-4 text-white text-1xl rounded-lg   e.preventDefault();  setOpenTab(2);font-semibold  border-2 border-gray-300 py-2 px-4 focus:outline-none focus:border-blue-200 focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 ...">
    Schedule </button>

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
      </>
    );
}

const mapStateToProps = state => {
  return {
    campaign: state.campaign.campaigns,
    loading: state.campaign.loading,
    success_campaign: state.campaign.success_campaign,
    current_campaign: state.campaign.current_campaign,
    current_campaign_email: state.campaign.current_campaign_email,
    selected_tags: state.campaign.selected_tags,
    save_quit_route:state.campaign.save_quit_route



  }
}

const mapDispatchToProps = dispatch =>{
  return {
    createCampaign:(data,i)=>dispatch(createCampaign(data,i)),
    set_success_campaign:()=>dispatch(set_success_campaign()),
    set_save_quit_route:()=>dispatch(set_save_quit_route()),
    clear_current_campaign:()=>dispatch(clear_current_campaign())

    

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Createcampaign)
