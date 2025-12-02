import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import PopUp from "../components/PopUp";
import "../css/Login.css";
import { UserContext } from "../UserContext";

function LoginSignUp() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleClosePopup = () => setShowPopup(false);

  // CADASTRO: cria usuário e já loga
  const cadastrar = async () => {
    if (!nome || !email || !senha) {
      setPopupMessage("Preencha todos os campos!");
      setShowPopup(true);
      return;
    }

    try {
      const response = await fetch("http://localhost/backend/cadastro.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ nome, email, senha }),
      });
      const data = await response.json();

      if (!data.success) {
        setPopupMessage(data.message || "Erro ao cadastrar.");
        setShowPopup(true);
        return;
      }

      const loggedUser = {
        id: data.id,
        nome: data.nome,
        email: data.email,
      };

      localStorage.setItem("user", JSON.stringify(loggedUser));
      setUser(loggedUser);
      navigate("/courses");
    } catch (e) {
      setPopupMessage("Erro ao cadastrar. Tente novamente.");
      setShowPopup(true);
    }
  };

  // LOGIN: entra com conta já existente
  const logar = async () => {
    if (!email || !senha) {
      setPopupMessage("Preencha todos os campos!");
      setShowPopup(true);
      return;
    }

    try {
      const response = await fetch("http://localhost/backend/login.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ email, senha }),
      });

      const raw = await response.text();
      let data;
      try {
        data = JSON.parse(raw);
      } catch {
        setPopupMessage("Resposta inválida do servidor.");
        setShowPopup(true);
        return;
      }

      if (!data.success) {
        setPopupMessage("Credenciais inválidas ou conta não existe.");
        setShowPopup(true);
        return;
      }

      const loggedUser = {
        id: data.id,
        nome: data.nome,
        email: data.email,
      };

      localStorage.setItem("user", JSON.stringify(loggedUser));
      setUser(loggedUser);
      navigate("/courses");
    } catch (error) {
      console.error("ERRO FETCH LOGIN:", error);
      setPopupMessage("Erro ao conectar ao servidor.");
      setShowPopup(true);
    }
  };

  const toggleMode = () => {
    setIsSignUp((prev) => !prev);
    setNome("");
    setSenha("");
  };

  return (
    <div className="page-login">
      <div className="container">
        <div className="header">
          <div className="text">{isSignUp ? "Cadastrar-se" : "Entrar"}</div>
          <div className="underline"></div>
        </div>

        <div className="inputs">
          <div className="iputs">
            {isSignUp && (
              <div className="input">
                <input
                  type="text"
                  placeholder="Nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
              </div>
            )}
            <div className="input">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input">
              <input
                type="password"
                placeholder="Senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
            </div>
          </div>

          {/* texto embaixo para trocar de modo */}
          {!isSignUp ? (
            <div className="forgot-password">
              Ainda não tem conta?{" "}
              <span onClick={toggleMode}>Cadastrar-se</span>
            </div>
          ) : (
            <div className="forgot-password">
              Já tem conta?{" "}
              <span onClick={toggleMode}>Entrar</span>
            </div>
          )}
        </div>

        <div className="submit-container">
          {isSignUp ? (
            <div className="submit" onClick={cadastrar}>
              Cadastrar-se
            </div>
          ) : (
            <div className="submit" onClick={logar}>
              Entrar
            </div>
          )}
        </div>
      </div>

      {showPopup && (
        <PopUp message={popupMessage} onClose={handleClosePopup} />
      )}
    </div>
  );
}

export default LoginSignUp;
