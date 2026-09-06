import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { Layout } from "./components/layout/Layout";
import { ProtectedRoute } from "./components/common/ProtectedRoute";
import { Landing } from "./pages/Landing";
import { Auth } from "./pages/Auth";
import { Diagnostic } from "./pages/Diagnostic";
import { Results } from "./pages/Results";
import { Dashboard } from "./pages/Dashboard";
import { Lessons } from "./pages/Lessons";
import { LessonDetail } from "./pages/LessonDetail";
import { Clubs } from "./pages/Clubs";
import { Profile } from "./pages/Profile";
import { AdminLessons } from "./pages/AdminLessons";

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Auth mode="login" />} />
            <Route path="/register" element={<Auth mode="register" />} />
            <Route path="/diagnostic" element={<Diagnostic />} />
            <Route path="/results" element={<Results />} />
            <Route path="/lessons" element={<Lessons />} />
            <Route path="/lessons/:id" element={<LessonDetail />} />
            <Route path="/clubs" element={<Clubs />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/admin/lessons" element={<AdminLessons />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
