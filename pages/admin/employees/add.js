import SidebarLayout from "@/components/SidebarLayout"
import { useState } from "react"
import {
  Typography,
  TextField,
  Box,
  Button,
  InputLabel,
  Select,
  MenuItem,
  FormControl
} from "@mui/material";
import { addEmployee } from "@/store/actions/employeeActions";

export default function AddEmployeePage() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "employee",
    salary: ""
  });

  const { name, email, role, salary } = formData;

  const handleFormDataChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (employeeFormData) => {
    addEmployee(employeeFormData)
  }


  return <SidebarLayout>
    <Typography>
      Add Employee
    </Typography>
    <Box sx={{ display: "flex", flexFlow: "column", gap: "1rem" }}>
      <TextField
        label={"Name"}
        value={name}
        name={"name"}
        onChange={handleFormDataChange}
        fullWidth
      />
      <TextField
        label={"Email"}
        value={email}
        name={"email"}
        onChange={handleFormDataChange}
        fullWidth
      />
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Role</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={role}
          label="Role"
          name={"role"}
          onChange={handleFormDataChange}
        >
          <MenuItem value={"employee"}>Employee</MenuItem>
          <MenuItem value={"manager"}>Manager</MenuItem>
          <MenuItem value={"admin"}>Admin</MenuItem>
        </Select>
      </FormControl>
      <TextField
        label={"Salary"}
        value={salary}
        name={"salary"}
        type={"number"}
        fullWidth
        onChange={handleFormDataChange}
      />
    </Box>
    <Button onClick={() => handleSubmit(formData)} sx={{ mt: "1rem" }} variant={"contained"}>Add Employee</Button>
  </SidebarLayout>
}



