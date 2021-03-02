import React, { useState, } from 'react';
import { connect } from 'react-redux'
import { fetchUsersSuccess, fetchroute } from '../redux'
import { Modal } from 'react-bootstrap';
import { getSmoothStepPath, getMarkerEnd } from 'react-flow-renderer';
import Handle from './Handle';
import Node from './Node';
// import routeElements from './route-elements';
import data_convert from './data_convert';
const position = { x: 0, y: 0 };
const Edge = ({ id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, source, target, style = {}, arrowHeadType, markerEndId, data = {}, actionLoading, userData, addUsers, route, addroute
}) => {

    const [modalShow1, setedgemodalshow] = useState(false);
    const edgePath = getSmoothStepPath({ sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition, borderRadius: 0, });
    const markerEnd = getMarkerEnd(arrowHeadType, markerEndId);
    const dotHeight = 12;
    const dotWidth = 12;

    function MyVerticallyCenteredModal(props) {
        const elements = props.data.userData;

    //     function random_num() {
    //         var result           = '';
    //         var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    //         var charactersLength = characters.length;
    //         for ( var i = 0; i < 10; i++ ) {
    //            result += characters.charAt(Math.floor(Math.random() * charactersLength));
    //         }
    //   let check_data = route.find(x => x.route_id === result)
    //   if(check_data){
    //     for ( var j = 0; j < 10; j++ ) {
    //        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    //     }
    //     return result;
    //   }

    //         return result;
    //     }
        function random_num() {
            var result           = '';
            var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var charactersLength = characters.length;
            for ( var i = 0; i < 5; i++ ) {
               result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
         }

        const onAdd_split = data => {
            let routeElements = [...route]

            let route_data = routeElements.find(x => x.nodes.find(y => y.id == data.source));
            let node_data = route_data.nodes.find(x => x.id == data.source);
            let route_index = routeElements.findIndex(x => x.nodes.find(y => y.id == data.source));
            let target_route_data = routeElements.find(x => x.nodes.find(y => y.id == data.target));

            let source_element_id = elements.find(x => x.target == route_data.nodes[0].id);
            if (!source_element_id && route_data.route_id === target_route_data.route_id) {

                let target_node_index = route_data.nodes.findIndex(x => x.id == data.target);

                let new_route_nodes = [];

                for (let i = target_node_index; i < route_data.nodes.length; i++) {
                    new_route_nodes.push(route_data.nodes[i])
                }
                let created_node_route_id = random_num(), created_exit_route_id = random_num(), created_node_id = random_num(), created_exit_id = random_num()
                routeElements[route_index].nodes.splice(target_node_index, route_data.nodes.length - 1)
                routeElements[route_index].nodes.push({ id: created_node_id.toString(), data: { type: 'split', settings: { true_path: created_node_route_id.toString(), false_path: created_exit_route_id.toString() }, label: (<><Handle id={created_node_id.toString()} /></>) }, position })
                routeElements.push({ "route_id": created_node_route_id, "nodes": new_route_nodes },
                    { "route_id": created_exit_route_id, "nodes": [{ id: created_exit_id.toString(), type: 'output',data: { type: 'exit', label: (<>EXIT</>) }, position, style: {  } }] },
                )
            } else {
                let route_path1 = data.sourceHandle === 'a' ? "Yes" : data.sourceHandle === 'b' ? "No" : "";
                let routeId1 = route_path1 === "Yes" ? node_data.data.settings.true_path : route_path1 === "No" ? node_data.data.settings.false_path : ""
                if (route_path1) {

                    let created_node_route_id = random_num(), created_exit_route_id = random_num(), created_node_id = random_num(), created_exit_id = random_num()
                    routeElements.push({ "route_id": created_node_route_id, "nodes": [{ id: created_node_id.toString(), data: { type: 'split', settings: { true_path: routeId1, false_path: created_exit_route_id.toString() }, label: (<><Handle id={created_node_id.toString()} /></>) }, position }] },
                        { "route_id": created_exit_route_id, "nodes": [{ id: created_exit_id.toString(), type: 'output',data: { type: 'exit', label: (<>EXIT</>) }, position, style: { } }] },
                    )

                    let node_index = route_data.nodes.findIndex(x => x.id == data.source);
                    routeElements[route_index].nodes[node_index] = { id: node_data.id, data: { type: node_data.data.type, settings: { true_path: data.sourceHandle === 'a' ? created_node_route_id.toString() : node_data.data.settings.true_path, false_path: data.sourceHandle === 'b' ? created_node_route_id.toString() : node_data.data.settings.false_path }, label: (<><Handle id={node_data.id} /></>) }, position }
                } else {


                    let source_node_index = route_data.nodes.findIndex(x => x.id == data.source);
                    let existing_nodes_array = [];

                    
                    for (let i = source_node_index+1; i < route_data.nodes.length; i++) {
                    
                        
                        existing_nodes_array.push(route_data.nodes[i])

                    }
                    
                    routeElements[route_index].nodes.splice( source_node_index + 1,route_data.nodes.length - source_node_index)


                    let created_node_route_id = random_num(), created_exit_route_id = random_num(), created_node_id = random_num(), created_exit_id = random_num()
                    routeElements[route_index].nodes.push({ id: created_node_id.toString(), data: { type: 'split', settings: { true_path: created_node_route_id.toString(), false_path: created_exit_route_id.toString() }, label: (<><Handle id={created_node_id.toString()} /></>) }, position })

                    routeElements.push({ "route_id": created_node_route_id, "nodes": existing_nodes_array },
                        { "route_id": created_exit_route_id, "nodes": [{ id: created_exit_id.toString(), type: 'output', data: { type: 'exit', label: (<>EXIT</>) }, position, style: {  } }] },
                    );
                    // let source_route_data = routeElements.find(x => x.nodes.find(y => y.id == source_element_id.source));
                    // let source_node_data = source_route_data.nodes.find(x => x.id == source_element_id.source); 
                    // let source_route_index = routeElements.findIndex(x => x.nodes.find(y => y.id == source_element_id.source));
                    // let source_route_node_index = source_route_data.nodes.findIndex(x => x.id == source_element_id.source);
                    // routeElements[source_route_index].nodes[source_route_node_index] = { id: source_node_data.id, data: { type: 'split', settings: { true_path: source_element_id.sourceHandle === 'a' ? created_node_route_id.toString() : source_node_data.data.settings.false_path, false_path: source_element_id.sourceHandle === 'b' ? created_node_route_id.toString() : source_node_data.data.settings.false_path }, label: (<><Handle id={source_node_data.id} /></>) }, position }
                }
            }



            addroute(routeElements)
            addUsers(data_convert(routeElements))
            setedgemodalshow(false);
        }

        const onAdd_delay = data => {
            let routeElements = [...route]
            if (data.sourceHandle) {
                let route_index = routeElements.findIndex(x => x.nodes.find(y => y.id == data.target));
                let created_node_route_id = random_num()
                routeElements[route_index].nodes.splice(0, 0, { id: created_node_route_id.toString(), data: { type: 'delay', label: (<><Node id={created_node_route_id.toString()} data={"delay"} /> </>) }, position },)
                addroute(routeElements)
                addUsers(data_convert(routeElements))
                setedgemodalshow(false);
            } else {
                let route_data = routeElements.find(x => x.nodes.find(y => y.id == data.target));
                let route_index = routeElements.findIndex(x => x.nodes.find(y => y.id == data.target));
                let source_node_index = route_data.nodes.findIndex(x => x.id == data.source);
                let created_node_route_id = random_num()
                routeElements[route_index].nodes.splice(source_node_index + 1, 0, { id: created_node_route_id.toString(), data: { type: 'delay', label: (<><Node id={created_node_route_id.toString()} data={"delay"} /> </>) }, position },)
                addroute(routeElements)
                addUsers(data_convert(routeElements))
                setedgemodalshow(false);
            }

        }
        const onAdd_email = data => {
            let routeElements = [...route]
            if (data.sourceHandle) {
                let route_index = routeElements.findIndex(x => x.nodes.find(y => y.id == data.target));
                let created_node_route_id = random_num()
                routeElements[route_index].nodes.splice(0, 0, { id: created_node_route_id.toString(), data: { type: 'email', label: (<><Node id={created_node_route_id.toString()} data={"email"} /> </>) }, position },)
                addroute(routeElements)
                addUsers(data_convert(routeElements))
                setedgemodalshow(false);
            } else {
                let route_data = routeElements.find(x => x.nodes.find(y => y.id == data.target));
                let route_index = routeElements.findIndex(x => x.nodes.find(y => y.id == data.target));
                let source_node_index = route_data.nodes.findIndex(x => x.id == data.source);
                let created_node_route_id = random_num()
                routeElements[route_index].nodes.splice(source_node_index + 1, 0, { id: created_node_route_id.toString(), data: { type: 'email', label: (<><Node id={created_node_route_id.toString()} data={"email"} /> </>) }, position },)
                addroute(routeElements)
                addUsers(data_convert(routeElements))
                setedgemodalshow(false);
            }

        }

        return (
            <Modal
                {...props}
                size="sm"
            >
                <Modal.Body>
                    <div className="container-fluid">
                        <center>

                            <button onClick={() => onAdd_split(props.data.data)} style={{ "background": "whitesmoke", }}>  Split </button> &nbsp;
                            <button onClick={() => onAdd_email(props.data.data)} style={{ "background": "whitesmoke",  }}>  Email </button> &nbsp;
                            <button onClick={() => onAdd_delay(props.data.data)} style={{ "background": "whitesmoke",  }}>  Delay </button> &nbsp;
                        </center>
                    </div>
                </Modal.Body>
            </Modal>
        );
    }

    let addAction = (data) => (
        <>
            <image
                x={targetX - dotWidth / 2}
                y={sourceY + (targetY - sourceY) / 2 - dotHeight / 2}
                width={dotWidth}
                height={dotHeight}
                href="data:image/jpeg;base64,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"
                onClick={() => setedgemodalshow(true)}
            />
            <MyVerticallyCenteredModal
                show={modalShow1}
                data={{ "data": data, "userData": userData }}
                onHide={() => setedgemodalshow(false)}
                aria-labelledby="example-custom-modal-styling-title"
            />

        </>
    );
    return (
        <g>
            <path
                fill="none"
                id={id}
                style={style}
                className="react-flow__edge-path"
                d={edgePath}
                markerEnd={markerEnd}
                path_id={data.routeId}
            />
            {addAction(data)}
        </g>
    );
}
const mapDispatchToProps = dispatch => {
    return {
        addUsers: (userData) => dispatch(fetchUsersSuccess(userData)),
        addroute: (routeData) => dispatch(fetchroute(routeData)),
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
)(Edge)


// let source_node_index = route_data.nodes.findIndex(x => x.id == data.source);
// let existing_nodes_array = [];

// for (let i = 0; i <= source_node_index; i++) {
// console.log(route_data.nodes[i]);
    
//     existing_nodes_array.push(route_data.nodes[i])

// }
// console.log(existing_nodes_array);
// routeElements[route_index].nodes.splice(0, source_node_index + 1)

// let created_node_route_id = random_num(), created_exit_route_id = random_num(), created_node_id = random_num(), created_exit_id = random_num()
// existing_nodes_array.push({ id: created_node_id.toString(), data: { type: 'split', settings: { true_path: route_data.route_id.toString(), false_path: created_exit_route_id.toString() }, label: (<><Handle id={created_node_id.toString()} /></>) }, position })

// routeElements.push({ "route_id": created_node_route_id, "nodes": existing_nodes_array },
//     { "route_id": created_exit_route_id, "nodes": [{ id: created_exit_id.toString(), data: { type: 'exit', label: (<>EXIT</>) }, position, style: { width: '55px' } }] },
// )
// let source_route_data = routeElements.find(x => x.nodes.find(y => y.id == source_element_id.source));
// let source_node_data = source_route_data.nodes.find(x => x.id == source_element_id.source); 
// let source_route_index = routeElements.findIndex(x => x.nodes.find(y => y.id == source_element_id.source));
// let source_route_node_index = source_route_data.nodes.findIndex(x => x.id == source_element_id.source);
// routeElements[source_route_index].nodes[source_route_node_index] = { id: source_node_data.id, data: { type: 'split', settings: { true_path: source_element_id.sourceHandle === 'a' ? created_node_route_id.toString() : source_node_data.data.settings.false_path, false_path: source_element_id.sourceHandle === 'b' ? created_node_route_id.toString() : source_node_data.data.settings.false_path }, label: (<><Handle id={source_node_data.id} /></>) }, position }
