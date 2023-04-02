import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loading from "@/components/Loading";
import { getStateCityData } from "@/store/actions/stateCityActions";
import { DataGrid } from "@mui/x-data-grid";
import { useRouter } from "next/router";
const { default: SidebarLayout } = require("@/components/SidebarLayout");
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import toastMessage from "utils/toastMessage";
import axios from "axios";

const StateCity = () => {
  const router = useRouter();
  const { loading, stateCities } = useSelector((state) => state.stateCity);
  useEffect(() => {
    getStateCityData();
  }, []);

  const columns = [
    { field: "id", headerName: "S.No", width: 0 },
    { field: "state", headerName: "State", width: 500 },
    {
      field: "stateId",
      headerName: "No of Cities",
      width: 150,
      renderCell: Cities.bind(null, stateCities),
    },
    {
      renderCell: Actions,
      field: "action",
      headerName: "Actions",
      width: 100,
    },
  ];

  const rows = stateCities.map((el, index) => ({
    id: index + 1,
    state: el.state,
    stateId: el._id,
    action: { name: el.state, id: el._id },
  }));

  return (
    <SidebarLayout>
      <Typography variant={"h4"} color={"primary"} sx={{ mb: "1rem" }}>
        States & Cities
      </Typography>
      {loading ? (
        <Loading text={"Loading State and City Data"} />
      ) : (
        <>
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
              onClick={() => router.push("/admin/statecity/state")}
            >
              Add State
            </Button>
          </div>
          <DataGrid
            sx={{ height: "70vh" }}
            columns={columns}
            rows={rows}
            disableSelectionOnClick
            experimentalFeatures={{ newEditingApi: true }}
          />
        </>
      )}
    </SidebarLayout>
  );
};

export default StateCity;

const Actions = (params) => {
  const router = useRouter();
  const deleteState = async (id) => {
    try {
      const response = await axios.delete(`api/city/state/${id}`);
      toastMessage(response.data.message, "success");
      getStateCityData();
    } catch (err) {
      console.log(err);
      toastMessage(err.response.data.message, "error");
    }
  };

  const editHandler = (state, id) => {
    router.push({ pathname: "/admin/statecity/state", query: { state, id } });
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
          editHandler(params.formattedValue.name, params.formattedValue.id);
        }}
      >
        <AiFillEdit />
      </button>
      <button
        style={{ cursor: "pointer" }}
        onClick={() => deleteState(params.formattedValue.id)}
      >
        <AiFillDelete />
      </button>
    </div>
  );
};

const Cities = (data, params) => {
  const router = useRouter();
  const state = params.formattedValue;
  const selectedState = data.find((el) => el._id === state);

  return (
    <p
      style={{ textDecoration: "underline", color: "blue", cursor: "pointer" }}
      onClick={() =>
        router.push({
          pathname: "/admin/statecity/cities",
          query: { state },
        })
      }
    >
      {selectedState?.cities?.length || 0}
    </p>
  );
};
