import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { ThemeProvider } from "./components/Layout";
import Home from "./pages/Home";
import Pricing from "./pages/Pricing";
import About from "./pages/About";

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </BrowserRouter>
        <Toaster 
          position="bottom-right" 
          toastOptions={{
            style: {
              background: '#22c55e',
              color: '#fff',
              border: 'none',
            },
          }}
        />
      </div>
    </ThemeProvider>
  );
}

export default App;
