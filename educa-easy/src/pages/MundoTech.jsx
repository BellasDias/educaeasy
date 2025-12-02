import "../css/MundoTech.css";

function MundoTech() {
  return (
    <div className="mundo-tech">
      <div className="tech-hero-text">
        <h1>O Mundo da Tecnologia</h1>
        <p>
          Descubra áreas, linguagens, salários, notícias e tendências que estão
          moldando o futuro do mercado.
        </p>
        <a href="#areas" className="tech-button">
          Explorar
        </a>
      </div>

      <div className="areas" id="areas">
        <h2>Áreas da Tecnologia</h2>
        <p className="subtitle">
          Conheça os principais caminhos disponíveis no mercado tech
        </p>

        <div className="areas-grid">
          <div className="area-card">Front-end</div>
          <div className="area-card">Back-end</div>
          <div className="area-card">Full Stack</div>
          <div className="area-card">UX/UI</div>
          <div className="area-card">Banco de Dados</div>
          <div className="area-card">DevOps</div>
          <div className="area-card">Segurança da Informação</div>
          <div className="area-card">Engenharia de Dados</div>
        </div>
      </div>

      <div className="tech-news">
        <h2>Últimas Notícias</h2>
        <p className="subtitle">
          Fique por dentro do que está acontecendo no mundo tech
        </p>

        <div className="news-grid">
          <div className="news-card">
            <h3>Nubank investe em IA</h3>
            <p>
              A empresa anuncia novos sistemas inteligentes para automatizar
              processos financeiros.
            </p>
          </div>

          <div className="news-card">
            <h3>TI em alta no Brasil</h3>
            <p>
              Previsão de aumento de 30% na demanda por profissionais
              qualificados.
            </p>
          </div>

          <div className="news-card">
            <h3>Novidades no JavaScript</h3>
            <p>
              ECMAScript lança novas funcionalidades para acelerar o
              desenvolvimento.
            </p>
          </div>
        </div>
      </div>

      <div className="tech-hiring">
        <h2>Quem está contratando?</h2>
        <p className="subtitle">
          Grandes empresas em busca de profissionais tech
        </p>

        <div className="hiring-grid">
          <div className="hiring-card">IBM</div>
          <div className="hiring-card">Santander</div>
          <div className="hiring-card">VIVO</div>
          <div className="hiring-card">Nubank</div>
          <div className="hiring-card">Itaú</div>
          <div className="hiring-card">UOL</div>
          <div className="hiring-card">Serasa</div>
          <div className="hiring-card">Mercedes-Benz</div>
        </div>
      </div>

      <div className="program-languages">
        <h2>Linguagens Populares</h2>
        <p className="subtitle">
          Principais tecnologias usadas pelas empresas
        </p>

        <div className="dialect-list">
          <div className="dialect-item">JavaScript</div>
          <div className="dialect-item">Python</div>
          <div className="dialect-item">Java</div>
          <div className="dialect-item">C#</div>
          <div className="dialect-item">SQL</div>
          <div className="dialect-item">PHP</div>
          <div className="dialect-item">HTML e CSS</div>
          <div className="dialect-item">TypeScript</div>
        </div>
      </div>
    </div>
  );
}

export default MundoTech;
