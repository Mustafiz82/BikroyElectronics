import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../pages/Home/Home";
import ErrorPages from "../pages/ErrorPage/ErrorPages";
import About from "../pages/About/About";
import Contack from "../pages/Contack/Contack";
import Login from "../pages/Auth/Login";
import Regestration from "../pages/Auth/Regestration";
import Wishlist from "../pages/Wishlist/Wishlist";
import Cart from "../pages/Cart/Cart";
import MyAccount from "../pages/userDashborad/MyAccount/MyAccount";
import MyOrder from "../pages/userDashborad/MyOrder/MyOrder";
import MyCancellations from "../pages/userDashborad/MyCancellation/MyCancellations";
import DashboardLayout from "../Layout/DashboardLayout";

const router = createBrowserRouter([
	{
		path: "/",
		element: <MainLayout></MainLayout>,
		errorElement: <ErrorPages></ErrorPages>,
		children: [
			{
				path: "/",
				element: <Home></Home>,
			},
			{
				path: "/about",
				element: <About></About>,
			},
			{
				path: "/contact",
				element: <Contack></Contack>,
			},
			{
				path: "/login",
				element: <Login></Login>,
			},
			{
				path: "/signUp",
				element: <Regestration></Regestration>,
			},
			{
				path: "/wishlist",
				element: <Wishlist></Wishlist>,
			},
			{
				path: "/cart",
				element: <Cart></Cart>,
			},
			
			
      {
        path: "/Dashboard",
        element: <DashboardLayout></DashboardLayout>,
        errorElement: <ErrorPages></ErrorPages>,
        children : [
          {
            path: "myaccount",
            element: <MyAccount></MyAccount>
          },
          {
            path: "myorders",
            element: <MyOrder></MyOrder>,
          },
          {
            path: "mycancellation",
            element: <MyCancellations></MyCancellations>,
          },
        ]
      },
		],
	},
	
]);

export default router;
