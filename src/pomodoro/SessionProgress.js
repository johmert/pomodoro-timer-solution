import React from "react";
import { minutesToDuration, secondsToDuration } from "../utils/duration";

function SessionProgress({session, time, isTimerRunning}) {
  if(!isTimerRunning) return null;
  const countdown = secondsToDuration(session?.timeRemaining);
  const showTimeRemaining = countdown + " remaining";

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
            aria-valuenow={countdown / time} // TODO: Increase aria-valuenow as elapsed time increases
            style={{ width: `${countdown/time}` }} // TODO: Increase width % as elapsed time increases
          />
        </div>
      </div>
    </div>
  </div>
);
    
}

export default SessionProgress;