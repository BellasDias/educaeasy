import React, { useEffect, useState } from "react";
import "../css/AccountPage.css";

function AccountPage() {
  const stored = localStorage.getItem("user");
  const initialUser = stored ? JSON.parse(stored) : null;

  const [nome, setNome] = useState(initialUser?.nome || "");
  const [email, setEmail] = useState(initialUser?.email || "");
  const [cursos, setCursos] = useState([]);
  const [savingUser, setSavingUser] = useState(false);
  const [removingId, setRemovingId] = useState(null);

  useEffect(() => {
    if (!initialUser) return;

    fetch(
      `http://localhost/backend/meus_cursos.php?usuario_id=${initialUser.id}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setCursos(data);
      })
      .catch((err) => console.error("Erro ao carregar cursos do usuário", err));
  }, []);

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    if (!initialUser) return;

    setSavingUser(true);
    try {
      const res = await fetch("http://localhost/backend/atualizar_usuario.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          id: initialUser.id,
          nome,
          email,
        }),
      });
      const data = await res.json();
      alert(data.message);

      if (data.success) {
        localStorage.setItem(
          "user",
          JSON.stringify({ ...initialUser, nome, email })
        );
      }
    } catch (e) {
      alert("Erro ao atualizar dados.");
    } finally {
      setSavingUser(false);
    }
  };

  const handleRemoveCourse = async (usuarioCursoId) => {
    setRemovingId(usuarioCursoId);
    try {
      const res = await fetch(
        "http://localhost/backend/remover_curso_usuario.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({ usuario_curso_id: usuarioCursoId }),
        }
      );
      const data = await res.json();
      alert(data.message);

      if (data.success) {
        setCursos((prev) =>
          prev.filter((c) => c.usuario_curso_id !== usuarioCursoId)
        );
      }
    } catch (e) {
      alert("Erro ao remover curso.");
    } finally {
      setRemovingId(null);
    }
  };

  if (!initialUser) {
    return (
      <div className="account-page">
        <div className="account-container">
          <p>Você precisa estar logado para acessar esta página.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="account-page">
      <div className="account-container">
        <h1 className="account-title">Minha conta</h1>

        <section className="account-section">
          <h2 className="account-subtitle">Dados pessoais</h2>
          <form className="account-form" onSubmit={handleSaveProfile}>
            <label>
              Nome
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </label>

            <label>
              E-mail
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>

            <button type="submit" disabled={savingUser}>
              {savingUser ? "Salvando..." : "Salvar dados"}
            </button>
          </form>
        </section>

        <section className="account-section">
          <h2 className="account-subtitle">Cursos no seu perfil</h2>
          {cursos.length === 0 && (
            <p className="account-empty">Você ainda não adicionou cursos.</p>
          )}

          <div className="account-courses-grid">
            {cursos.map((curso) => (
              <article
                key={curso.usuario_curso_id}
                className="account-course-card"
              >
                <h3>{curso.titulo}</h3>
                <p>{curso.descricao_curta}</p>
                <button
                  onClick={() => handleRemoveCourse(curso.usuario_curso_id)}
                  disabled={removingId === curso.usuario_curso_id}
                >
                  {removingId === curso.usuario_curso_id
                    ? "Removendo..."
                    : "Remover do perfil"}
                </button>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default AccountPage;
