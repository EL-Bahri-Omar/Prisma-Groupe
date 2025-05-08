import React from 'react';
import '../../App.css';

const RightColumn = () => {
  return (
    <div className="mask">
      <div className="col col-r">
        <div id="page16" className="full-page right-page">
          <img src="/src/assets/home/contact.png" alt="Background" className="background-img" />
        </div>
        <div id="page14" className="full-page right-page">
          <img src="/src/assets/home/audio2.png" alt="Background" className="background-img" />
        </div>
        <div id="page12" className="full-page right-page">
          <img src="/src/assets/home/distribution2.png" alt="Background" className="background-img" style={{ backgroundImage: 'url("/src/assets/home/studio1.png")'}}/>
        </div>
        <div id="page10" className="full-page right-page">
          <img src="/src/assets/home/digital2.png" alt="Background" className="background-img" />
        </div>
        <div id="page8" className="full-page right-page">
          <img src="/src/assets/home/spazio2.png" alt="Background" className="background-img" />
        </div>
        <div id="page6" className="full-page right-page">
          <img src="/src/assets/home/venue2.png" alt="Background" className="background-img" />
        </div>
        <div id="page4" className="full-page right-page">
          <img src="/src/assets/home/live2.png" alt="Background" className="background-img" />
        </div>
        <div id="page2" className="full-page right-page">
          <img src="/src/assets/home/groupe2.png" alt="Background" className="background-img" style={{ backgroundColor: '#014351'}}/>
        </div>
      </div>
    </div>
  );
};

export default RightColumn;