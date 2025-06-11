import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

const ScrollTop = () => {

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button className="scroll-to-top-button" onClick={scrollToTop}>
        <FontAwesomeIcon icon={faArrowUp} className="information-arrow-icon" />
    </button>
  );
};

export default ScrollTop;