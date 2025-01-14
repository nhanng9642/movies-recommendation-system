import { Outlet } from "react-router-dom";
import Header from "../../components/Header";
import { ChatBox } from "../../components/ChatBox";
import { Footer } from "../../components/Footer";

function AppLayout() {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
      <ChatBox />
    </div>
  );
}

export default AppLayout;
