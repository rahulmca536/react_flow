import React, { useState } from 'react';
import Dropdown from './Dropdown';
import { connect } from 'react-redux'
import { success_false,clear_error,filterContact,addTagContact,contactBulkDelete,getContactByid,updateContact,get_contact,selectContact,deselectContact,del_contact,gettags,createcontact,selectAllContacts,deselectAllContacts} from '../redux'


const Multiselect = ({current,getContactByid,current_contact,selected,tags,handleChange,remove_selected_tag}) => {

    React.useEffect(() => {
        // getContactByid(current)
      },[]);

    // state showing if dropdown is open or closed
    const [dropdown, setDropdown] = useState(false);
    // managing dropdown items (list of dropdown items)
    const [items, setItems] = useState(tags);


    
    // contains selected items
    let existing_tag_data=[]
    if(current_contact && current_contact.length>0){
        for(let i=0;i<current_contact.tag.length;i++){
            let sample=tags.filter(e=>e.tag_uuid===current_contact.tag[i])
            console.log(current_contact.tag);
             existing_tag_data.concat(sample[0])
        }
    }

    const [selectedItems, setSelected] = useState(existing_tag_data);

console.log(selectedItems);
    const toogleDropdown = () => {
        setDropdown(!dropdown)
    };
    // adds new item to multiselect 
    const addTag = (item) => {

        setSelected(selectedItems.concat(item));
        setDropdown(false);
        handleChange(item.tag_uuid)

    };
    // removes item from multiselect
    const removeTag = (item) => {
        const filtered = selectedItems.filter((e) => e.tag_uuid !== item);
        setSelected(filtered);
        remove_selected_tag(item)
    }

    const handlesearch = (data) =>{
        setDropdown(true)
        let search_data = data.target.value
        const results = tags.filter(item =>
            item.tag_name.includes(search_data)
          );
          setItems(results)
      }
      
    return (<div className="autcomplete-wrapper">
        <div className="autcomplete">
        <div className="w-full flex flex-col items-center mx-auto">
        {
                            selectedItems.map((tag, index) => {
                                return (
                                    <div key={index} className="flex justify-center items-center m-1 font-medium py-1 px-2 bg-white rounded-full text-teal-700 bg-teal-100 border border-teal-300 ">
                                            <div className="text-xs font-normal leading-none max-w-full flex-initial">{ tag.tag_name }</div>
                                            <div className="flex flex-auto flex-row-reverse">
                                                <div onClick={() => removeTag(tag.tag_uuid)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
                                                    className="feather feather-x cursor-pointer hover:text-teal-400 rounded-full w-4 h-4 ml-2">
                                                        <line x1="18" y1="6" x2="6" y2="18"></line>
                                                        <line x1="6" y1="6" x2="18" y2="18"></line>
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>)
                            })
                        }
    <div className="w-full">
        <div className="flex flex-col items-center relative">
            <div className="w-full ">
                <div className="my-2 p-1 flex border border-gray-200 bg-white rounded ">
                    <div className="flex flex-auto flex-wrap">

                        <div className="flex-1">
                            <input placeholder="Type to search Tag" onClick={toogleDropdown} onChange={handlesearch}  className="bg-transparent p-1 px-2 appearance-none outline-none h-full w-full text-gray-800"/>
                        </div>
                    </div>
                    <div className="text-gray-300 w-8 py-1 pl-2 pr-1 border-l flex items-center border-gray-200" onClick={toogleDropdown}>
                        <button className="cursor-pointer w-6 h-6 text-gray-600 outline-none focus:outline-none">
                            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-up w-4 h-4">
                                <polyline points="18 15 12 9 6 15"></polyline>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
         { dropdown  ? <Dropdown list={items} addItem={addTag}></Dropdown>: null }
    </div>
</div>

    </div>
        </div>)
};




const mapDispatchToProps = dispatch => {
    return {
      getContactByid:(data)=>dispatch(getContactByid(data)),
    }
  }
  const mapStateToProps = state => {
    return {
      current_contact: state.contact.current_contact,
    }
  }   
  export default connect(
    mapStateToProps, mapDispatchToProps,
  )(Multiselect)