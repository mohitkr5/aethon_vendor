import Loading from "@/components/Loading";
import SidebarLayout from "@/components/SidebarLayout";
import {
  deleteSubCategory,
  getSubCategories,
} from "@/store/actions/subCategoryActions";
import { EightK } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { useSelector } from "react-redux";
import toastMessage from "utils/toastMessage";

const ManageCategories = () => {
  const { loading, subCategories } = useSelector((state) => state.subCategory);
  const router = useRouter();

  useEffect(() => {
    getSubCategories();
  }, []);

  const columns = [
    { field: "id", headerName: "S.No", width: 0 },
    { field: "category", headerName: "Category", width: 150 },
    { field: "name", headerName: "Name", width: 300 },
    {
      renderCell: Actions,
      field: "action",
      headerName: "Actions",
      width: 100,
    },
  ];

  console.log(Array.isArray(subCategories));

  const rows = subCategories.map((el, index) => ({
    id: index + 1,
    ...el,
    action: { id: el._id, category: el.categoryId },
  }));

  return (
    <SidebarLayout>
      <Typography variant={"h4"} color={"primary"} sx={{ mb: "1rem" }}>
        Sub Categories
      </Typography>
      {loading ? (
        <Loading text={"Loading Sub Categories"} />
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
              onClick={() => router.push("/subcategories/single")}
            >
              Add Sub Category
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
  const deleteSelectedSubCategory = async (id) => {
    try {
      await deleteSubCategory({ id });
      toastMessage("Sub Category Deleted", "success");
      getSubCategories();
    } catch (err) {
      console.log(err);
      toastMessage(err.response.data.message, "error");
    }
  };

  const editHandler = (id) => {
    router.push({ pathname: "/subcategories/single", query: { id } });
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
        onClick={() => deleteSelectedSubCategory(params.formattedValue.id)}
      >
        <AiFillDelete />
      </button>
    </div>
  );
};
