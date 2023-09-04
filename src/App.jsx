import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Auth from './pages/UserAuth'
import Tasks from './pages/Tasks'

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Auth />} /> */}
          <Route path="/" element={<Tasks />} />
          <Route  path="*" element={<h1>fallo</h1>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
