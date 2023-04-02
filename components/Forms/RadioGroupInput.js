import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from "@mui/material"
import useId from "@mui/material/utils/useId";

export default function RadioInput({ defaultValue, items, valueProperty, labelProperty }) {
  let currentId = useId()
  return (
    <FormControl>
      <FormLabel id={currentId}>Gender</FormLabel>
      <RadioGroup
        aria-labelledby={currentId}
        defaultValue={defaultValue}
        name="radio-buttons-group"
      >
        {items.map(item => {
          <FormControlLabel value={item[valueProperty]} control={<Radio />} label={item[labelProperty]} />
        })}
      </RadioGroup>
    </FormControl>
  );
}