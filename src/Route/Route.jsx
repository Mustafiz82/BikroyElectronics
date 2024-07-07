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
import ProductList from "../AdminDashboard/ProductManagement/ProductList";
import ManageCategories from "../AdminDashboard/Categories&coupon/ManageCategories";
import AddProduct from "../AdminDashboard/ProductManagement/AddProduct";
import AdminDashboardLayout from "../Layout/AdminDashboardLayout"
import AdminOverview from "../AdminDashboard/AdminOverview/AdminOverview";
import ManageCoupons from "../AdminDashboard/Categories&coupon/ManageCoupons";
import BestSelling from "../pages/Home/BestSelling";
import UserList from "../AdminDashboard/UserManagement/UserList";
import CreateFlashSale from "../AdminDashboard/ProductManagement/CreateFlashSale";
import BestSellingProducts from "../AdminDashboard/ProductManagement/BestSellingProducts";
import OrderList from "../AdminDashboard/OrderManagement/OrderList";
import ProductDetail from "../pages/ProductDetail/ProductDetail";
import AllProduct from "../pages/AllProduct/AllProduct";
import PrivateRoute from "./PrivateRoute";
import EditProduct from "../AdminDashboard/ProductManagement/EditProduct";


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
				element: <Contack></Contack>
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
				element: <PrivateRoute><Wishlist></Wishlist></PrivateRoute>,
			},
			{
				path: "/cart",
				element: <PrivateRoute><Cart></Cart></PrivateRoute>  ,
			},
			{
				path: "/productdetail/:id",
				element: <ProductDetail></ProductDetail>
			},
			{
				path: "/allproduct/productdetail/:id",
				element: <ProductDetail></ProductDetail>
			},
			{
				path: "/allproduct",
				element: <AllProduct></AllProduct>
			},

			{
				path: "/Dashboard",
				element: <DashboardLayout></DashboardLayout>,
				errorElement: <ErrorPages></ErrorPages>,
				children: [
					{
						path: "myaccount",
						element: <PrivateRoute><MyAccount></MyAccount></PrivateRoute>  ,
					},
					{
						path: "myorders",
						element: <PrivateRoute> <MyOrder></MyOrder></PrivateRoute> ,
					},
					{
						path: "mycancellation",
						element: <PrivateRoute> <MyCancellations></MyCancellations></PrivateRoute> ,
					},
				],
			},
		],
	},
	{
		path: "/admin",
		element: <AdminDashboardLayout></AdminDashboardLayout>,
		errorElement: <ErrorPages></ErrorPages>,
		children: [
			{
				path: "overview",
				element: <AdminOverview></AdminOverview>
			},
			{
				path: "addproduct",
				element: <AddProduct></AddProduct>,
			},
			{
				path: "editProducts/:id",
				element: <EditProduct></EditProduct>
			},
			{
				path: "productlist",
				element: <ProductList></ProductList>
			},
			{
				path: "manageCategories",
				element: <ManageCategories></ManageCategories>
			},
			{
				path: "managecoupons",
				element: <ManageCoupons></ManageCoupons>
			},
			{
				path: "bestsellings",
				element: <BestSellingProducts></BestSellingProducts>
			},
			{
				path: "userlist",
				element: <UserList></UserList>
			},
			{
				path: "createflashsale",
				element: <CreateFlashSale></CreateFlashSale>
			},
			{
				path: "createflashsale",
				element: <CreateFlashSale></CreateFlashSale>
			},
			{
				path: "orders",
				element: <OrderList></OrderList>
			},
		],
	},
]);

export default router;
