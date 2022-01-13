import React from "react";

function Duration({label, time, handleDurationChange}) {
  
  function handleChange(event) {
		switch(event.target.dataset.testid) {
			case "decrease-focus": 
        handleDurationChange(-5); 
        break;
			case "increase-focus": 
        handleDurationChange(5); 
        break;
			case "decrease-break": 
        handleDurationChange(-1); 
        break;
			case "increase-break": 
        handleDurationChange(1); 
        break;
			default: 
        console.log("Something went wrong! Check Duration.js handleChange()"); 
        break;
		}
	}
  
  return (
        <div className="input-group input-group-lg mb-2">
        <span className="input-group-text" data-testid="duration-focus">
            {label.charAt(0).toUpperCase() + label.slice(1)} Duration: {time}
        </span>
        <div className="input-group-append">
          {/* TODO: Implement decreasing focus duration and disable during a focus or break session */}
          <button
            type="button"
            className="btn btn-secondary"
            data-testid={`decrease-${label}`}
            onClick={handleChange}
          >
            <span className="oi oi-minus" />
          </button>
          {/* TODO: Implement increasing focus duration and disable during a focus or break session */}
          <button
            type="button"
            className="btn btn-secondary"
            data-testid={`increase-${label}`}
            onClick={handleChange}
          >
            <span className="oi oi-plus" />
          </button>
        </div>
      </div>
    );
}

export default Duration;