import React, { useEffect, useState } from "react";
import "../css/MyCourses.css";

function MyCoursesPage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    const user = stored ? JSON.parse(stored) : null;
    if (!user) return;

    // depois você troca para um endpoint real, ex: meus_cursos.php?usuario_id=...
    fetch(`http://localhost/backend/meus_cursos.php?usuario_id=${user.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setItems(data);
        }
      })
      .catch((err) => console.error("Erro ao carregar meus cursos", err));
  }, []);

  return (
    <div className="mycourses-page">
      <div className="mycourses-container">
        <h1 className="mycourses-title">Meus cursos</h1>

        <div className="mycourses-grid">
          {items.map((curso) => (
            <article key={curso.id} className="mycourse-card">
              <header className="mycourse-header">
                <h2 className="mycourse-name">{curso.titulo}</h2>
                <p className="mycourse-desc">{curso.descricao_curta}</p>
              </header>

              <div className="mycourse-badges">
                {curso.habilidades.map((h) => (
                  <span key={h} className="mycourse-badge">
                    {h}
                  </span>
                ))}
              </div>

              <div className="mycourse-progress-wrap">
                <div className="mycourse-progress-top">
                  <span>Progresso</span>
                  <span className="mycourse-progress-value">
                    {curso.progresso}%{/* 0–100 */}
                  </span>
                </div>
                <div className="mycourse-progress-bar">
                  <div
                    className="mycourse-progress-fill"
                    style={{ width: `${curso.progresso}%` }}
                  />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyCoursesPage;
