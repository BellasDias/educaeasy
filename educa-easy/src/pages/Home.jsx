import { useNavigate } from "react-router-dom";
import esquiloImg from '../assets/landPage-elements/landPage-esquilo.png';
import firstImg from '../assets/landPage-elements/landPage-firstImage.png';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import '../css/Home.css';

function Home () {
  const navigate = useNavigate();

  const handleStartClick = () => {
    const stored = localStorage.getItem("user");
    const user = stored ? JSON.parse(stored) : null;

    if (user) {
      navigate("/courses");    // logado -> cursos
    } else {
      navigate("/login");      // não logado -> login
    }
  };

  return (
    <div>
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Comece a programar do zero</h1>
            <p><b>Rápido e Sem Complicações</b></p>
            <p>Sua jornada no mundo da tecnologia começa aqui. Cursos práticos, do básico ao avançado, para você se tornar um dev completo.</p>
            <button className="hero-button" onClick={handleStartClick}>
              Começar agora!
            </button>
          </div>
          <div className="hero-image">
            <img src={esquiloImg} alt="esquilo-educa-easy" />
          </div>
        </div>
      </section>

      <section className="future-section">
        <div className="future-content">
          <div className="future-image">
            <DotLottieReact
              src="https://lottie.host/68ab9c98-45e5-44ae-93ca-3542b9a51cae/YhtWkSj0sF.lottie"
              loop
              autoplay
              style={{ width: "300%", maxWidth: "480px" }} // ajuste aqui
            />

          </div>
          <div className="future-text">
            <h1>Construa o seu futuro na tecnologia</h1>
            <p>Com o EducaEasy você aprende as habilidades mais requisitadas do mercado e transforma sua carreira, no seu ritmo</p>
            <button className="future-button" onClick={handleStartClick}>
              Ver todos os cursos
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
