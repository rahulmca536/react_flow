import React from 'react';

const Tag_table_data = ({data,selectAlltags,selecttag,deselecttag})=>{
  const {tag_uuid, tag_name, tag_type,} = data;

    const [check_state, setCheck_state] = React.useState(false);
    React.useEffect(() => {
        setCheck_state(selectAlltags);
      }, [selectAlltags]);
      const onClick = e => {
        if (!check_state) {
            selecttag(data);
        } else {
            deselecttag(tag_uuid);
        }
        setCheck_state(!check_state);
      };

    return(
        <tr>

        <td class="pl-4 whitespace-nowrap">
        <div class="flex justify-center">
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
        </div>
        
                </td>
        
                                <td class="px-6 py-4 whitespace-nowrap ">
                                  <div class="flex justify-center">
        
        
                                    <div class="text-sm font-medium text-gray-900">
                                      {tag_name}
                                    </div>
                                  </div>
                                </td>
        
                                <td class="px-6 py-4 whitespace-nowrap ">
                                  <div class="flex justify-center">
        
        
                                    <div class="text-sm font-medium text-gray-900">
                                      {tag_type}
                                    </div>
                                  </div>
                                </td>
        
                                <td class="px-6 py-4 whitespace-nowrap ">
                                  <div class="flex justify-center">
        
        
                                    <div class="text-sm font-medium text-gray-900">
                                      {tag_name}
                                    </div>
                                  </div>
                                </td>
        
        
                              </tr>
    )
}
export default Tag_table_data;
