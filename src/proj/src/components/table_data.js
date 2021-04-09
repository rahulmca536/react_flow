import React from 'react';

const Table_data = ({data,edit,delete_contact,selectAll,selectContact,deselectContact})=>{
  const {contact_uuid, email_address, first_name, last_name, status} = data;

    const [check_state, setCheck_state] = React.useState(false);
    React.useEffect(() => {
        setCheck_state(selectAll);
      }, [selectAll]);
      const onClick = e => {
        if (!check_state) {
          selectContact(contact_uuid);
        } else {
          deselectContact(contact_uuid);
        }
        setCheck_state(!check_state);
      };

    return(
        <tr>
        <td class="pl-6 py-4 whitespace-nowrap">
        <p>
                  <label>
                    <input
                      type="checkbox"
                      onClick={onClick}
                      checked={check_state} 
                    />
                    <span></span>
                  </label>
                </p>
        </td>
      <td class="px-6 py-4 whitespace-nowrap">
        <div class="flex items-center">
  
          <div class="">
            <div class="text-sm font-medium text-gray-900">
              {data.first_name}
            </div>
  
          </div>
        </div>
      </td>
      <td class="px-6 py-4 whitespace-nowrap">
        <div class="flex items-center">
  
          <div class="ml-4">
            <div class="text-sm font-medium text-gray-900">
              {data.last_name}
            </div>
  
          </div>
        </div>
      </td>
      <td class="px-6 py-4 whitespace-nowrap">
        <div class="text-sm text-gray-900">{data.email_address}</div>
      </td>
          <td class="px-6 py-4 whitespace-nowrap">
        <div class="text-sm text-gray-900">{data.phone}</div>
      </td>
      <td class="px-6 py-4 whitespace-nowrap">
        <div class="text-sm text-gray-900">{data.status}</div>
      </td>
  
      <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
  
  
  
        <p class=" flex inline text-indigo-600 hover:text-indigo-900 ">
        {/* <span class="pr-2">Edit</span>  */}
        <button class="focus:outline-none" onClick={() => edit(data)} >Edit </button> 
        <button class="focus:outline-none pl-4" onClick={() => delete_contact(data.contact_uuid)} >Delete </button> </p>
  
      </td>
    </tr>
    )
}
export default Table_data;
