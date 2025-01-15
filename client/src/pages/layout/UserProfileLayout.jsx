import { Outlet } from "react-router-dom";
import UserInfo from "../../components/profile/UserInfo";

export const UserProfileLayout = () => {
  return (
    <div>
      <div className="min-h-[440px]">
        <UserInfo />
        <Outlet />
      </div>
    </div>
  );
}

