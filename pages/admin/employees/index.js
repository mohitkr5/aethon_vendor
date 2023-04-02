import SidebarLayout from "@/components/SidebarLayout";
import { DataGrid } from "@mui/x-data-grid";
import { getEmployees } from "@/store/actions/employeeActions";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Loading from "@/components/Loading";

export default function EmployeesListPage(props) {
  const { loading: employeeLoading, employees } = useSelector(state => state.employee)

  useEffect(() => {
    getEmployees()
  }, [])

  const { rows, columns } = getTableData(employees);

  return <SidebarLayout pageTitle={"Employees"}>
    {
      employeeLoading ? <Loading text={"Loading Employees"} /> : <>
        <DataGrid
          sx={{ minHeight: "500px", maxHeight: "70vh" }}
          columns={columns}
          rows={rows}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
        />
      </>
    }
  </SidebarLayout >
}


const getTableData = (employees) => {
  return {
    columns: [
      { field: "id", headerName: "ID", width: 200 },
      { field: "name", headerName: "Name", width: 200 },
      { field: "email", headerName: "Email", width: 250 },
      { field: "role", headerName: "Role", width: 150 },
      { field: "salary", headerName: "Salary", width: 100 }
    ],
    rows: employees.map((employee) => ({
      id: employee._id,
      name: employee.name,
      email: employee.email,
      role: employee.role,
      salary: employee.salary
    }))
  };
};
