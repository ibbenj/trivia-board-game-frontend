import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import { Layout } from "./Components/Board/Layout";
import { Home } from "./Components/Home/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <ChakraProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/play/:gameID" element={<Layout />}></Route>
            <Route path="/" element={<Home />}></Route>
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
    </div>
  );
}

export default App;