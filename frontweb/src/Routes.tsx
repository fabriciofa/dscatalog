import Navbar from "components/Navbar";
import Admin from "pages/Admin";
import Catalog from "pages/Catalog";
import Home from "pages/Home";
import ProductDetails from "pages/ProductDetails";
import { BrowserRouter, Route, Switch } from "react-router-dom";

const Routes = () => (
    <BrowserRouter>
         <Navbar />
        <Switch>
            <Route exact path="/">
                <Home />
            </Route>
            <Route path="/products" exact>
                <Catalog />
            </Route>
            <Route path="/products/:productId">
                <ProductDetails />
            </Route>
            <Route path="/admin">
                <Admin />
            </Route>
        </Switch>
    </BrowserRouter>
);

export default Routes;