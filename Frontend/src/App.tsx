import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import EditItem from "./pages/EditItem";
import Cart from "./pages/Cart";
import ProductPage from "./pages/ProductPage";
import Confirmation from "./pages/Confirmation";


const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/dashboard" element={<Dashboard />} />
				<Route path="/about" element={<About />} />
				<Route path="/edititem/:id" element={<EditItem />} />
				<Route path="/product/:id" element={<ProductPage />} />
				<Route path="/cart" element={<Cart />} />
				<Route path="/order-confirmation" element={<Confirmation />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
