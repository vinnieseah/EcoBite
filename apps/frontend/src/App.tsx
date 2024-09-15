import { DAppKitProvider } from "@vechain/dapp-kit-react";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./routes/HomePage";
import Page from "./components/Page";
import PageHub from "./components/PageHub";
import CameraPage from "./routes/CameraPage";
import InstructionsPage from "./routes/InstructionsPage";
import {Navbar} from "./components/Navbar"; // Import Navbar
import { lightTheme } from "./theme";

function App() {
  return (
    <ChakraProvider theme={lightTheme}>
      <DAppKitProvider
        usePersistence
        requireCertificate={false}
        genesis="test"
        nodeUrl="https://testnet.vechain.org/"
        logLevel={"DEBUG"}
      >
        <Router>
          <Routes>
            <Route path="/home" element={<HomePage />} />
            <Route path="/camera" element={<CameraPage />} />
            <Route path="/instructions" element={<InstructionsPage />} />
            <Route path="/pages" element={<PageHub />} />
            <Route path="/page/:id" element={<Page />} />
            {/* Add more routes here */}
          </Routes>
          <Navbar />
        </Router>
      </DAppKitProvider>
    </ChakraProvider>
  );
}

export default App;
