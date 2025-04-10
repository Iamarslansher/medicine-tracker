import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "../../Layout";
import MainDas from "../../MainDas";
import Dashboard from "../../Dashboard";
import Login from "../../Login";
import Signup from "../../Signup";
import AddMedicine from "../../AddMedicine";
import AllMedicines from "../../AllMedicines";
import ExpiredMedicines from "../../ExpiredMedicines";
import Exercises from "../../Exercises";

const router = createBrowserRouter([
  { path: "/", element: <MainDas /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "dashboard", element: <Dashboard /> },
      { path: "add-medicine", element: <AddMedicine /> },
      { path: "medicines", element: <AllMedicines /> },
      { path: "expired-medicines", element: <ExpiredMedicines /> },
      { path: "user-exercise", element: <Exercises /> },
    ],
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
