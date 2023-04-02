import Loading from "@/components/Loading";
import SidebarLayout from "@/components/SidebarLayout";
import { deleteSize, getSizes } from "@/store/actions/sizeActions";
import { Button, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { useSelector } from "react-redux";
import toastMessage from "utils/toastMessage";

const ManageSizes = () => {
  const { loading, sizes } = useSelector((state) => state.size);
  const router = useRouter();

  useEffect(() => {
    if (!sizes.length) {
      getSizes();
    }
  }, []);

  const columns = [
    { field: "id", headerName: "S.No", width: 0 },
    { field: "name", headerName: "Name", width: 150 },
    // { field: "description", headerName: "Description", width: 400 },
    {
      renderCell: Actions,
      field: "action",
      headerName: "Actions",
      width: 100,
    },
  ];

  const rows = sizes.map((el, index) => ({
    id: index + 1,
    ...el,
    action: { id: el._id },
  }));

  return (
    <SidebarLayout>
      <Typography variant={"h4"} color={"primary"} sx={{ mb: "1rem" }}>
        Sizes
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
              onClick={() => router.push("/sizes/single")}
            >
              Add Size
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

export default ManageSizes;

const Actions = (params) => {
  const router = useRouter();
  const deleteSelectedSize = async (id) => {
    try {
      await deleteSize({ id });
      toastMessage("Size Deleted", "success");
      getSizes();
    } catch (err) {
      console.log(err);
      toastMessage(err.response.data.message, "error");
    }
  };

  const editHandler = (id) => {
    router.push({ pathname: "/sizes/single", query: { id } });
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
        onClick={() => deleteSelectedSize(params.formattedValue.id)}
      >
        <AiFillDelete />
      </button>
    </div>
  );
};
