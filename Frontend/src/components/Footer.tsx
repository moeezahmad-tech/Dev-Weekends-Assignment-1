const Footer = () => {
  return (
    <footer className="site-footer" id="contact">
      <div className="site-footer__inner">
        <div className="site-footer__brand">
          <img src="/Logo.jpg" alt="Khadya logo" />
          <p>
            Delivering the freshest and most delicious meals with a passion
            for quality and service.
          </p>
        </div>
        <div>
          <h4>Company</h4>
          <ul>
            <li>About Us</li>
            <li>Our Chefs</li>
            <li>Careers</li>
            <li>Blog</li>
          </ul>
        </div>
        <div>
          <h4>Support</h4>
          <ul>
            <li>Help Center</li>
            <li>Contact Us</li>
            <li>FAQ</li>
            <li>Safety</li>
          </ul>
        </div>
      </div>
      <div className="site-footer__bottom">© 2024 Khadya Gourmet.</div>
    </footer>
  );
};

export default Footer;
