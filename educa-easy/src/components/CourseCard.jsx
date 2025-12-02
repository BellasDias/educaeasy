import React from "react";
import { Link } from "react-router-dom";
import "../css/CourseCard.css";
import clockIcon from "../assets/icons/Clock.png";
import starIcon from "../assets/icons/star_filled.png";

function CourseCard({
  id,
  title,
  description,
  skills = [],
  duration,
  level,
  rightIcon = "❤",
}) {
  return (
    <Link to={`/courses/${id}`} className="course-card-link">
      <section className="course-card">
        {/* Esquerda */}
        <div className="card-left">
          <h2 className="course-title">{title}</h2>
          <p className="course-description">{description}</p>

          <div className="skills">
            {skills.map((skill) => (
              <span className="skill-pill" key={skill.name}>
                {skill.icon && <img src={skill.icon} alt={skill.name} />}
                {skill.name}
              </span>
            ))}
          </div>

          <button className="start-button">Começar agora!</button>

          <div className="course-meta">
            <span>
              <img src={clockIcon} alt="Duração" className="icon" />
              {duration}
            </span>
            <span>
              <img src={starIcon} alt="Nível" className="icon" />
              Nível: {level}
            </span>
          </div>
        </div>

        {/* Direita */}
        <div className="card-right">
          <div className="heart-box">
            <span className="heart">{rightIcon}</span>
          </div>
        </div>
      </section>
    </Link>
  );
}

export default CourseCard;
