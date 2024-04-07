import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import ReactDOM from "react-dom/client";

import { HelmetProvider } from "react-helmet-async";
import AppRouter from "@/appRouter.jsx";

const theme = extendTheme({
  styles: {
    global: {
      html: {
        scrollbarGutter: "stable",
        "&::-webkit-scrollbar": {
          width: "auto",
        },
        "&::-webkit-scrollbar-thumb": {
          borderRadius: 'full',
          background: 'blackAlpha.500',
          border: '2px solid',
          borderColor: 'gray.200',
        },
        "&::-webkit-scrollbar-track":{
          background: 'gray.200'
        }
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <ChakraProvider theme={theme}>
    <HelmetProvider>
      <AppRouter />
    </HelmetProvider>
  </ChakraProvider>
);
