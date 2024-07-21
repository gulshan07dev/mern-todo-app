import { RouterProvider } from "react-router-dom";

import router from "./routes/index";
import useThemeStore from "./app/themeStore";
import { useEffect } from "react";

function App() {
  const { theme, setTheme } = useThemeStore();

  useEffect(() => {
    document.body.className = theme;
  }, [theme, setTheme]);
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
