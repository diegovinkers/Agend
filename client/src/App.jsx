import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import RegisterPage from "./pages/RegisterPage";
import RegisterProfessionalPage from "./pages/RegisterProfessionalPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";


import AgendatePage from "./pages/AgendatePage";

import TasksPage from "./pages/TasksPage";
import TaskFormPage from "./pages/TaskFormPage";
import ProfilePage from "./pages/ProfilePage";

import CalendarPage from "./pages/CalendarPage";
import PatientPage from "./pages/PatientsPage";
import ProfessionaPage from "./pages/ProfessionalPage";

import ProtectedRoute from "./ProtectedRoute";
import PrivateProfessionalRoute from "./PrivateProfessionalRoute";
import PrivatePatientRoute from "./PrivatePatientRoute";
import { TaskProvider } from "./context/TaskContext";
import Navbar from "./components/Navbar";
import './App.css';

function App() {
  return (
    <TaskProvider>
      <AuthProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/registerprofessional" element={<RegisterProfessionalPage />}/>

            <Route element={<ProtectedRoute />}>
              <Route path="/tasks" element={<TasksPage />} />
              <Route path="/add-task" element={<TaskFormPage />} />
              <Route path="/tasks/:id" element={<TaskFormPage />} />
              <Route path="/profile" element={<ProfilePage />} />

              <Route element={<PrivateProfessionalRoute />}>
                <Route path="/calendar" element={<CalendarPage />} />
                <Route path="/patients" element={<PatientPage />} />
              </Route>

              <Route element={<PrivatePatientRoute />}>
                <Route path="/agendate" element={<AgendatePage />} />
                <Route path="/Professional" element={<ProfessionaPage />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TaskProvider>
  );
}

export default App;
