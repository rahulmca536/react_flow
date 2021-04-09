import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux'
import { csvUpload,getSampleData,findEmailCol,setAttributesValue } from '../../redux'

const Csvselectcolumn = ({
  selection,
  showMappedOnly,
  cols,
  colName,
  emailCol,
  attributes,
  colIdx,
  setAttribute
}) => {
  const [changeCol, setChangeCol] = useState(false);
  const [mappedTo, setMappedTo] = useState(false);


  const handelChange = e => {
    let val = e.target.value;

    setAttribute({ ...attributes, [val]: { ...attributes[val], value: colIdx } });

    console.log(val, colIdx);

    setMappedTo(val);
  };

  const ClearSelection = () => {
    setAttribute({
      ...attributes,
      [mappedTo]: { ...attributes[mappedTo], value: -1 },
    });
    setMappedTo(false);
  };

  if (showMappedOnly) {
    return (
      <Fragment>
        <div>
          {Object.keys(attributes).map((attribute, idx) => {
            if (attributes[attribute].value === colIdx) {
              // setMappedTo(true);
              return (
                <div className="card" id={emailCol ? 'email-col' : ''}>
                  <h3>
                    {' '}
                    {colName}{' '}
                    <span>
                      {' '}
                      --{'>'} {attribute}
                    </span>
                  </h3>

                  <div>
                    {cols.map((item, idx) => {
                      return <p key={idx}> {item} </p>;
                    })}
                  </div>
                </div>
              );
            }
          })}
        </div>
      </Fragment>
    );
  }

  return (
    
    <div class="w-1/4 p-3 text-center border border-gray-300 ..." id={emailCol ? 'email-col' : ''}>

          {Object.keys(attributes).map((attribute, idx) => {
            if (attributes[attribute].value === colIdx) {
              // setMappedTo(true);
              return <><span class="font-semibold text-xl">Mapped to {attributes[attribute].name}  </span>
                            {mappedTo && (
                <button
                  className=" px-3 text-red-600 font-semibold text-3xl align-middle"
                  onClick={() => ClearSelection()}
                >
                  ×
                </button>
              )}
              </>;

            }
          })}

           
              {!mappedTo && !emailCol && (
                <select
                  className="w-full p-2 bg-gray-200"
                  value={mappedTo}
                  onChange={handelChange}
                >
                  <option class=" " value="">Select Column</option>
                  {Object.keys(attributes).map((attribute, idx) => {
                    if (
                      attribute !== 'email_address' &&
                      attributes[attribute].value === -1
                    ) {
                      return (
                        <option  class="" value={attribute} key={idx}>
                          {attributes[attribute].name}
                        </option>
                      );
                    }
                  })}
                </select>
              )}

          
        
      

      <p class="text-blue-600 my-2 text-xl"> {colName} </p>

      <div>
        {cols.map((item, idx) => {
          return <p class="p-1" key={idx}> {item} </p>;
        })}
      </div>
    </div>
  );
};



const mapDispatchToProps = dispatch => {
  return {
    setAttribute : (Data) => dispatch(setAttributesValue(Data))
  }
}
const mapStateToProps = state => {
  return {
    success: state.csvupload.success,
    action_uuid: state.csvupload.action_uuid,
    sampledata: state.csvupload.sampleData,
    emailcol: state.csvupload.emailcol,
    attributes: state.csvupload.attributes,
  }
}   
export default connect(
  mapStateToProps, mapDispatchToProps,
)(Csvselectcolumn)