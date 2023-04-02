import SidebarLayout from "@/components/SidebarLayout";
import { getStateCityData } from "@/store/actions/stateCityActions";
import { Button, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useRouter } from "next/router";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { useSelector } from "react-redux";
import toastMessage from "utils/toastMessage";

const Cities = () => {
  const router = useRouter();
  const { state } = router.query;
  const { loading, stateCities } = useSelector((state) => state.stateCity);
  const selectedState = stateCities.find((el) => el._id === state);
  const allCities = selectedState?.cities;

  const columns = [
    { field: "id", headerName: "S.No", width: 0 },
    { field: "city", headerName: "city", width: 500 },
    {
      field: "pincode",
      headerName: "Pincode",
      width: 250,
    },
    {
      renderCell: Actions,
      field: "action",
      headerName: "Actions",
      width: 100,
    },
  ];

  const rows = allCities?.map((el, index) => ({
    id: index + 1,
    city: el.city,
    pincode: el.pincode,
    action: { state, city: el.city, pincode: el.pincode, id: el._id },
  }));

  return (
    <SidebarLayout>
      <Typography variant={"h4"} color={"primary"} sx={{ mb: "1rem" }}>
        Cities in {selectedState?.state || ""}
      </Typography>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          width: "100%",
        }}
      >
        <Button
          variant="contained"
          sx={{ marginBottom: "10px", marginRight: 0 }}
          onClick={() =>
            router.push({ pathname: "/admin/statecity/city", query: { state } })
          }
        >
          Add City
        </Button>
      </div>
      <DataGrid
        sx={{ height: "70vh" }}
        columns={columns}
        rows={rows}
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
      />
    </SidebarLayout>
  );
};

export default Cities;

const Actions = (params) => {
  const router = useRouter();
  const deleteCity = async (id) => {
    try {
      const response = await axios.delete(`api/city/${id}`);
      toastMessage(response.data.message, "success");
      getStateCityData();
    } catch (err) {
      console.log(err);
      toastMessage(err.response.data.message, "error");
    }
  };

  const editHandler = (state, city) => {
    router.push({
      pathname: "/admin/statecity/city",
      query: { state, city },
    });
  };
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "space-evenly",
      }}
    >
      <button
        style={{ cursor: "pointer" }}
        onClick={() => {
          editHandler(params.formattedValue.state, params.formattedValue.id);
        }}
      >
        <AiFillEdit />
      </button>
      <button
        style={{ cursor: "pointer" }}
        onClick={() => deleteCity(params.formattedValue.id)}
      >
        <AiFillDelete />
      </button>
    </div>
  );
};
