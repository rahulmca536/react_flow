import {

    CSV_SUCCESS,CSV_ERROR,CSV_SAMPLE_DATA,SET_ATTRIBUTE,CSV_EMAIL_COL,CSV_MAPPED,CSV_LOADING
  } from './csvTypes'
  import axios from 'axios';

  const validateFile =  file => {
    const {type} = file;
    const fileType = type.split('/')[1];
    if (fileType !== 'csv') return false;
    return true;
  };

  const attributes={
    email_address: {name: 'Email', value: -1},
    first_name: {name: 'First name', value: -1},
    last_name: {name: 'Last name', value: -1},
    phone: {name: 'phone no', value: -1},
  }

    // helper function to create Object
    const createObj = (sampleData) => {
        let obj = {};

        let len = Object.keys(sampleData).length;
    
        for (let i = 0; i < len; i++) {
          obj[i] = 0;
        }
    
        return obj;
      };

  export const findEmailCol = (sampleData) => {
    return (dispatch) => {
    let validEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    let obj = createObj(sampleData);

    Object.keys(sampleData).forEach((col, idx) => {
      sampleData[col].forEach(item => {
        if (validEmail.test(item)) obj[idx] += 1;
      });
    });

    let emailColumn = Object.keys(obj).reduce(function (a, b) {
      return obj[a] > obj[b] ? a : b;
    });

    dispatch({
      type: CSV_EMAIL_COL,
      payload: {
        emailCol: parseInt(emailColumn),
        attributes: {
          ...attributes,
          email_address: {
            ...attributes.email_address,
            value: parseInt(emailColumn),
          },
        }
      },
    });
}
  };

  export const csvUpload = (file) => {
    return (dispatch) => {
      dispatch({type: CSV_LOADING});
        const bodyFormData = new FormData();
        bodyFormData.append('file', file);
        // Validating the uploaded file is in csv format
        const fileValidation =  validateFile(file);
        if (!fileValidation) {
          dispatch({type: CSV_ERROR, payload: 'choose csv file'});
          return;
        }
        const request=axios.post('/api/v1/contact/upload', bodyFormData, {
          headers: {'Content-Type': 'multipart/form-data'},
        })
        request.then(response=>{ 
          dispatch({type: CSV_SUCCESS, payload: response.data});
          dispatch(getSampleData(response.data.action_uuid))
        })
        request.catch ((err) =>{
          dispatch({type: CSV_ERROR, payload: err.response.data.error.message});
        })
    }
  }

  export const getSampleData = uuid => {
    return (dispatch) => {
      const request=axios.get(`/api/v1/contact/sampledata/${uuid}`)
      request.then(response=>{
        let sample = {};
        let data = response.data.sample;
    
        Object.keys(data[0]).forEach(key => (sample[key] = []));

        // dispatch({type: CSV_SUCCESS, payload: response.data});
        // setActionuuid(response.data.action_uuid);
        data.forEach(item =>
          Object.keys(item).forEach(key => sample[key].push(item[key])),
        );
        dispatch({type: CSV_SAMPLE_DATA, payload:{ sampleData: {...sample},attributes:{...attributes}}});
        dispatch(findEmailCol({...sample}))
      })
      request.catch ((err) =>{
        dispatch({type: CSV_ERROR, payload: err.response.data.error.message});
      })
  };
  }
  export const setAttributesValue = data => {
    return (dispatch) => {
    dispatch({type: SET_ATTRIBUTE, payload: data});
    }
  }

  export const mapcsv =  data => {
    return (dispatch) => {
      const request=      axios.post(
        '/api/v1/contact/mapping',
        data,
        {headers: {'Content-Type': 'application/json'}},
      )
      request.then(response=>{
        dispatch({type: CSV_MAPPED, payload: response.data});
        axios.get('/api/v1/contact/process')
        })
        request.catch ((err) =>{
          dispatch({type: CSV_ERROR, payload: err.response.data.error.message});
        })
    }
  };
  // export const loading = () => {
  //   return (dispatch) => {
  //     dispatch({type: LOADING});
  //   }
  // }
  // export const clear_error = () => {
  //   return (dispatch) => {
  //     dispatch({type: CLEAR_ERROR});
  //   }
  // }

  // export const set_error = (data) => {
  //   console.log(data);
  //   return (dispatch) => {
  //     dispatch({type: SET_ERROR, payload:data});
  //   }
  // }