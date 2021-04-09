import React, { useEffect } from 'react'
import { ImHome } from "react-icons/im";
import { IoIosCopy } from "react-icons/io";
import { IoIosJournal } from "react-icons/io";
import { TiTick } from "react-icons/ti";
import { ImCloudUpload } from "react-icons/im";
import Csvselectcolumn from './csvselectcolumn'
import {useHistory} from 'react-router-dom';

import { connect } from 'react-redux'
import { csvUpload, getSampleData, findEmailCol, setAttributesValue, createTag, gettags, mapcsv } from '../../redux'

import { CSVLink } from "react-csv";

import { ToastProvider, useToasts } from 'react-toast-notifications'



function Addcustomer({ loading,upload,mapped, success, getsampledata, action_uuid, sampledata, findEmail, emailCol, attributes, emailcol, mapbuttonn, createtag, gettags, tags_id, mapcsv }) {
  const { addToast } = useToasts()
  let history = useHistory();


  const data = [
    { firstName: "Warren", lastName: "Morrow", email: "sokyt@mailinator.com", age: "36" },
    { firstName: "Gwendolyn", lastName: "Galloway", email: "weciz@mailinator.com", age: "76" },
    { firstName: "Astra", lastName: "Wyatt", email: "quvyn@mailinator.com", age: "57" },
    { firstName: "Jasmine", lastName: "Wong", email: "toxazoc@mailinator.com", age: "42" },
    { firstName: "Brooke", lastName: "Mcconnell", email: "vyry@mailinator.com", age: "56" },
    { firstName: "Christen", lastName: "Haney", email: "pagevolal@mailinator.com", age: "23" },
    { firstName: "Tate", lastName: "Vega", email: "dycubo@mailinator.com", age: "87" },
    { firstName: "Amber", lastName: "Brady", email: "vyconixy@mailinator.com", age: "78" },
    { firstName: "Philip", lastName: "Whitfield", email: "velyfi@mailinator.com", age: "22" },
    { firstName: "Kitra", lastName: "Hammond", email: "fiwiloqu@mailinator.com", age: "35" },
    { firstName: "Charity", lastName: "Mathews", email: "fubigonero@mailinator.com", age: "63" }
  ];
  
  const csvreport = {
    data: data,
    filename: 'Sample.csv'
  };

  const [showModal, setShowModal] = React.useState(false);
  const [importModal, setimportModal] = React.useState(false);

  const [import_type, setimporttypeModal] = React.useState(true);
  const [source, setsourceModal] = React.useState(false);
  const [mapfields, setmapfieldsModal] = React.useState(false);
  const [tagfields, settagfieldsModal] = React.useState(false);
  const [status, setstatus] = React.useState("SUBSCRIBED");


  const [mapbutton, setmapbutton] = React.useState(mapbuttonn);

  useEffect(() => {
    if(mapped){
      setimportModal(false)
      addToast("Mapped Successfully", { appearance: 'success' })
      history.push('/')
    }
  }, [mapped]);


  const [tags, settags] = React.useState([]);
  const [file, setFile] = React.useState(null);
  const [invalid_file, setinvalid_file] = React.useState(false);

  const [module, setmodule] = React.useState();
  const validTypes = ['text/csv'];

  const inputFile = React.useRef(null)
  const onButtonClick = (event) => {
    // `current` points to the mounted file input element
    inputFile.current.click();
    //  var file = event.target.files[0];
  };

  const preventDefault = (e) => {
    e.preventDefault();
    // e.stopPropagation();
}

  const dragOver = (e) => {
    preventDefault(e);
}

const dragEnter = (e) => {
    preventDefault(e);
}

const dragLeave = (e) => {
    preventDefault(e);
}

  const fileDrop = (e) => {
    preventDefault(e);
    const files = e.dataTransfer.files;
    if (files.length) {
      console.log(files[0].type);
      if (validTypes.indexOf(files[0].type) === -1) {
        setinvalid_file(true)
    }
    else{
      setinvalid_file(false)
      setFile(files[0])
    }
    }
  };
  function handle_file(e){
    if (validTypes.indexOf(e.type) === -1) {
        setinvalid_file(true)
    }else{
      setinvalid_file(false)
      setFile(e)
    }
  }

  

  useEffect(() => {
    if (sampledata) {
      setmapbutton(false)
    }
  }, [mapbutton]);



  function upload_file(file) {
  
    upload(file);
    console.log(sampledata);
    if (sampledata) {
      setimporttypeModal(false)
      setsourceModal(false)
      setmapfieldsModal(true)
      settagfieldsModal(false)
    }

  }

  function importshow() {
    setShowModal(false)
    setimportModal(true)
  }
  function stepsshow(data) {
    if (data === "importtype") {
      setimporttypeModal(true)
      setsourceModal(false)
      setmapfieldsModal(false)
      settagfieldsModal(false)
    }
    if (data === "source") {
      setimporttypeModal(false)
      setsourceModal(true)
      setmapfieldsModal(false)
      settagfieldsModal(false)

    }
    if (data === "mapfields") {
      setimporttypeModal(false)
      setsourceModal(false)
      setmapfieldsModal(true)
      settagfieldsModal(false)

    }
    if (data === "tagfields") {
      setimporttypeModal(false)
      setsourceModal(false)
      setmapfieldsModal(false)
      settagfieldsModal(true)

    }
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
  function removeTag(i) {
    let newTags = [...tags]
    newTags.splice(i, 1);
    settags(newTags)
  }

  function mapcolumns() {
    let column = {};
    console.log(tags_id);
    Object.keys(attributes).map(attribute => {
      column[attribute] = attributes[attribute].value;
    });
    let params = { action_uuid: action_uuid, columns: column, contact_status: status, tags: tags }
    mapcsv(params)

  }
  return (
    <div>
      <button onClick={() => setShowModal(true)} class="bg-gray-100 float-right rounded-md text-1xl text-gray-500    border-2 border-gray-300 py-2 px-4 focus:outline-none focus:bg-blue-100 focus:border-blue-200 focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 ..." >
        Start
        </button>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none "

          >
            <div className="relative  my-6 mx-auto w-full ">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg h-screen   relative flex flex-col w-full bg-white outline-none focus:outline-none overflow-hidden">
                {/*header*/}
                {/* <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    modal title
                  </h3>
                  <button
                    className="p-1 ml-auto  border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div> */}
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <button
                    className="py-2 px-4 ml-auto rounded-full border boeder-gray-300 text-gray-400  float-right text-4xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    ×
                  </button>

                  <div class="flex h-screen mt-20 h justify-center font-serif">
                    <div class="flex flex-col">
                      <div class="my-6">
                        <p class="text-6xl">🚀</p>
                        <p class="text-3xl">How would you like to bring in your customers</p>
                        <p class="text-1xl text-gray-400 mt-2">In Gozenreach, you can import contacts via csv an gmail and setup optinly to your website to get your leads</p>
                      </div>
                      <div class="flex flex-wrap bg-white border border-gray-300 p-4 my-2 rounded-lg" >

                        <div class="p-4 rounded-full bg-gray-200">
                          <ImHome class="text-blue-300  text-6xl" />
                        </div >
                        <div class="p-4">
                          <p class="text-2xl">Set up optinly</p>
                          <p class="">Build website Popups to Engage Visitors and Monetize Traffic</p>
                        </div>
                        <div class="p-4 " >
                          <button class="bg-gray-100  rounded-md text-1xl text-gray-500    border-2 border-gray-300 py-2 px-4 focus:outline-none focus:bg-blue-100 focus:border-blue-200 focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 ..." >
                            Open
</button>
                        </div>

                      </div>
                      <div class="flex flex-wrap bg-white border border-gray-300 p-4 my-2 rounded-lg" >

                        <div class="p-4 rounded-full bg-gray-200">
                          <ImHome class="text-blue-300  text-6xl" />
                        </div >
                        <div class="p-4">

                          <p class="text-2xl">Import data</p>
                          <p class="">Bring in your customer via csv or gmail.</p>
                        </div>
                        <div class="ml-36 p-4" >

                          <button onClick={() => importshow()} class="bg-gray-100 rounded-md text-1xl text-gray-500    border-2 border-gray-300 py-2 px-4 focus:outline-none focus:bg-blue-100 focus:border-blue-200 focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 ..." >
                            Start
</button>


                        </div>

                      </div>
                    </div>
                  </div>
                </div>
                {/*footer*/}
                {/* <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    style={{ transition: "all .15s ease" }}
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    style={{ transition: "all .15s ease" }}
                    onClick={() => setShowModal(false)}
                  >
                    Save Changes
                  </button>
                </div> */}
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : importModal ? (

        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"

          >
            <div className="relative w-full ">
              <div className="border-0 rounded-lg shadow-lg h-screen   relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="relative  flex-auto">

                  <div class="flex h-full w-full ">
                    <div class="w-1/4 bg-gray-100 ">
                      <div class="flex w-full h-full justify-center">

                        <div class="flex flex-col ...">
                          <div class=" mt-20">
                            <p class="font-semibold text-3xl">IMPORT</p>
                            <p class="text-gray-600 my-2 text-2xl">Complete all following steps</p>
                          </div>

                          <button onClick={() => stepsshow("importtype")} class="group my-4 py-2 text-left bg-white px-8 text-1xl rounded font-semibold  border border-gray-300 focus:border-gray-300 " >
                            <span class="rounded-full py-1 px-2 group-focus:bg-blue-500 group-focus:text-white"> 1</span> &nbsp;Import type
</button>
                          <button onClick={() => stepsshow("source")} class="group my-4 py-2 text-left bg-white px-8 text-1xl rounded font-semibold  border border-gray-300 focus:border-gray-300 " >
                            <span class="rounded-full py-1 px-2 group-focus:bg-blue-500 group-focus:text-white"> 2</span> &nbsp;Source
</button>
                          <button onClick={() => stepsshow("mapfields")} class="group my-4 py-2 text-left bg-white px-8 text-1xl rounded font-semibold  border border-gray-300 focus:border-gray-300 " >
                            <span class="rounded-full py-1 px-2 group-focus:bg-blue-500 group-focus:text-white"> 3</span> &nbsp;Map Fields
</button>
                          <button onClick={() => stepsshow("tagfields")} class="group my-4 py-2 text-left bg-white px-8 text-1xl rounded font-semibold  border border-gray-300 focus:border-gray-300 " >
                            <span class="rounded-full py-1 px-2 group-focus:bg-blue-500 group-focus:text-white"> 4</span> &nbsp;Tags
</button>
                          <div>



                          </div>
                        </div>
                      </div>

                    </div>
                    <div class="w-3/4">
                      {import_type && (<>
                        <div class="m-16 p-8">
                          <button
                            className="py-2 px-4 ml-auto rounded-full border boeder-gray-300 text-gray-400  float-right text-4xl leading-none font-semibold outline-none focus:outline-none"
                            onClick={() => setimportModal(false)}
                          >
                            ×
                  </button>
                          <p class="text-3xl py-4">Select an Module you'd like to import</p>
                          <p class="text-gray-600">In Gozenreach, Modules are data types used to organize your info. Common objects are contacts, companies</p>
                          <div class="flex w-full">
                            <div class=" w-1/3 ">
                              {module && (<button class="group my-8 p-6 rounded-lg border border-blue-900 focus:border-blue-900 w-full text-left">
                                <TiTick class="rounded-full text-2xl bg-green-400 border border-gray-500 text-white float-right group-focus:bg-green-400" />

                                <IoIosCopy class="text-blue-300 text-5xl" />

                                <p class=" text-2xl font-semibold py-4">Contacts</p>
                                <p class="text-xl">The People you work with commonly called leads or customers</p>
                              </button>)}
                              {!module && (<button onClick={() => setmodule(true)} class="group my-8 p-6 rounded-lg border border-gray-200 focus:border-blue-900 w-full text-left">
                                <TiTick class="rounded-full text-2xl border border-gray-500 text-white float-right group-focus:bg-green-400" />

                                <IoIosCopy class="text-blue-300 text-5xl" />

                                <p class=" text-2xl font-semibold py-4">Contacts</p>
                                <p class="text-xl">The People you work with commonly called leads or customers</p>
                              </button>)}


                            </div>
                            <div class="w-1/3">
                              <button class="group m-8 p-6 rounded-lg border border-gray-200 focus:border-blue-900 w-full text-left">
                                <TiTick class="rounded-full text-2xl border border-gray-500 text-white float-right group-focus:bg-green-400" />

                                <IoIosJournal class="text-blue-300 text-5xl" />

                                <p class=" text-2xl font-semibold py-4">Companies</p>
                                <p class="text-xl">The Business you work with, which are calles accounts or organization.</p>
                              </button>
                            </div>
                          </div>
                        </div>

                      </>)}
                      {source && (<>
                        <div class="m-16 p-8">
                          <button
                            className="py-2 px-4 ml-auto rounded-full border boeder-gray-300 text-gray-400  float-right text-4xl leading-none font-semibold outline-none focus:outline-none"
                            onClick={() => setimportModal(false)}
                          >
                            ×
                  </button>
                          <p class="text-4xl font-semibold py-4">Where would you like to import from?</p>
                          <p class="text-gray-600 text-2xl">Before you upload your files below, make your file is ready to be imported</p>


                          <div class="mt-8">
                            <p class="text-2xl  text-gray-700">Choose from where would you like to import from :</p>
                            <div class="mt-4">
                              <label class="inline-flex items-center">
                                <input type="radio" class="form-radio" name="accountType" value="personal" checked />
                                <span class="text-xl font-semibold ml-2">CSV file</span>
                              </label>

                            </div>
                          </div>
                          <div 
                                              onDragOver={dragOver}
                                              onDragEnter={dragEnter}
                                              onDragLeave={dragLeave}
                                              onDrop={fileDrop}
                     class="w-2/3 flex items-center rounded-md border-2 border-gray-400 border-dashed justify-center p-20 my-8 bg-gray-100">
                            <ImCloudUpload class="text-gray-500 text-3xl float-left mx-6 mb-2" />

                            <div>

                              
                              <p class="text-xl font-semibold">Drag and drop or <span class=" font-semibold text-blue-600">
                                <input type='file' onChange={e => handle_file(e.target.files[0])} id='file' ref={inputFile} style={{ display: 'none' }} />
                                <button class="text-xl focus:outline-none font-semibold" onClick={onButtonClick}>choose a file  </button>
                              </span>   to upload your data</p>
                              <p class="px-4 py-2 text-xl text-gray-400">All .csv, .xlsx,  and .xls files types are supported</p>

                              <center><p class="text-xl"> Download : <span class="font-semibold text-blue-600"><CSVLink {...csvreport}>Sample CSV</CSVLink></span></p></center>
                             
                            </div>


                          </div>
                          {file && (<>{file.name}<br/></>)}
                          {invalid_file && (<><p>Invalid File</p><br/></>)}
                          {sampledata && !loading &&(<button class="mt-8 border-2 text-green-600 py-3 px-4 font-semibold" >Uploaded</button>)}
                          {file && !sampledata && !invalid_file && !loading &&(<button class="mt-8 border-2 text-green-600 py-3 px-4 font-semibold" onClick={() => upload_file(file)}>Upload</button>)}
                          {loading &&(<button class="animate-pulse mt-8 border-2 text-green-600 py-3 px-4 font-semibold" >Uploading ...</button>)}



                        </div>
                      </>)}

                      {mapfields && (<div class="m-16 p-8">
                        {sampledata ? (                    
                              <div class="flex flex-wrap  gap-8  justify-center">

{Object.keys(sampledata).map((col, idx) => {
  return (

    <Csvselectcolumn
      selection={true}
      colIdx={idx}
      colName={col}
      cols={sampledata[col]}
      emailCol={emailcol === idx ? true : false}
      attributes={attributes}
    />


  );
})}
<br />
{/* <button
className="btn btn-primary btn-small blue darken-2 white-text"
onClick={() => nextStep()}
>
Next
</button> */}
</div>) : (<>Import data first</>) }

                        
                      </div>)}

                      {tagfields && (<>
                        <div class="m-16 p-8">
                          <button
                            className="py-2 px-4 ml-auto rounded-full border boeder-gray-300 text-gray-400  float-right text-4xl leading-none font-semibold outline-none focus:outline-none"
                            onClick={() => setimportModal(false)}
                          >
                            ×
                  </button>
                          <p class="text-4xl font-semibold py-4">Confirm</p>
                          <p class="text-gray-600 text-2xl">Upload your Contacts file with a header row. Make sure the file has columns for all the required fields on Contacts.</p>

                          <p class="text-3xl mt-12 mb-8">100+ Contacts are ready to import</p>

                          <p class="text-xl font-semibold">Tags</p>

                          <div className="border-2 rounded border-black flex-wrap mt-4">
                            <ul className=" flex inline">
                              {tags.map((tag, i) => (
                                <li class="flex px-2 items-center justify-center" key={tag}>
                                  <span class="bg-gray-200 py-1 px-2 rounded-l">{tag}</span>
                                  <button class="bg-gray-300 py-1 border-none px-2 rounded-r border-blue-300" type="button" onClick={() => removeTag(i)}>×</button>
                                </li>
                              ))}
                              <li className="flex-grow">
                                <input type="text" class="w-full p-2" onKeyDown={inputKeyDown} /></li>
                            </ul>
                          </div>
                          <div class="mt-6">
                          <label class="inline-flex items-center">
                                <input onChange={e => setstatus("SUBSCRIBED")} type="radio" class="form-radio" name="accountType" value="personal"  />
                                <span class="text-xl font-semibold ml-2">Subscribed</span>
                              </label>
                              <label class="inline-flex items-center px-4">
                                <input onChange={e => setstatus("UNSUBSCRIBED")} type="radio" class="form-radio" name="accountType" value="personal" />
                                <span class="text-xl font-semibold ml-2">Unsubscribed</span>
                              </label>
                              </div>
                          {tags.length > 0 && (<button onClick={() => mapcolumns()} class="mt-8 border-2 p-4 font-semibold">Map Columns</button>)}

                        </div>
                      </>)}

                    </div>
                  </div>
                </div>
              </div>
            </div></div>

        </>) : null}

    </div>
  )
}


const mapDispatchToProps = dispatch => {
  return {
    upload: (Data) => dispatch(csvUpload(Data)),
    getsampledata: (Data) => dispatch(getSampleData(Data)),
    findEmail: (Data) => dispatch(findEmailCol(Data)),
    setattribute: (Data) => dispatch(setAttributesValue(Data)),
    createtag: (Data) => dispatch(createTag(Data)),
    mapcsv: (Data) => dispatch(mapcsv(Data)),
    gettags: () => dispatch(gettags())


  }
}
const mapStateToProps = state => {
  return {
    success: state.csvupload.success,
    action_uuid: state.csvupload.action_uuid,
    sampledata: state.csvupload.sampleData,
    emailcol: state.csvupload.emailCol,
    attributes: state.csvupload.attributes,
    mapbuttonn: state.csvupload.mapbutton,
    tags_id: state.tags.tags,
    mapped: state.csvupload.mapped,
    loading: state.csvupload.loading

  }
}
export default connect(
  mapStateToProps, mapDispatchToProps,
)(Addcustomer)