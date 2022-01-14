import React from "react";
import { minutesToDuration, secondsToDuration } from "../utils/duration";

function SessionProgress({session, time, isTimerRunning}) {
  if(!session) return null;
  const countdown = secondsToDuration(session?.timeRemaining);
  const showTimeRemaining = countdown + " remaining";
  const percent = 100 - ((session?.timeRemaining / (time * 60)) * 100);

  return (
    <div>
      <div className="row mb-2">
      <div className="col">
        <h2 data-testid="session-title">
          {session?.label} for {minutesToDuration(time)} minutes
        </h2>
        <p className="lead" data-testid="session-sub-title">
          {showTimeRemaining}
        </p>
      </div>
    </div>
    <div className="row mb-2">
      <div className="col">
        <div className="progress" style={{ height: "20px" }}>
          <div
            className="progress-bar"
            role="progressbar"
            aria-valuemin="0"
            aria-valuemax="100"
            aria-valuenow={percent} 
            style={{ width: `${percent}%` }} 
          />
        </div>
      </div>
    </div>
  </div>
);
    
}

export default SessionProgress;