import Home from "../route/home.component";
import {Route, Routes} from 'react-router';
import Navigation from "../route/navigation-bar/navigation.component";
import Authentication from "../route/authentication/authentication.component";
import Shop from "../route/shop/shop.component";
import Checkout from "../route/checkout/checkout.component";

const App = () =>{
  
  return (
    <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path="shop/*" element={<Shop/>} />
          <Route path="auth" element={<Authentication />} />
          <Route path="checkout" element={<Checkout />} />
        </Route>
    </Routes>
  )
};

export default App
