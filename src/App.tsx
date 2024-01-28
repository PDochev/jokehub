import ApplicationPage from "./pages/ApplicationPage";
import { ThemeProvider } from "@/components/theme-provider";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
// import supabase from "../config/supabaseClient";
import MyJokes from "./pages/MyJokes";
import UpdateJoke from "./pages/UpdateJoke";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/app" element={<ApplicationPage />} />
        <Route path="/myjokes" element={<MyJokes />} />
        <Route path="/myjokes/:id" element={<UpdateJoke />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
