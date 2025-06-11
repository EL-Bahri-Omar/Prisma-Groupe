import React from 'react';
import './../styles/PrismaStyles/Footer.css';

const Footer = () => {
  return (
    <footer className="Footer">
      <div className="FooterContent">
        <div className="FooterColumn">
          <h3>TUNISIE</h3>
          <div className="ContactItem">
            <span className="Icon PhoneIcon"></span>
            <p>+216 31 444 129</p>
          </div>
          <div className="ContactItem">
            <span className="Icon EmailIcon"></span>
            <p>contact@prisma-groupe.com</p>
          </div>
          <div className="ContactItem">
            <span className="Icon LocationIcon"></span>
            <p>29, Rue de l'Energie Solaire,<br />Z.I. charguia I Tunis 2035</p>
          </div>
        </div>

        <div className="FooterColumn">
          <h3>DUBAI</h3>
          <div className="ContactItem">
            <span className="Icon PhoneIcon"></span>
            <p>+971525619311</p>
          </div>
          <div className="ContactItem">
            <span className="Icon EmailIcon"></span>
            <p>ae.contact@prisma-groupe.com</p>
          </div>
          <div className="ContactItem">
            <span className="Icon LocationIcon"></span>
            <p>The Fashion Coterie FZ-LLC<br />HD02A Ground Floor, IN5 Design, DUBAI, U.A.E</p>
          </div>
        </div>

        <div className="FooterColumn">
          <h3>QATAR</h3>
          <div className="ContactItem">
            <span className="Icon PhoneIcon"></span>
            <p>+974 5003 0297</p>
          </div>
          <div className="ContactItem">
            <span className="Icon EmailIcon"></span>
            <p>qa.contact@prisma-groupe.com</p>
          </div>
          <div className="ContactItem">
            <span className="Icon LocationIcon"></span>
            <p>Royal plaza Business Hub 4th floor<br />Doha Qatar</p>
          </div>
        </div>

        <div className="FooterColumn">
          <h3>LUXEMBOURG</h3>
          <div className="ContactItem">
            <span className="Icon PhoneIcon"></span>
            <p>+00352 26745252</p>
          </div>
          <div className="ContactItem">
            <span className="Icon EmailIcon"></span>
            <p>lu.contact@prisma-groupe.com</p>
          </div>
          <div className="ContactItem">
            <span className="Icon LocationIcon"></span>
            <p>6, route d'Echternach<br />L-6617 Wasserbillig Luxembourg</p>
          </div>
        </div>

        <div className="FooterColumn">
          <h3>TCHÉQUIE</h3>
          <div className="ContactItem">
            <span className="Icon PhoneIcon"></span>
            <p>+420 776 593 628</p>
          </div>
          <div className="ContactItem">
            <span className="Icon EmailIcon"></span>
            <p>cz.contact@prisma-group.com</p>
          </div>
          <div className="ContactItem">
            <span className="Icon LocationIcon"></span>
            <p>Žabí 1033/2 brno 64100, Czechia</p>
          </div>
        </div>
      </div>

      <div className="SocialIcons">
        <a href="https://www.facebook.com/profile.php?id=61573906960120" className="social-icon" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-facebook-f Facebook"></i>
        </a>
        <a href="https://www.instagram.com/prisma_groupe/#" className="social-icon" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-instagram Instagram"></i>
        </a>
        <a href="https://www.linkedin.com/in/prisma-groupe-a40591364/overlay/about-this-profile/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base%3BrOjzKXuwRv6pxifZuMXEQA%3D%3D" className="social-icon" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-linkedin-in Linkedin"></i>
        </a>
      </div>

      <div className="Copyright">
        Copyright © PRISMA DIGITAL - 2025 - Tous droits réservés
      </div>
    </footer>
  );
};

export default Footer;