import Loading from "@/components/Loading";
import SidebarLayout from "@/components/SidebarLayout";
import { deleteColor, getColors } from "@/store/actions/colorActions";
import { deleteSize, getSizes } from "@/store/actions/sizeActions";
import { Button, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { useSelector } from "react-redux";
import toastMessage from "utils/toastMessage";

const ManageColors = () => {
  const { loading, colors } = useSelector((state) => state.color);
  const router = useRouter();

  useEffect(() => {
    if (!colors.length) {
      getColors();
    }
  }, []);

  console.log(colors);

  const columns = [
    { field: "id", headerName: "S.No", width: 0 },
    { field: "name", headerName: "Name", width: 150 },
    {
      field: "hexCode",
      headerName: "Color",
      width: 400,
      renderCell: ColorBlock,
    },
    {
      renderCell: Actions,
      field: "action",
      headerName: "Actions",
      width: 100,
    },
  ];

  const rows = colors.map((el, index) => ({
    id: index + 1,
    ...el,
    action: { id: el._id },
  }));

  return (
    <SidebarLayout>
      <Typography variant={"h4"} color={"primary"} sx={{ mb: "1rem" }}>
        Colors
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
              onClick={() => router.push("/colors/single")}
            >
              Add Color
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

export default ManageColors;

const Actions = (params) => {
  const router = useRouter();
  const deleteSelectedColor = async (id) => {
    try {
      await deleteColor({ id });
      toastMessage("Size Deleted", "success");
      getColors();
    } catch (err) {
      console.log(err);
      toastMessage(err.response.data.message, "error");
    }
  };

  const editHandler = (id) => {
    router.push({ pathname: "/colors/single", query: { id } });
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
        onClick={() => deleteSelectedColor(params.formattedValue.id)}
      >
        <AiFillDelete />
      </button>
    </div>
  );
};

const ColorBlock = (params) => {
  const hexCode = params.formattedValue;
  console.log(hexCode);
  return (
    <div
      style={{
        margin: 0,
        width: "100px",
        height: "20px",
        backgroundColor: hexCode,
        border: "0.2px solid grey",
      }}
    />
  );
};
