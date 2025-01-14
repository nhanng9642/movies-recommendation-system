import { Outlet } from "react-router-dom";
import Header from "../../components/Header";
import { ChatBox } from "../../components/ChatBox";
import { Footer } from "../../components/Footer";

function AppLayout() {
  return (
    <div>
      <Header />
      <div className="min-h-[440px]">
        <Outlet />
      </div>
      <Footer />
      <ChatBox />
    </div>
  );
}

export default AppLayout;
