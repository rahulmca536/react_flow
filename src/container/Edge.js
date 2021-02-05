import React, {  useState, } from 'react';
import { connect } from 'react-redux'
import {fetchUsersSuccess } from '../redux'
import { Modal} from 'react-bootstrap';
import { getSmoothStepPath, getMarkerEnd } from 'react-flow-renderer';
import Handle from './Handle';

const Edge = ({ id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, source, target, style = {}, arrowHeadType, markerEndId, data = {}, actionLoading, userData, addUsers
}) => {

    const [modalShow, setModalShow] = useState(false);
    const edgePath = getSmoothStepPath({ sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition, borderRadius: 0, });
    const markerEnd = getMarkerEnd(arrowHeadType, markerEndId);
    const dotHeight = 12;
    const dotWidth = 12;

    function MyVerticallyCenteredModal(props) {
        const elements = props.data.userData;

        const onAdd = data => {
            const sample = "Conditional"
            const alphabet = "abcdefghijklmnopqrstuvwxyz"
            const randomCharacter = alphabet[Math.floor(Math.random() * alphabet.length)]
            const randomCharacter2 = alphabet[Math.floor(Math.random() * alphabet.length)]

            // Add New Node
            let node_index = elements.findIndex((el) => el.id === data.source);
            elements.splice(node_index + 1, 0, {
                id: data.source + randomCharacter,
                data: { label: (<Handle data={sample} />) },
                test:"test"
            });
            // Add New Exit Node
            elements.splice(node_index + 3, 0, {
                id: data.source + randomCharacter + randomCharacter2,
                custom_type: 'exit',
                data: { label: (<>Exit</>) },
                style: { width: '55px' },
            });
            const cache = [...elements];
            // Edit Existing edge to connect the new node
            let index = cache.findIndex((el) => el.id === data.id);
            cache[index] = { id: 'e' + data.source + '-' + data.source + randomCharacter, source: data.source, target: data.source + randomCharacter, type: 'custom', sourceHandle: data.sourceHandle, data: { target: data.source + randomCharacter, "source": data.source, id: 'e' + data.source + '-' + data.source + randomCharacter, sourceHandle: data.sourceHandle, routeId: 'e' + data.source + '-' + data.source + randomCharacter } }
            // Add New Edge
            cache.splice(index + 1, 0, { id: 'e' + data.source + randomCharacter + '-' + data.target, source: data.source + randomCharacter, target: data.target, type: 'custom', sourceHandle: 'a', data: { target: data.target, source: data.source + randomCharacter, id: 'e' + data.source + randomCharacter + '-' + data.target, sourceHandle: 'a', routeId: 'e' + data.source + randomCharacter + '-' + data.target } });
            // Add New Edge for exit 
            cache.splice(index + 2, 0, { id: 'e' + data.source + randomCharacter + '-' + data.source + randomCharacter + randomCharacter2, source: data.source + randomCharacter, target: data.source + randomCharacter + randomCharacter2, type: 'custom', sourceHandle: 'b', data: { id: 'e' + data.source + randomCharacter + '-' + data.source + randomCharacter + randomCharacter2, source: data.source + randomCharacter, target: data.source + randomCharacter + randomCharacter2, sourceHandle: 'b', routeId: 'e' + data.source + randomCharacter + '-' + data.source + randomCharacter + randomCharacter2 } });
            addUsers(cache)
            setModalShow(false);
        }

        const onAddnode = data => {
            const alphabet = "abcdefghijklmnopqrstuvwxyz"
            const randomCharacter = alphabet[Math.floor(Math.random() * alphabet.length)]
            const id = data.source + randomCharacter
            const source = data.source + randomCharacter
            const target = data.target
            const cache = [...elements];
            // Add New Node
            let node_index = cache.findIndex((el) => el.id === data.target);
            cache.splice(node_index, 0, { id: id, data: { label: (<>Added Node</>) }, });
            // Edit Existing edge to connect the new node
            let index = cache.findIndex((el) => el.id === data.id);
            cache[index] = { id: 'e' + data.source + '-' + data.source + randomCharacter, source: data.source, target: data.source + randomCharacter, type: 'custom', sourceHandle: data.sourceHandle, data: { target: data.source + randomCharacter, "source": data.source, id: 'e' + data.source + '-' + data.source + randomCharacter, sourceHandle: data.sourceHandle, routeId: 'e' + data.source + '-' + data.source + randomCharacter } }
            // Add New Edge
            let edge_index = index + 1
            cache.splice(edge_index, 0, { id: 'e' + source + '-' + target, source: source, target: target, type: 'custom', data: { target: target, source: source, id: 'e' + source + '-' + target, routeId: 'e' + source + '-' + target } },);
            // console.log(JSON.stringify(elements))
            addUsers(cache)
            setModalShow(false);
        }

        return (
            <Modal
                {...props}
                size="sm"
            >
                <Modal.Body>
                    <div className="container-fluid">
                        <center>

                            <button onClick={() => onAdd(props.data.data)} style={{ "background": "whitesmoke", "padding": "1px", }}>Add Conditional Node</button><br /><br />
                            <button onClick={() => onAddnode(props.data.data)} style={{ "background": "whitesmoke", "padding": "1px", }}>Add Normal Node</button>
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
                onClick={() => setModalShow(true)}
            />
            <MyVerticallyCenteredModal
                show={modalShow}
                data={{ "data": data, "userData": userData }}
                onHide={() => setModalShow(false)}
                aria-labelledby="example-custom-modal-styling-title"
            />

        </>
    );

    return (
        <g>
            <path
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
    }
}
const mapStateToProps = state => {
    return {
        userData: state.user.users
    }
}
export default connect(
    mapStateToProps, mapDispatchToProps,
)(Edge)