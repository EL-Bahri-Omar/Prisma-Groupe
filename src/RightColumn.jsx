import React from 'react';
import './App.css';

const RightColumn = () => {
  return (
    <div className="mask">
      <div className="col col-r">
        <div id="page16" className="full-page right-page">
          <img src="/src/assets/home/contact.png" alt="Background" className="background-img" />
        </div>
        <div id="page14" className="full-page right-page">
          <img src="/src/assets/home/travel.png" alt="Background" className="background-img" />
        </div>
        <div id="page12" className="full-page right-page">
          <img src="/src/assets/home/studio.png" alt="Background" className="background-img" style={{ backgroundImage: 'url("/src/assets/home/studio1.png")'}}/>
        </div>
        <div id="page10" className="full-page right-page">
          <img src="/src/assets/home/digital.png" alt="Background" className="background-img" />
        </div>
        <div id="page8" className="full-page right-page">
          <img src="/src/assets/home/space2.png" alt="Background" className="background-img" />
        </div>
        <div id="page6" className="full-page right-page">
          <img src="/src/assets/home/logistic.png" alt="Background" className="background-img" />
        </div>
        <div id="page4" className="full-page right-page">
          <img src="/src/assets/home/event.png" alt="Background" className="background-img" />
        </div>
        <div id="page2" className="full-page right-page">
          <img src="/src/assets/home/statut.png" alt="Background" className="background-img" style={{ backgroundColor: '#014351'}}/>
        </div>
      </div>
    </div>
  );
};

export default RightColumn;