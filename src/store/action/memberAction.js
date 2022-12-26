import { fetchMember, addMember, updateMember, fetchMemberById } from '../reducers/memberReducer';
import { createMedicalHistories } from '../action/medicalHistory';
import API from '../../api/orderApi';

export function createMemberAction(data, props, allergy) {
  return async dispatch => {
    API.post("members", data).then(async (response) => {
      if (response.status === "success") {
        allergy.member_id = response.payload.id
        if (data.allergies === "true") {
          await dispatch(createMedicalHistories(allergy))
          dispatch(fetchAllMembers())
        }
        else {
          dispatch(fetchAllMembers())
        }
        props.closeAdd();
      }
    })
  }
}

export function fetchAllMembers() {
  return async dispatch => {
    API.get("members").then((response) => {
      if (response.status === "success") {
        dispatch(fetchMember(response.payload))
      }
    })
  }
}

export function fetchMembersById(id) {
  return async dispatch => {
    API.get(`members/${id}`).then((response) => {
      if (response.status === "success") {
        dispatch(fetchMemberById(response.payload))
      }
    })
  }
}

export function updateMemberAction(data, props) {
  return async dispatch => {
    API.put(`members/${data.id}`, data).then(async (response) => {
      if (response.status === "success") {
        dispatch(fetchAllMembers(response.payload))
        // console.log("response.payload" + JSON.stringify(response.payload))
        props.closeEdit();
      }
    })
  }
}


export function orderAction(data,props) {
  return async dispatch => {
    API.post("members/createOrder", data).then(async (response) => {
      if (response.status === "success") {
        dispatch(fetchAllMembers())
        props.closeAdd();
      }
    })
  }
}

export function payment(data) {
  console.log("DATA=====>"+JSON.stringify(data))
  return async dispatch => {
    API.post("payment", data).then(async (response) => {
    // console.log("response====>"+JSON.stringify(response))
    if(response.status == "success"){
      // router.push({pathname: "/patientInfo"})
    }
    })
  }
}