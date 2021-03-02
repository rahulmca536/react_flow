import React, { useEffect, useState } from 'react';
import { Dropdown, InputGroup, FormControl, Button, DropdownType, ButtonGroup } from 'react-bootstrap';
import { GrClose } from 'react-icons/gr';
import DatePicker from "react-datepicker";
import { connect } from 'react-redux'
import { fetchroute, fetchUsersSuccess,fetchtoggle} from '../redux'
import axios from 'axios'


import "react-datepicker/dist/react-datepicker.css";
const countryData = [
    {
        value: 'trigger_events', name: 'Trigger events',
        data: [{
            value: 'cart_total', name: 'Cart Total',
            data: [{ value: 'equal', name: 'is' }, { value: 'notEqual', name: 'is not' }, { value: 'greaterThan', name: 'greater than' }, { value: 'lessThanInclusive', name: 'less than' }]
        },
        {
            value: 'language', name: 'Language',
            data: [{ value: 'equal', name: 'is' }, { value: 'notEqual', name: 'is not' }, { value: 'contains', name: 'contains' }, { value: 'doesNotContain', name: 'does not contain' }]
        },
        { value: 'currency', name: 'Currency', data: [{ value: 'equal', name: 'is', data: [{ value: "₹ INR", name: "₹ INR" }] }] }
        ]
    },
    {
        value: 'customer_property', name: 'Customer property',
        data: [{ value: 'created_at', name: 'Created at', data: [{ value: 'equal', name: 'is', data: [] }, { value: 'notEqual', name: 'is not', data: [] }, { value: 'is_after', name: 'is after', data: [] }, { value: 'is_before', name: 'is_before', data: [] }] },
        { value: 'email', name: 'Email', data: [{ value: 'equal', name: 'is' }, { value: 'notEqual', name: 'is not' }, { value: 'contains', name: 'contains' }, { value: 'doesNotContain', name: 'does not contain' }] },
        { value: 'name', name: 'Name', data: [{ value: 'equal', name: 'is' }, { value: 'notEqual', name: 'is not' }, { value: 'contains', name: 'contains' }, { value: 'doesNotContain', name: 'does not contain' }] },
        { value: 'country', name: 'Country', data: [{ value: 'equal', name: 'is', data: [{ value: "india", name: "India" }] }] }]
    },
    { value: 'email_behavior', name: 'Email behavior', data: [{ value: 'coupon', name: 'Coupon', data: [{ value: 'in', name: 'has' }, { value: 'notIn', name: 'has not' }] }] }
];

function Properties({ data, userData, addUsers, route, addroute,toggle }) {


    if (data) {
        if (data.data.type === "split") {
            function Filters() {
                let route_data = route.find(x => x.nodes.find(y => y.id == data.id));
                if(route_data){
                    
                }
                let route_data_index = route.findIndex(x => x.nodes.find(y => y.id == data.id));console.log(data.id,route,route_data);
                let node_data = route_data.nodes.find(x => x.id == data.id);
                let node_data_index = route_data.nodes.findIndex(x => x.id == data.id);
            
                const [filter2, setfilter2] = useState(false);
                const [filter3, setfilter3] = useState(false);
                const [filter4, setfilter4] = useState(false);
                const [input, setinput] = useState(false);
                const [datefilter, setdatefilter] = useState(false);
                const [first_filer_data, setfirstfiler_data] = useState();
                const [second_filer_data, setsecond_filer_data] = useState();
                const [third_filer_data, setthird_filer_data] = useState();
                const [fourth_filer_data, setfourth_filer_data] = useState();
                const [filterdata, setfilterdata] = useState('');
                const [ruledata, setruledata] = useState([]);
                const [startDate, setStartDate] = useState(new Date());

                


                if (node_data.conditions && ruledata.length === 0) {

                    for (let i = 0; i < node_data.conditions.all.length; i++) {
                        if (node_data.conditions.all[i].any) {
                            for (let j = 0; j < node_data.conditions.all[i].any.length; j++) {
                                ruledata.push(node_data.conditions.all[i].any[j])
                            }
                        } else {
                            ruledata.push(node_data.conditions.all[i])
                        }
                    }

                }

                const first_filter = data => {
                    
                    setfilter2(true)
                    setfirstfiler_data(data)
                    setfilter3(false)
                    setfilter4(false)
                    setinput(false)
                    setsecond_filer_data()
                }
                const second_filter = data => {
                    setfilter3(true)
                    setfilter4(false)
                    setsecond_filer_data(data)
                    setinput(false)
                    setthird_filer_data()
                }
                const third_filter = data => {
                    if (data.data) {
                        if (data.data.length > 0) {
                            setfilter4(true)
                            setthird_filer_data(data)
                        } else {
                            setdatefilter(true)
                            setthird_filer_data(data)
                        }

                    } else if (second_filer_data.value === 'coupon') {
                        setthird_filer_data(data)
                        setfilterdata(".")
                    } else {
                        
                        setinput(true)
                        setthird_filer_data(data)
                    }
                }
                const fourth_filter = data => {
                    setfourth_filer_data(data)
                    setfilterdata(data.name)
                }
                function convert(str) {
                    var date = new Date(str),
                        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
                        day = ("0" + date.getDate()).slice(-2);
                    return [date.getFullYear(), mnth, day].join("-");
                }
                const date_filter = data => {
                    
                    setfilterdata(convert(data))
                }
                function cancel() {
                    setfirstfiler_data()
                    setsecond_filer_data()
                    setthird_filer_data()
                    setfourth_filer_data()
                    setdatefilter()
                    setfilterdata()
                    setfilter2(false)
                    setfilter3(false)
                    setfilter4(false)
                    setinput(false)
                }
                function add_filter() {
                    let filtered_data = ruledata;
                    filtered_data.push({ "event_name": second_filer_data.name, "fact": second_filer_data.value, "condition_name": third_filer_data.name, "operator": third_filer_data.value, "value": filterdata, "filter_data": filterdata, "condition": "AND" })
                    setruledata(filtered_data);
                    console.log(ruledata)
                    setfirstfiler_data()
                    setsecond_filer_data()
                    setthird_filer_data()
                    setfourth_filer_data()
                    setdatefilter()
                    setfilterdata()
                    setfilter2(false)
                    setfilter3(false)
                    setfilter4(false)
                    setinput(false)
                }
                function delete_filter(i) {
                    //  let q=ruledata.filter(x => x.id !== ruledata[i].id );
                    ruledata.splice(i, 1)
                    setruledata(ruledata);
                    
                }
                function and_condition(index) {
                    ruledata[index].condition = "AND"
                    // setruledata(ruledata);
                }
                function or_condition(index) {
                    ruledata[index].condition = "OR"
                    // setruledata(ruledata);
                }
                function save() {
                    let temp_AND_array = [], temp_OR_array = [];
                    for (let i = 0; i < ruledata.length; i++) {
                        if (ruledata[i].condition === "AND") {
                            temp_AND_array.push(ruledata[i])
                        }
                        if (ruledata[i].condition === "OR") {
                            temp_OR_array.push(ruledata[i])
                        }
                    }
                    if (temp_OR_array.length > 0) {
                        temp_AND_array[temp_AND_array.length] = { "any": temp_OR_array }
                    }

                    route[route_data_index].nodes[node_data_index].conditions = { "all": temp_AND_array }
                    route[route_data_index].nodes[node_data_index].event = { "type": "spliteddata", params: { "message": 'splited data' } }

                    // let post_data  = {routes: route}
                    // axios.put('http://localhost:3000/rules/176', post_data);
                    addroute(route)
                    toggle()

                }
                
                return (
                    <>
                        <center>
                            {ruledata.length > 0 && (<>{ruledata.map((data, i) => (<>
                                <p>
                                    <Dropdown>

                                        <Dropdown.Toggle size="sm">{data.condition}</Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item onClick={() => and_condition(i)}>AND</Dropdown.Item>
                                            <Dropdown.Item onClick={() => or_condition(i)}>OR</Dropdown.Item>

                                        </Dropdown.Menu>

                                    </Dropdown>{data.event_name} {data.condition_name} {data.filter_data} <GrClose onClick={() => delete_filter(i)} /></p> </>))}</>)}
                            <Dropdown >
                                <Dropdown.Toggle > {first_filer_data && (first_filer_data.name)}{!first_filer_data && (<>Select Filter</>)}</Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {countryData.map((e, key) => {
                                        return <Dropdown.Item key={key} value={e.value} onClick={() => first_filter(e)}>{e.name}</Dropdown.Item>
                                    })}
                                </Dropdown.Menu>
                            </Dropdown><br />
                            {filter2 && (<><Dropdown>
                                <Dropdown.Toggle >{second_filer_data && (second_filer_data.name)}{!second_filer_data && (<>Select Filter</>)}</Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {first_filer_data.data.map((e, key) => {
                                        return <Dropdown.Item key={key} value={e.value} onClick={() => second_filter(e)}>{e.name}</Dropdown.Item>
                                    })}
                                </Dropdown.Menu>
                            </Dropdown> <br /></>)}
                            {filter3 && (<><Dropdown>
                                <Dropdown.Toggle >{third_filer_data && (third_filer_data.name)}{!third_filer_data && (<>Select Filter</>)}</Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {second_filer_data.data.map((e, key) => {
                                        return <Dropdown.Item key={key} value={e.value} onClick={() => third_filter(e)}>{e.name}</Dropdown.Item>
                                    })}
                                </Dropdown.Menu>
                            </Dropdown><br /></>)}

                            {input && (<InputGroup className="mb-3">
                                <FormControl
                                    aria-label="Username"
                                    aria-describedby="basic-addon1"
                                    onChange={e => setfilterdata(e.target.value)}
                                    required
                                />
                            </InputGroup>)}

                            {filter4 && (<><Dropdown>
                                <Dropdown.Toggle >{fourth_filer_data && (fourth_filer_data.name)}{!fourth_filer_data && (<>Select Filter</>)}</Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {third_filer_data.data.map((e, key) => {
                                        return <Dropdown.Item key={key} value={e.value} onClick={() => fourth_filter(e)}>{e.name}</Dropdown.Item>
                                    })}
                                </Dropdown.Menu>
                            </Dropdown><br /></>)}

                            {datefilter && (<DatePicker selected={startDate} onChange={date => date_filter(date)} />)}

                            {!filterdata && <Button variant="success" disabled>Add</Button>}
                            {filterdata && <Button variant="success" onClick={() => add_filter()}>Add</Button>}&nbsp;
                        <Button variant="light" onClick={() => cancel()}>cancel</Button></center><br /><br />
                        <Button variant="primary" size="lg" onClick={() => save()} block>Save</Button>
                    </>
                )
            }
            return (
                <div><br />
                    <strong><center>Split Setup</center></strong><br />
                    <Filters />
                </div>
            )
        } else if (data.data.type === "delay") {
            let route_data = route.find(x => x.nodes.find(y => y.id == data.id));
            let route_data_index = route.findIndex(x => x.nodes.find(y => y.id == data.id));
            let node_data = route_data.nodes.find(x => x.id == data.id);
            let node_data_index = route_data.nodes.findIndex(x => x.id == data.id);
        
            function Delays(){
                const [delay, setdelaydata] = useState(route[route_data_index].nodes[node_data_index].delay? route[route_data_index].nodes[node_data_index].delay :'');
                const [duration, setdurationdata] = useState(route[route_data_index].nodes[node_data_index].duration ? route[route_data_index].nodes[node_data_index].duration :'');
                function select_duration(data){
                    setdurationdata(data)
                }
                function save(){
                    route[route_data_index].nodes[node_data_index].delay = delay
                    route[route_data_index].nodes[node_data_index].duration = duration
                    addroute(route)
                    toggle()
                    let post_data  = {routes: route}
                    axios.put('http://localhost:3000/rules/176', post_data);

                }
                return (
                    <div>
                        <strong>Delay</strong>
                        <p>Set this delay for</p>
                        <InputGroup className="mb-3">
                            <FormControl
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                                value={delay}
                                onChange={e => setdelaydata(e.target.value)}
                                required
                            />
                        </InputGroup>
                        <Dropdown>
                            { duration ?( <Dropdown.Toggle size="sm">{duration}</Dropdown.Toggle>) :  <Dropdown.Toggle size="sm">Select Duration</Dropdown.Toggle>}

                            <Dropdown.Menu>
                            <Dropdown.Item  onClick={() => select_duration("seconds")}>Seconds</Dropdown.Item>
                                <Dropdown.Item  onClick={() => select_duration("minutes")}>Minutes</Dropdown.Item>
                                <Dropdown.Item onClick={() => select_duration("hours")}>Hours</Dropdown.Item>
                                <Dropdown.Item onClick={() => select_duration("days")}>days</Dropdown.Item>
    
                            </Dropdown.Menu>
    
                        </Dropdown>
                        <p>After the previous step</p><br/><br/>
                        <Button variant="primary" size="lg" onClick={() => save()} block>Save</Button>
                    </div>
                )
            }

            return (<Delays />)
        } else if (data.data.type === "email") {
            let route_data = route.find(x => x.nodes.find(y => y.id == data.id));
            let route_data_index = route.findIndex(x => x.nodes.find(y => y.id == data.id));
            let node_data = route_data.nodes.find(x => x.id == data.id);
            let node_data_index = route_data.nodes.findIndex(x => x.id == data.id);

            function Email(){

            const [subject, setsubjectdata] = useState(route[route_data_index].nodes[node_data_index].subject? route[route_data_index].nodes[node_data_index].subject :'Email Subject');
            function save(){
                route[route_data_index].nodes[node_data_index].subject = subject
                addroute(route)
                toggle()
                let post_data  = {routes: route}
                axios.put('http://localhost:3000/rules/176', post_data);
            }
            return(
                    <div><br/>
                    <strong>CONTENT</strong><br/><br/>
                    <InputGroup className="mb-3">
                        <p>FROM : </p>&nbsp;
    {/* <InputGroup.Prepend>
      <Button variant="outline-secondary">From</Button>
    </InputGroup.Prepend> */}
    <FormControl aria-describedby="basic-addon1" value={subject} onChange={e => setsubjectdata(e.target.value)} />
  </InputGroup><br/>
  <p>To : </p>&nbsp;
  <Button variant="primary" size="lg" onClick={() => save()} block>Save</Button>
                </div>
                )
            }

            return (
                <Email />

            )
        } else if (data.data.type === "exit") {
            return (
                <div>
                </div>
            )
        } else if (data.data.type === "trigger") {
            function Filters() {
                const [filter2, setfilter2] = useState(false);
                const [filter3, setfilter3] = useState(false);
                const [filter4, setfilter4] = useState(false);
                const [input, setinput] = useState(false);
                const [datefilter, setdatefilter] = useState(false);
                const [first_filer_data, setfirstfiler_data] = useState();
                const [second_filer_data, setsecond_filer_data] = useState();
                const [third_filer_data, setthird_filer_data] = useState();
                const [fourth_filer_data, setfourth_filer_data] = useState();
                const [filterdata, setfilterdata] = useState('');
                const [ruledata, setruledata] = useState([]);
                const [startDate, setStartDate] = useState(new Date());

                
                let route_data = route.find(x => x.nodes.find(y => y.id == data.id));
                let route_data_index = route.findIndex(x => x.nodes.find(y => y.id == data.id));
                let node_data = route_data.nodes.find(x => x.id == data.id);
                let node_data_index = route_data.nodes.findIndex(x => x.id == data.id);

                if (node_data.conditions && ruledata.length === 0) {

                    for (let i = 0; i < node_data.conditions.all.length; i++) {
                        if (node_data.conditions.all[i].any) {
                            for (let j = 0; j < node_data.conditions.all[i].any.length; j++) {
                                ruledata.push(node_data.conditions.all[i].any[j])
                            }
                        } else {
                            ruledata.push(node_data.conditions.all[i])
                        }
                    }

                }

                const first_filter = data => {
                    
                    setfilter2(true)
                    setfirstfiler_data(data)
                    setfilter3(false)
                    setinput(false)
                    setsecond_filer_data()
                }
                const second_filter = data => {
                    setfilter3(true)
                    setsecond_filer_data(data)
                    setinput(false)
                    setthird_filer_data()
                }
                const third_filter = data => {
                    if (data.data) {
                        if (data.data.length > 0) {
                            setfilter4(true)
                            setthird_filer_data(data)
                        } else {
                            setdatefilter(true)
                            setthird_filer_data(data)
                        }

                    } else if (second_filer_data.value === 'coupon') {
                        setthird_filer_data(data)
                        setfilterdata(".")
                    } else {
                        
                        setinput(true)
                        setthird_filer_data(data)
                    }
                }
                const fourth_filter = data => {
                    setfourth_filer_data(data)
                    setfilterdata(data.name)
                }
                function convert(str) {
                    var date = new Date(str),
                        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
                        day = ("0" + date.getDate()).slice(-2);
                    return [date.getFullYear(), mnth, day].join("-");
                }
                const date_filter = data => {
                    
                    setfilterdata(convert(data))
                }
                function cancel() {
                    setfirstfiler_data()
                    setsecond_filer_data()
                    setthird_filer_data()
                    setfourth_filer_data()
                    setdatefilter()
                    setfilterdata()
                    setfilter2(false)
                    setfilter3(false)
                    setfilter4(false)
                    setinput(false)
                }
                function add_filter() {
                    let filtered_data = ruledata;
                    filtered_data.push({ "event_name": second_filer_data.name, "fact": second_filer_data.value, "condition_name": third_filer_data.name, "operator": third_filer_data.value, "value": filterdata, "filter_data": filterdata, "condition": "AND" })
                    setruledata(filtered_data);
                    console.log(ruledata)
                    setfirstfiler_data()
                    setsecond_filer_data()
                    setthird_filer_data()
                    setfourth_filer_data()
                    setdatefilter()
                    setfilterdata()
                    setfilter2(false)
                    setfilter3(false)
                    setfilter4(false)
                    setinput(false)
                }
                function delete_filter(i) {
                    ruledata.splice(i, 1)
                    setruledata(ruledata);
                    
                }
                function and_condition(index) {
                    ruledata[index].condition = "AND"
                    // setruledata(ruledata);
                }
                function or_condition(index) {
                    ruledata[index].condition = "OR"
                    // setruledata(ruledata);
                }
                function save() {
                    let temp_AND_array = [], temp_OR_array = [];
                    for (let i = 0; i < ruledata.length; i++) {
                        if (ruledata[i].condition === "AND") {
                            temp_AND_array.push(ruledata[i])
                        }
                        if (ruledata[i].condition === "OR") {
                            temp_OR_array.push(ruledata[i])
                        }
                    }
                    if (temp_OR_array.length > 0) {
                        temp_AND_array[temp_AND_array.length] = { "any": temp_OR_array }
                    }

                    route[route_data_index].nodes[node_data_index].conditions = { "all": temp_AND_array }
                    route[route_data_index].nodes[node_data_index].event = { "type": "spliteddata", params: { "message": 'splited data' } }
                    // let post_data  = {data: route,nodes: [{}],edges:[{}]}
                    // let post = {data:{ "all": temp_AND_array },nodes: { "type": "spliteddata", "params": { "message": 'splited data' } },edges:[{}]}
                    // axios.post('http://127.0.0.1:3000/ping', post);
                    // axios.post('http://127.0.0.1:3000/test', post_data);
                    let post_data  = {routes: route}
                    axios.put('http://localhost:3000/rules/176', post_data);

                    addroute(route)
                    toggle()
                }
                
                return (
                    <>
                        <center>
                            {ruledata.length > 0 && (<>{ruledata.map((data, i) => (<>
                                <p>
                                    <Dropdown>

                                        <Dropdown.Toggle size="sm">{data.condition}</Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item onClick={() => and_condition(i)}>AND</Dropdown.Item>
                                            <Dropdown.Item onClick={() => or_condition(i)}>OR</Dropdown.Item>

                                        </Dropdown.Menu>

                                    </Dropdown>{data.event_name} {data.condition_name} {data.filter_data} <GrClose onClick={() => delete_filter(i)} /></p> </>))}</>)}
                            <Dropdown >
                                <Dropdown.Toggle > {first_filer_data && (first_filer_data.name)}{!first_filer_data && (<>Select Filter</>)}</Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {countryData.map((e, key) => {
                                        return <Dropdown.Item key={key} value={e.value} onClick={() => first_filter(e)}>{e.name}</Dropdown.Item>
                                    })}
                                </Dropdown.Menu>
                            </Dropdown><br />
                            {filter2 && (<><Dropdown>
                                <Dropdown.Toggle >{second_filer_data && (second_filer_data.name)}{!second_filer_data && (<>Select Filter</>)}</Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {first_filer_data.data.map((e, key) => {
                                        return <Dropdown.Item key={key} value={e.value} onClick={() => second_filter(e)}>{e.name}</Dropdown.Item>
                                    })}
                                </Dropdown.Menu>
                            </Dropdown> <br /></>)}
                            {filter3 && (<><Dropdown>
                                <Dropdown.Toggle >{third_filer_data && (third_filer_data.name)}{!third_filer_data && (<>Select Filter</>)}</Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {second_filer_data.data.map((e, key) => {
                                        return <Dropdown.Item key={key} value={e.value} onClick={() => third_filter(e)}>{e.name}</Dropdown.Item>
                                    })}
                                </Dropdown.Menu>
                            </Dropdown><br /></>)}

                            {input && (<InputGroup className="mb-3">
                                <FormControl
                                    aria-label="Username"
                                    aria-describedby="basic-addon1"
                                    onChange={e => setfilterdata(e.target.value)}
                                    required
                                />
                            </InputGroup>)}

                            {filter4 && (<><Dropdown>
                                <Dropdown.Toggle >{fourth_filer_data && (fourth_filer_data.name)}{!fourth_filer_data && (<>Select Filter</>)}</Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {third_filer_data.data.map((e, key) => {
                                        return <Dropdown.Item key={key} value={e.value} onClick={() => fourth_filter(e)}>{e.name}</Dropdown.Item>
                                    })}
                                </Dropdown.Menu>
                            </Dropdown><br /></>)}

                            {datefilter && (<DatePicker selected={startDate} onChange={date => date_filter(date)} />)}

                            {!filterdata && <Button variant="success" disabled>Add</Button>}
                            {filterdata && <Button variant="success" onClick={() => add_filter()}>Add</Button>}&nbsp;
                        <Button variant="light" onClick={() => cancel()}>cancel</Button></center><br /><br />
                        <Button variant="primary" size="lg" onClick={() => save()} block>Save</Button>
                    </>
                )
            }
            return (
                <div><br />
                    <strong><center>Trigger Setup</center></strong><br />
                    <strong>Flow Trigger</strong><br />
                    <p>abandoned</p>
                    <Filters />
                </div>
            )
        } else {
            return (
                <div>
                    
                </div>
            )
        }

    } else {
        return (
            <div>
                {/* <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p> */}

            </div>
        )
    }

}

const mapDispatchToProps = dispatch => {
    return {
        addUsers: (userData) => dispatch(fetchUsersSuccess(userData)),
        addroute: (routeData) => dispatch(fetchroute(routeData)),
        toggle: (Data) => dispatch(fetchtoggle(Data))
    }
}
const mapStateToProps = state => {
    return {
        userData: state.user.users,
        route: state.user.route
    }
}
export default connect(
    mapStateToProps, mapDispatchToProps,
)(Properties)


