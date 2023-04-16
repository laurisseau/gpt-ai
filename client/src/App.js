import { BrowserRouter, Route, Routes } from "react-router-dom";
import SigninScreen from "./screens/SigninScreen";
import SignupScreen from "./screens/SignupScreen";
import StudentChatScreen from "./screens/StudentChatScreen";
import DocsScreen from "./screens/DocsScreen"


function App() {
  return (
    <div>
      <BrowserRouter>
        <div>
          <main>
            <Routes>
              <Route path="/" element={<SigninScreen />} />
              <Route path="/docs" element={<DocsScreen />} />
              <Route path="/signup" element={<SignupScreen />} />
              <Route path="/studentChat" element={<StudentChatScreen />} />

            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
