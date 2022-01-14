import React from "react";

function Duration({mode, time, handleDurationChange, isTimerRunning}) {
  
  function handleChange(event) {
		switch(event.currentTarget.dataset.testid) {
			case "decrease-focus": 
        handleDurationChange(-5, "focus"); 
        break;
			case "increase-focus": 
        handleDurationChange(5, "focus"); 
        break;
			case "decrease-break": 
        handleDurationChange(-1, "break"); 
        break;
			case "increase-break": 
        handleDurationChange(1, "break"); 
        break;
			default: 
        console.log("Something went wrong! Check Duration.js handleChange()"); 
        break;
		}
	}
  
  return (
        <div className="input-group input-group-lg mb-2">
        <span className="input-group-text" data-testid="duration-focus">
            {mode.charAt(0).toUpperCase() + mode.slice(1)} Duration: {time}
        </span>
        <div className="input-group-append">
          {/* TODO: Implement decreasing focus duration and disable during a focus or break session */}
          <button
            type="button"
            className="btn btn-secondary"
            data-testid={`decrease-${mode}`}
            onClick={handleChange}
            disabled={isTimerRunning}
          >
            <span className="oi oi-minus" />
          </button>
          {/* TODO: Implement increasing focus duration and disable during a focus or break session */}
          <button
            type="button"
            className="btn btn-secondary"
            data-testid={`increase-${mode}`}
            onClick={handleChange}
            disabled={isTimerRunning}
          >
            <span className="oi oi-plus" />
          </button>
        </div>
      </div>
    );
}

export default Duration;