import store from '@/store/store';
import { employeeActions } from '../reducers/employeesReducer';
import axios from "axios"

const { dispatch } = store


export const getEmployees = async () => {
  dispatch(employeeActions.requestStart())
  try {
    const res = await axios.get(`/api/admin/get-employees`)
    dispatch(employeeActions.getEmployees({ employees: res.data }))
    return res.data
  } catch (err) {
    dispatch(employeeActions.requestFail({ error: err.message }))
  }
}

export const addEmployee = async (payload) => {
  dispatch(employeeActions.requestStart())
  try {
    const res = await axios.post(`/api/admin/create-employee`, payload)
    dispatch(employeeActions.addEmployee({ employee: res.data }))
    return res.data
  } catch (err) {
    dispatch(employeeActions.requestFail({ error: err.message }))
  }
}
