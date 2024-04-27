import React, { useState } from "react";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
  FormControl,
  FormLabel,
  Card,
} from "@mui/material";

export const Voting = ({ users }: { users: string[] }) => {
  const [selectedValue, setSelectedValue] = useState("Delhi");

  const handleChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSelectedValue(event.target.value);
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    // Perform your submission logic here, e.g., send to an API or display in console
    console.log("Selected Value:", selectedValue);
  };

  return (
    <Card className="p-4 mt-8">
      <form onSubmit={handleSubmit}>
        <FormControl component="fieldset">
          <FormLabel component="legend">Vote on which player was the AI!</FormLabel>
          <RadioGroup
            name="radio-buttons-group"
            value={selectedValue}
            onChange={handleChange}
          >
            {users.map((user) => (
              <FormControlLabel
                key={user}
                value={user}
                control={<Radio />}
                label={user}
              />
            ))}
          </RadioGroup>
          <Button type="submit" color="primary" variant="contained">
            Submit
          </Button>
        </FormControl>
      </form>
    </Card>
  );
};
