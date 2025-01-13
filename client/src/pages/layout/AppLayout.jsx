import { Outlet } from "react-router-dom";
import Header from "../../components/Header";
import { ChatBox } from "../../components/ChatBox";

function AppLayout() {
  return (
    <div>
      <Header />
      <Outlet />
      <ChatBox />
    </div>
  );
}

export default AppLayout;
