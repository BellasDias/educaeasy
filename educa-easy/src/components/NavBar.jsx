import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import "../css/NavBar.css";
import UserDrawer from "../components/UserDrawer";
import { UserContext } from "../UserContext";

function NavBar() {
  const { user, setUser } = useContext(UserContext);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setDrawerOpen(false);
    navigate("/login");
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-logo">
          <Link to="/">EducaEasy</Link>
        </div>

        <div className="navbar-links">
          <Link to="/courses">Cursos</Link>
          <Link to="/mundotech">Mundo Tech</Link>
        </div>

        <div className="navbar-login">
          {user ? (
            <button
              className="navbar-user-button"
              onClick={() => setDrawerOpen(true)}
            >
              Olá, {user.nome}
            </button>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
      </nav>

      {user && (
        <UserDrawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          user={user}
          onLogout={handleLogout}
        />
      )}
    </>
  );
}

export default NavBar;
