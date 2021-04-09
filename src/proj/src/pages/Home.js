import React from 'react'
import { ImHome } from "react-icons/im";
import Addcustomer from '../components/modals/addcustomer';
import { connect } from 'react-redux'
import { loadUser } from '../redux'

function Home({loadUser,user}) {
    React.useEffect(() => {
        loadUser()
      }, []);
    return (
        <div class="flex h-full  justify-center font-serif ">
            <div class="flex flex-col">
                
                <div class="my-6">
                    <p class="text-3xl">High Five, Ramesh</p>
                    <p class="text-1xl text-gray-400 mt-2">Here are the things, you should do first with gozen reach.</p>
                </div>
            <div class="flex flex-wrap bg-white py-4 px-8 my-2 rounded-lg" >

                <div class="p-4 rounded-full bg-gray-200">
                    <ImHome class="text-blue-300  text-6xl" />
                </div >
                <div class="px-8 py-4">
                    
                    <p class="text-2xl">Start by conecting your store</p>
                    <p class="">Seamlessly surfaces customer data and enable better customer experiences</p>
                </div>
                <div class="p-4 " >
                    <button class="bg-gray-100  rounded-md text-1xl text-gray-500    border-2 border-gray-300 py-2 px-4 focus:outline-none focus:bg-blue-100 focus:border-blue-200 focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 ..." >
                        Connect
</button>
                </div>

            </div>

            <div class="flex flex-wrap bg-white py-4 px-8 my-2 rounded-lg" >

                <div class="p-4 rounded-full bg-gray-200">
                    <ImHome class="text-blue-300  text-6xl" />
                </div >
                <div class="px-8 py-4">
                    <p class="text-2xl font-serif ">Lets bring in your customer base</p>
                    <p class=" font-serif">IN Gozenreach, you can import or setup optinly to your website to get leads</p>
                </div>
                <div class="p-4  ">
                    <Addcustomer />

                </div>

            </div>
            <div class="flex flex-row bg-white py-4 px-8 my-2 rounded-lg" >

                <div class="p-4 rounded-full bg-gray-200">
                    <ImHome class="text-blue-300  text-6xl" />
                </div >
                <div class=" px-8 py-4">
                    <p class="text-2xl">Invite your team</p>
                    <p class="">Let invite your team to gozen reach</p>
                </div>
                <div class="p-4 " >
                    <button class="md:ml-48 bg-gray-100  rounded-md text-1xl text-gray-500    border-2 border-gray-300 py-2 px-4 focus:outline-none focus:bg-blue-100 focus:border-blue-200 focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 ..." >
                        Invite members
</button>
                </div>

            </div>            <div class="flex flex-wrap bg-white py-4 px-8 my-2 rounded-lg" >

<div class="p-4 rounded-full bg-gray-200">
    <ImHome class="text-blue-300  text-6xl" />
</div >
<div class=" px-8 py-4">
    <p class="text-2xl">Sync your Email</p>
    <p class="">Start your campaign response without leaving gozen reach</p>
</div>
<div class="p-4 " >
    <button class="md:ml-8 bg-gray-100  rounded-md text-1xl text-gray-500    border-2 border-gray-300 py-2 px-4 focus:outline-none focus:bg-blue-100 focus:border-blue-200 focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 ..." >
        Add email address
</button>
</div>

</div>            <div class="flex flex-wrap bg-white py-4 px-8 my-2 rounded-lg" >

<div class="p-4 rounded-full bg-gray-200">
    <ImHome class="text-blue-300  text-6xl" />
</div >
<div class=" px-8 py-4">
    <p class="text-2xl">Customize</p>
    <p class="">We enable you to customize gozen reach as per your need</p>
</div>
<div class="p-4 " >
    <button class=" md:ml-20 bg-gray-100  rounded-md text-1xl text-gray-500    border-2 border-gray-300 py-2 px-4 focus:outline-none focus:bg-blue-100 focus:border-blue-200 focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 ..." >
        Customize
</button>
</div>

</div>
            

            </div>

        </div>
    )
}



const mapDispatchToProps = dispatch => {
    return {
        loadUser: () => dispatch(loadUser()),  
    }
  }
  const mapStateToProps = state => {
    return {
      user: state.user.user,
  
    }
  }
  export default connect(
    mapStateToProps, mapDispatchToProps,
  )(Home)