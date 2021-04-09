import React from 'react'
import { IoIosAddCircle } from "react-icons/io";
import { CgArrowsV } from "react-icons/cg";
import { connect } from 'react-redux'
import { getCampaigns } from '../../redux'
import {useHistory} from 'react-router-dom';



function Emailcompaign({getCampaigns,campaigns}) {
  let history = useHistory();

  React.useEffect(() => {
    if(campaigns && campaigns.length<1){
      getCampaigns()
    }
    
    
  }, []);

    return (

        <div class="p-3 ">
                  <div class="container-fluid mx-auto flex flex-col">
        <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <div class="bg-white h-20">
                <p > <span class="mt-6 mx-6 inline-block align-middle">Total Compaigns: </span>
                  <span class="float-right ">
                    <button onClick={()=>history.push("/createcampaign")}  class="bg-gray-100  mr-8 px-8 text-1xl rounded-lg font-semibold  border-2 border-gray-300 py-2 px-4 focus:outline-none focus:bg-blue-100 focus:border-blue-200 focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 ..." >
                      <IoIosAddCircle class="inline text-green-600 text-2xl" /> Create
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
                    <th  scope="col" class="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Campaign Name < CgArrowsV class="inline text-xs" />
                    </th>
                    <th  scope="col" class="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th  scope="col" class="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th  scope="col" class="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Clicks
                    </th>
                    <th  scope="col" class="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Opens
                    </th>
                    <th  scope="col" class="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Deliveries
                    </th>

                    <th scope="col" class="relative px-6 py-3">
                      <span class="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200  ">


                  {campaigns.map(data => {
                    return (
                      <tr>

                        <td class="px-6 py-4 whitespace-nowrap">
                          <div class="flex items-center justify-center">
                            <div class="text-sm font-medium text-gray-900">
                              <center>{data.campaign_name}</center>
                            </div>
                          </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap ">
                          <div class="flex items-center justify-center">
                            <div class="text-sm font-medium text-gray-900">
                              {data.campaign_type}
                            </div>
                          </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap ">
                          <div class="flex items-center justify-center">
                            <div class="text-sm font-medium text-gray-900">
                              {data.status}
                            </div>
                          </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap ">
                          <div class="flex items-center justify-center">
                            <div class="text-sm font-medium text-gray-900">
                              {data.clicks}
                            </div>
                          </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap ">
                          <div class="flex items-center justify-center">
                            <div class="text-sm font-medium text-gray-900">
                              {data.opens}
                            </div>
                          </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap ">
                          <div class="flex items-center justify-center">
                            <div class="text-sm font-medium text-gray-900">
                              {data.deliveries}
                            </div>
                          </div>
                        </td>
  


                        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">



                          <p class=" flex inline text-indigo-600 hover:text-indigo-900 ">

                            <button class="focus:outline-none"   >Edit </button>
                            <button class="focus:outline-none pl-4"  >Delete </button> </p>

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
        </div>
    )
}


const mapDispatchToProps = dispatch => {
  return {
    getCampaigns: () => dispatch(getCampaigns()),

  }
}
const mapStateToProps = state => {
  return {
    campaigns: state.campaign.campaigns,
  }
}
export default connect(
  mapStateToProps, mapDispatchToProps,
)(Emailcompaign)
