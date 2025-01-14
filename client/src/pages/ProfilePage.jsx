import { Input, Typography } from "@material-tailwind/react";
import { useAuth } from "../contexts/AuthContext";

function ProfilePage() {
  const { user } = useAuth();
  
  return (
    <div className="-m-6  w-[calc(100%+48px)] ">
      <div className="mx-auto max-w-screen-md py-12">
        <Typography variant="h2" color="blue-gray" className="mb-2">
          USER PROFILE PAGE
        </Typography>
        <div color="gray" className="font-normal">
          <Input className="mt-2" disabled value={`Id: ${user._id}`} />
          <Input className="mt-4" disabled value={`Email: ${user.email}`} />
          <Input
            className="mt-6"
            disabled
            value={`CreatedAt: ${new Date(user.createdAt).toDateString()}`}
          />
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
