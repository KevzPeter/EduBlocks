import "../styles/Footer.css";

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <div className="footer">
      <p>&copy;{year} Kevin Kuriakose</p>
      <div className="links">
        <a
          href="https://github.com/kevzpeter"
          referrerPolicy="no-referrer"
          target="_blank"
        >
          <i className="fab fa-github-square"></i>
        </a>
        <a
          href="https://linkedin.com/in//kevinpeterk"
          referrerPolicy="no-referrer"
          target="_blank"
        >
          <i className="fab fa-linkedin"></i>
        </a>
      </div>
    </div>
  );
};

export default Footer;
