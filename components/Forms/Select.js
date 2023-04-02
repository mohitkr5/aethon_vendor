import { InputLabel, Select, MenuItem, FormControl } from "@mui/material";

function SelectOption({ inputLabel, onChange, value, items, itemProperty }) {
  return (
    <FormControl fullWidth>
      <InputLabel id="product-category-select">{inputLabel}</InputLabel>
      <Select
        labelId="product-category-select"
        id="product-category-select"
        value={value}
        label="Category"
        name={"category"}
        onChange={onChange}
      >
        {items.map((items, index) => (
          <MenuItem key={index} value={items._id}>
            {items[itemProperty]}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default SelectOption;
