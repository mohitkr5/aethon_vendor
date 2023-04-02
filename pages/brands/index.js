import Loading from "@/components/Loading";
import SidebarLayout from "@/components/SidebarLayout";
import { deleteBrand, getBrands } from "@/store/actions/brandActions";
import { deleteCategory, getCategories } from "@/store/actions/categoryActions";
import { Button, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { useSelector } from "react-redux";
import toastMessage from "utils/toastMessage";

const ManageBrands = () => {
  const { loading, brands } = useSelector((state) => state.brand);
  const router = useRouter();

  useEffect(() => {
    if (!brands.length) {
      getBrands();
    }
  }, []);

  const columns = [
    { field: "id", headerName: "S.No", width: 0 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "description", headerName: "Description", width: 400 },
    {
      renderCell: Actions,
      field: "action",
      headerName: "Actions",
      width: 100,
    },
  ];

  const rows = brands.map((el, index) => ({
    id: index + 1,
    ...el,
    action: { id: el._id },
  }));

  return (
    <SidebarLayout>
      <Typography variant={"h4"} color={"primary"} sx={{ mb: "1rem" }}>
        Brands
      </Typography>
      {loading ? (
        <Loading text={"Loading Brands"} />
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
              onClick={() => router.push("/brands/single")}
            >
              Add Brand
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

export default ManageBrands;

const Actions = (params) => {
  const router = useRouter();
  const deleteSelectedCateory = async (id) => {
    try {
      await deleteBrand({ id });
      toastMessage("Brand Deleted", "success");
      getBrands();
    } catch (err) {
      console.log(err);
      toastMessage(err.response.data.message, "error");
    }
  };

  const editHandler = (id) => {
    router.push({ pathname: "/brands/single", query: { id } });
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
