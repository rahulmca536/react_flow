import React from 'react'
import { connect } from 'react-redux'
import { filterTag,gettags,selectAlltags,deselectAlltags,selecttag,deselecttag} from '../../redux'
import { CgArrowsV } from "react-icons/cg";
import Tag_table_data from './tag_table_data';

export const Selecttag = ({openTab,filterTag,gettags,tags_data,selectAlltags,deselectAlltags,selecttag,deselecttag,selected_tags}) => {

    const [limit, setlimit] = React.useState(10);
    const [page, setpage] = React.useState(1);
    const [order, setorder] = React.useState(0);
    const [sortby, setsortby] = React.useState("tag_name");


    const [check_state, setCheckState] = React.useState(false);
    const [searchdata, setsearchdata] = React.useState();


    const onClick_checkbox = e => {
        if (!check_state) {
            selectAlltags(tags_data);
        } else {
            deselectAlltags();
        }
        setCheckState(!check_state);
      };

      const onChange = e =>
      setsearchdata(e.target.value);

function search(){
    if(searchdata){
        filterTag(searchdata)

    }else{
        gettags({"limit":limit,"page":page,"sortBy":sortby,"orderBy":order})
    }
}
function orderBy(){
    console.log("orderby");
    if(order ===0){
        gettags({"limit":limit,"page":page,"sortBy":sortby,"orderBy":1})
        setorder(1)
    }else{
        gettags({"limit":limit,"page":page,"sortBy":sortby,"orderBy":0})
        setorder(0)
    }
}

    React.useEffect(() => {
        if (!tags_data || tags_data.length === 0) {
          gettags({"limit":limit,"page":page,"sortBy":sortby,"orderBy":order})
        }
      }, []);
      
    return (


          <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">


            <div class="bg-white h-20 ml-6">
                <p > <span class="mt-6 mr-10 inline-block align-middle float-right">Selected tags: {selected_tags.length}
                </span>
                <div class="flex ">
  <input onChange={onChange} class=" border-2 rounded-l-lg border-gray-400 p-2 focus:outline-none" type="text" placeholder="Search..." />
  <button onClick={()=>search()}  class="bg-gray-300 rounded-r-lg border-grey border-l shadow hover:bg-grey-lightest focus:outline-none">
    <span class="w-auto flex justify-end items-center text-grey p-4 hover:text-grey-darkest">
    <i class="fas fa-search"></i>
    </span>
  </button>
</div>



</p>
</div>  


              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>

                  <th scope="col" class="pl-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
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

                    <th  scope="col" class="px-6 py-3  ">
                        <button onClick={()=>orderBy()} class="focus:outline-none text-xs font-medium text-gray-500 uppercase tracking-wider ">Tag Name < CgArrowsV class="inline text-xs" /></button>
                      
                    </th>
                    <th  scope="col" class="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tag Type
                    </th>
                    <th  scope="col" class="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider">
                     No of Contacts
                    </th>

                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200  ">


                  {tags_data.map(data => {
                    return (
<Tag_table_data
    data={data}
    selectAlltags={check_state}
    selecttag={selecttag}
    deselecttag={deselecttag} />
                    );
                  })}
                </tbody>
              </table>

            </div>
          </div>


    )
}

const mapStateToProps = state => {
    return{
        tags_data: state.tags.tags_id,
        selected_tags:state.campaign.selected_tags
    }
    }
    

const mapDispatchToProps =dispatch=> {
    return{
        gettags: (data) => dispatch(gettags(data)),
        selectAlltags:(data)=>dispatch(selectAlltags(data)),
        deselectAlltags:()=>dispatch(deselectAlltags()),
        selecttag:(data)=>dispatch(selecttag(data)),
        deselecttag:(data)=>dispatch(deselecttag(data)),
        filterTag:(data)=>dispatch(filterTag(data)),

    }
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Selecttag)
