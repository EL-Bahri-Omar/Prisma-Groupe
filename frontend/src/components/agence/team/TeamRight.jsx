import React from 'react';
import '../../../App.css';

const TeamRight = ({ teamMembers }) => {
  return (
    <div className="mask">
      <div className="col col-r">
        {teamMembers?.map((member, index) => (
          <div 
            key={member._id} 
            id={`page${(teamMembers.length - index) * 2}`} 
            className="full-page right-page"
          >
            <img 
              src={member.image.url} 
              alt={member.name} 
              className="background-img" 
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamRight;