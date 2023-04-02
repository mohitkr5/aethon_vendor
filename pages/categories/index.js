import Loading from "@/components/Loading";
import SidebarLayout from "@/components/SidebarLayout";
import { deleteCategory, getCategories } from "@/store/actions/categoryActions";
import { EightK } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { useSelector } from "react-redux";
import toastMessage from "utils/toastMessage";

const ManageCategories = () => {
  const { loading, categories } = useSelector((state) => state.category);
  const router = useRouter();

  useEffect(() => {
    getCategories();
  }, []);

  const columns = [
    { field: "id", headerName: "S.No", width: 0 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "description", headerName: "Description", width: 350 },
    { field: "commission", headerName: "Commission", width: 150 },
    {
      renderCell: Actions,
      field: "action",
      headerName: "Actions",
      width: 100,
    },
  ];

  const rows = categories.map((el, index) => ({
    id: index + 1,
    ...el,
    action: { id: el._id },
  }));

  return (
    <SidebarLayout>
      <Typography variant={"h4"} color={"primary"} sx={{ mb: "1rem" }}>
        Catgories
      </Typography>
      {loading ? (
        <Loading text={"Loading Categories"} />
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
              onClick={() => router.push("/categories/single")}
            >
              Add Category
            </Button>
          </div>
          <DataGrid
            sx={{ height: "70vh" }}
            columns={columns}
            rows={rows}
            disableSelectionOnClick
            experimentalFeatures={{ newEditingApi: true }}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
        </>
      )}
    </SidebarLayout>
  );
};

export default ManageCategories;

const Actions = (params) => {
  const router = useRouter();
  const deleteSelectedCateory = async (id) => {
    try {
      await deleteCategory({ id });
      toastMessage(response.data.message, "success");
      getStateCityData();
    } catch (err) {
      console.log(err);
      toastMessage(err.response.data.message, "error");
    }
  };

  const editHandler = (id) => {
    router.push({ pathname: "/categories/single", query: { id } });
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
          editHandler(params.formattedValue.id);
        }}
      >
        <AiFillEdit />
      </button>
      <button
        style={{ cursor: "pointer" }}
        onClick={() => deleteSelectedCateory(params.formattedValue.id)}
      >
        <AiFillDelete />
      </button>
    </div>
  );
};
