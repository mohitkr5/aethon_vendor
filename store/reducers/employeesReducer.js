import { createSlice } from "@reduxjs/toolkit"


const employeeSlice = createSlice({
  name: "employee",
  initialState: {
    employees: [],
    loading: null,
    error: null
  },
  reducers: {
    requestStart(state, action) {
      state.loading = true
      state.error = null
    },
    getEmployees(state, action) {
      state.employees = action.payload.employees
      state.loading = false
      state.error = null
    },
    addEmployee(state, action) {
      state.employees.push(action.payload.employee)
      state.loading = false
      state.error = null
    },
    requestFail(state, action) {
      state.loading = false
      state.error = action.payload.error
    }
  }
})

export default employeeSlice.reducer;
export const employeeActions = employeeSlice.actions;
