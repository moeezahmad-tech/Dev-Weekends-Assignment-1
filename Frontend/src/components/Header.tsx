const Header = () => {
  return (
    <section className="hero" id="home">
      <div className="hero__content">
        <span className="hero__badge">Welcome</span>
        <h1>
          Enjoy Your <br />
          <span>Delicious Food</span>
        </h1>
        <p>
          Experience the finest gourmet cuisine delivered right to your
          doorstep within 30 minutes. If we fail, the meal is on us.
        </p>
        <div className="hero__actions">
          <button className="hero__primary" type="button">Order Now</button>
          <button className="hero__secondary" type="button">Watch Video</button>
        </div>
      </div>
      <div className="hero__image">
        <img src="/food.png" alt="Signature dish" />
      </div>
    </section>
  );
};

export default Header;
