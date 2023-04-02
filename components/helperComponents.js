import { FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";

export const Dropdown = ({
  state,
  onChange,
  name,
  label,
  data,
  disabled = false,
}) => (
  <FormControl fullWidth>
    <InputLabel id={`product-${name}-select`}>{label}</InputLabel>
    <Select
      labelId={`product-${name}-select`}
      id={`product-${name}-select`}
      value={state[name]}
      label={label}
      name={name}
      onChange={onChange}
      disabled={disabled}
    >
      {data.map((entry, index) => (
        <MenuItem key={index} value={entry._id}>
          {entry.name}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

export const RightSideLabel = ({
  onClick = () => {},
  label,
  fontSize = "14px",
}) => (
  <p
    style={{
      textAlign: "right",
      color: "blue",
      fontSize: fontSize,
    }}
  >
    <span style={{ cursor: "pointer" }} onClick={onClick}>
      {label}
    </span>
  </p>
);

export const LeftSideLabel = ({
  onClick = () => {},
  label,
  fontSize = "14px",
}) => (
  <p
    style={{
      textAlign: "left",
      color: "blue",
      fontSize: fontSize,
    }}
  >
    <span style={{ cursor: "pointer" }} onClick={onClick}>
      {label}
    </span>
  </p>
);

export const ImageViewer = ({ width = "100%", images }) => {
  return (
    <div style={{ width, border: "1px solid lightgrey" }}>
      <p style={{ padding: "10px" }}>Description Images</p>
      <br />
      {images.length ? (
        <Grid style={{ width }} spacing={1}>
          {images.map((image, index) => (
            <Grid key={index} xs={3.75}>
              <img src={image} width="100%" alt="Description Image" />
            </Grid>
          ))}
        </Grid>
      ) : (
        <p style={{ textAlign: "center" }}>No images to display</p>
      )}
      <br />
    </div>
  );
};
