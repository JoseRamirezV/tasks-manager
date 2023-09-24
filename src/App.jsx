import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from './auth/pages/UserAuth'
import Tasks from './tasks/pages/Tasks'

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/" element={<Tasks />} />
          <Route  path="*" element={<h1>fallo</h1>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
