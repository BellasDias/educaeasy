import { useState } from 'react';
import NavBar from './components/NavBar.jsx';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import LoginSignUp from './pages/LoginSignUp.jsx';
import MundoTech from './pages/MundoTech.jsx';
import Courses from './pages/Courses.jsx';
import CourseDetail from "./pages/CourseDetail.jsx";
import MyCoursesPage from "./pages/MyCoursesPage";
import AccountPage from "./pages/AccountPage";
import { UserProvider } from "./UserContext";
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <UserProvider>
      <div>
        <NavBar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginSignUp />} />
            <Route path="/mundotech" element={<MundoTech />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:id" element={<CourseDetail />} />
            <Route path="/my-courses" element={<MyCoursesPage />} />
            <Route path="/account" element={<AccountPage />} />
          </Routes>
        </main>
      </div>
    </UserProvider>
  );
}

export default App;
