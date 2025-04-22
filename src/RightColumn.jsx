import React from 'react';
import './App.css';

const RightColumn = () => {
  return (
    <div className="mask">
      <div className="col col-r">
        <div id="page16" className="full-page right-page">
          <img src="/src/assets/Contact.webp" alt="Background" className="background-img" />
        </div>
        <div id="page14" className="full-page right-page">
          <img src="/src/assets/Prisma Lab.png" alt="Background" className="background-img" />
        </div>
        <div id="page12" className="full-page right-page">
          <img src="/src/assets/Prisma Espace Déco.png" alt="Background" className="background-img" />
        </div>
        <div id="page10" className="full-page right-page">
          <img src="/src/assets/Prisma Logistique.png" alt="Background" className="background-img" />
        </div>
        <div id="page8" className="full-page right-page">
          <img src="/src/assets/Prisma Studio.png" alt="Background" className="background-img" />
        </div>
        <div id="page6" className="full-page right-page">
          <img src="/src/assets/PrismaEvents.png" alt="Background" className="background-img" />
        </div>
        <div id="page4" className="full-page right-page">
          <img src="/src/assets/PrismaGroupe.png" alt="Background" className="background-img" />
        </div>
        <div id="page2" className="full-page right-page">
          <img src="/src/assets/about-us-1.jpg" alt="Background" className="background-img" />
        </div>
      </div>
    </div>
  );
};

export default RightColumn;