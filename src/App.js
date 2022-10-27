import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginReg from "./components/pages/auth/LoginReg";
import Contact from "./components/pages/Contact";
import Home from "./components/pages/Home";
import Layout from "./components/pages/Layout";
import UploadProduct from "./components/UploadProduct";

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>} >
          <Route index element={<Home/>} />
          <Route path="contact" element={<Contact/>} />
          <Route path="login" element={<LoginReg/>}/>
          <Route path="upload-product" element={<UploadProduct/>} />
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
