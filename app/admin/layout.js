import { Toaster } from "react-hot-toast";
import Nav from "../../components/admin/Nav/Nav";

export const metadata = {
  title: "Brokersite || Admin",
  description: "Admin Panel",
};

export default function Layout({ children }) {
  return (
    <section className="w-full h-full m-0 p-0 overflow-x-hidden">
      <Toaster position="top-center" />
      <div className="fixed top-0 left-0 w-fit">
        <Nav />
      </div>
      <div className="mt-16 max-w-[100vw]">{children}</div>
    </section>
  );
}
