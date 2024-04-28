import { ChakraProvider } from "@chakra-ui/react";
import ReactDOM from "react-dom/client";
import './main.css'

import { HelmetProvider } from "react-helmet-async";
import AppRouter from "@/appRouter.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ChakraProvider>
    <HelmetProvider>
      <AppRouter />
    </HelmetProvider>
  </ChakraProvider>
);
