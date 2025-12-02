import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../css/CourseDetail.css";

function CourseDetail() {
  const { id } = useParams(); // slug
  const [course, setCourse] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [saving, setSaving] = useState(false);

  const user = (() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  })();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await fetch(
          `http://localhost/backend/curso_detalhe.php?slug=${id}`
        );
        const data = await res.json();
        console.log("DETALHE CURSO:", data);

        if (data.success) {
          const cursoComModulos = {
            ...data.curso,
            modulos: [
              {
                titulo: "Introdução ao HTML",
                conteudo:
                  "Tags básicas, estrutura de documento, parágrafos, imagens e links."
              },
              {
                titulo: "Layouts com CSS",
                conteudo:
                  "Box model, flexbox, grid e boas práticas de organização."
              },
              {
                titulo: "Responsividade",
                conteudo:
                  "Media queries, unidades relativas e adaptação para mobile."
              }
            ]
          };
          setCourse(cursoComModulos);
        } else {
          setCourse(null);
        }
      } catch (e) {
        console.error("Erro ao carregar curso", e);
        setCourse(null);
      }
    };

    fetchCourse();
  }, [id]);

  const toggleModule = (index) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };



  const handleAddToMyCourses = async () => {
  if (!user) {
    alert("Você precisa estar logado para adicionar aos seus cursos.");
    return;
  }
  if (!course) return;

  // AQUI o log:
  console.log("ADD CURSO:", { usuario_id: user.id, curso_id: course.id });

  setSaving(true);
  try {
    const res = await fetch("http://localhost/backend/comecar_curso.php", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        usuario_id: user.id,
        curso_id: course.id,
      }),
    });
    const data = await res.json();
    console.log("RESPOSTA ADD CURSO:", data);
    alert(data.message);
  } catch (e) {
    alert("Erro ao adicionar o curso.");
  } finally {
    setSaving(false);
  }
};


  if (!course) {
    return (
      <div className="course-page">
        <div className="course-container">
          <p>Curso não encontrado.</p>
        </div>
      </div>
    );
  }

  return (
  <div className="course-page">
    <div className="course-container">
      <header className="course-header">
        <h1 className="course-title">{course.titulo}</h1>
        <p className="course-description">{course.descricao}</p>
      </header>

      <section className="course-modules">
        <h2 className="course-modules-title">Módulos do curso</h2>
        <div className="modules-list">
          {course.modulos.map((mod, index) => {
            const isOpen = index === activeIndex;
            return (
              <div
                key={mod.titulo}
                className={`module-item ${isOpen ? "module-item--open" : ""}`}
              >
                <button
                  className="module-header"
                  onClick={() => toggleModule(index)}
                >
                  <span>{mod.titulo}</span>
                  <span
                    className={`module-arrow ${
                      isOpen ? "module-arrow--open" : ""
                    }`}
                  >
                    ▾
                  </span>
                </button>
                <div
                  className="module-body"
                  style={{
                    maxHeight: isOpen ? "200px" : "0px"
                  }}
                >
                  <p>{mod.conteudo}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <div className="course-actions">
        <button
          className="course-start-button"
          onClick={handleAddToMyCourses}
          disabled={saving}
        >
          {saving ? "Salvando..." : "Adicionar a Meus Cursos"}
        </button>
      </div>
    </div>
  </div>
);

}

export default CourseDetail;
