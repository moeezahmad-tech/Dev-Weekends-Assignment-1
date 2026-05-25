const Navbar = () => {
  return (
    <header className="site-nav">
      <div className="site-nav__inner">
        <div className="site-nav__brand">
          <img src="/Logo.jpg" alt="Khadya logo" />
          <span>Khadya</span>
        </div>
        <nav className="site-nav__links">
          <a href="/#home">Home</a>
          <a href="/#menu">Menu</a>
          <a href="/dashboard">Dashboard</a>
          <a href="/cart">Cart</a>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
