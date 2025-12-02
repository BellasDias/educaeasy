import React, { useEffect, useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import CourseCard from "../components/CourseCard";
import "../css/Courses.css";

function CoursesPage() {
  const [cursos, setCursos] = useState([]);

  useEffect(() => {
    fetch("http://localhost/backend/listar_cursos.php")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setCursos(data);
      })
      .catch((err) => console.error("Erro ao carregar cursos", err));
  }, []);

  return (
    <div className="courses-page">
      {/* Hero da listagem */}
      <section className="courses-hero">
        <div className="courses-hero-content">
          <div className="courses-hero-text">
            <h1>Todos os cursos disponíveis</h1>
            <p>
              Explore trilhas de estudo pensadas para você começar do zero
              ou avançar na sua carreira em tecnologia.
            </p>
          </div>
          <div className="courses-hero-animation">
            <DotLottieReact
              src="https://lottie.host/c30cd05c-7a30-4f19-acf5-b718553981b0/w6adhbRw4q.lottie"
              loop
              autoplay
              style={{ width: "360px", height: "360px"  }}
            />
          </div>
        </div>
      </section>

      {/* Lista de cards */}
      <main className="courses-main">
        <div className="courses-list">
          {cursos.map((curso) => (
            <CourseCard
              key={curso.id}
              id={curso.slug}
              title={curso.titulo}
              description={curso.descricao}
              duration={curso.duracao}
              level={curso.nivel}
              skills={curso.habilidades.map((h) => ({ name: h }))}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default CoursesPage;
