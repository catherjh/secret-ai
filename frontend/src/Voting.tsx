import React, { useState } from "react";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
  FormControl,
  // FormLabel,
  Card,
} from "@mui/material";

const AI_USER = "y6jjb";

export const Voting = ({ users, userId }: { users: string[], userId: string }) => {
  const [selectedValue, setSelectedValue] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSelectedValue(event.target.value);
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    console.log("Selected Value:", selectedValue);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <Card className="p-4 mt-8">
        {selectedValue === AI_USER ? (
          <div>{`Congratulations, you correctly idenfified ${AI_USER} to be the AI! 🎉`}</div>
        ) : (
          <div>{`Sorry, the AI was actually ${AI_USER} 😔 Better luck next time!`}</div>
        )}
      </Card>
    );
  }

  return (
    <Card className="p-4 mt-8">
      <div className="text-lg mb-2">Vote on which player was the AI!</div>
      <form onSubmit={handleSubmit}>
        <FormControl component="fieldset">
          {/* <FormLabel component="legend">Vote on which player was the AI!</FormLabel> */}
          <RadioGroup
            name="radio-buttons-group"
            value={selectedValue}
            onChange={handleChange}
          >
            {users.filter(x => x !== userId).map((user) => (
              <FormControlLabel
                key={user}
                value={user}
                control={<Radio />}
                label={user}
              />
            ))}
          </RadioGroup>
          <Button type="submit" color="primary" variant="contained" style={{"backgroundColor": "green"}}>
            Submit
          </Button>
        </FormControl>
      </form>
    </Card>
  );
};