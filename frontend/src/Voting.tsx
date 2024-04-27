import { Button, Card } from "@mui/material";

export const Voting = ({ users }: { users: string[] }) => {
  return (
    <Card className="rounded-lg flex flex-col p-4 mt-8">
      Vote on which user was the AI!
      {users.map((user, index) => (
        <Button key={index}>
          {user}
        </Button>
      ))}
    </Card>
  );
};
