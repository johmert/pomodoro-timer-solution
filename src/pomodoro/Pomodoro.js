import React, { useState } from "react";
import useInterval from "../utils/useInterval";
import { minutesToDuration } from "../utils/duration";
import Controls from "./Controls";
import Duration from "./Duration";
import SessionProgress from "./SessionProgress";

// These functions are defined outside of the component to ensure they do not have access to state
// and are, therefore, more likely to be pure.

/**
 * Update the session state with new state after each tick of the interval.
 * @param prevState
 *  the previous session state
 * @returns
 *  new session state with timing information updated.
 */
function nextTick(prevState) {
  const timeRemaining = Math.max(0, prevState.timeRemaining - 1);
  return {
    ...prevState,
    timeRemaining,
  };
}

/**
 * Higher-order function that returns a function to update the session state with the next session type upon timeout.
 * @param focusDuration
 *    the current focus duration
 * @param breakDuration
 *    the current break duration
 * @returns
 *  function to update the session state.
 */


function Pomodoro() {
  // Timer starts out paused
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  // The current session - null where there is no session running
  const [session, setSession] = useState(null);

  const initial = {focus : 25, break : 5}

  const [focusDuration, setFocusDuration] = useState(initial.focus);
  const [breakDuration, setBreakDuration] = useState(initial.break);

  const handleDurationChange =  (change, mode)  => {
    const focusMax = 60;
    const focusMin = 5;
    const breakMax = 15;
    const breakMin = 1;
    
    if(mode === "focus"){
      change < 0 ? 
        setFocusDuration(currentFocusDuration => Math.max(currentFocusDuration + change, focusMin)) :
        setFocusDuration(currentFocusDuration => Math.min(currentFocusDuration + change, focusMax));
    } else if(mode === "break"){
      change < 0 ?
        setBreakDuration(currentBreakDuration => Math.max(currentBreakDuration + change, breakMin)) :
        setBreakDuration(currentBreakDuration => Math.min(currentBreakDuration + change, breakMax));
    }
  };


  function nextSession(focusDuration, breakDuration) {
    /**
     * State function to transition the current session type to the next session. e.g. On Break -> Focusing or Focusing -> On Break
     */
    return (currentSession) => {
      if (currentSession.label === "Focusing") {
        return {
          label: "On Break",
          timeRemaining: breakDuration * 60,
          time : breakDuration
        };
      }
      return {
        label: "Focusing",
        timeRemaining: focusDuration * 60,
        time : focusDuration
      };
    };
  }

  /**
   * Custom hook that invokes the callback function every second
   *
   * NOTE: You won't need to make changes to the callback function
   */
  useInterval(() => {
      if (session.timeRemaining === 0) {
        new Audio("https://bigsoundbank.com/UPLOAD/mp3/1482.mp3").play();
        return setSession(nextSession(focusDuration, breakDuration));
      }
      return setSession(nextTick);
    },
    isTimerRunning ? 1000 : null
  );

  /**
   * Called whenever the play/pause button is clicked.
   */
  function playPause() {
    setIsTimerRunning((prevState) => {
      const nextState = !prevState;
      if (nextState) {
        setSession((prevStateSession) => {
          // If the timer is starting and the previous session is null,
          // start a focusing session.
          if (prevStateSession === null) {
            return {
              label: "Focusing",
              timeRemaining: focusDuration * 60,
              time : focusDuration
            };
          }
          return prevStateSession;
        });
      }
      return nextState;
    });
  }

  return (
    <div className="pomodoro">
      <div className="row">
        <div className="col">
          <Duration mode="focus" time={minutesToDuration(focusDuration)}  handleDurationChange={handleDurationChange} />
        </div>
        <div className="col">
          <div className="float-right">
            <Duration mode="break" time={minutesToDuration(breakDuration)} handleDurationChange={handleDurationChange} />
          </div>
        </div>
      </div>
      <Controls isTimerRunning={isTimerRunning} playPause={playPause}/>
      <SessionProgress session={session} time={minutesToDuration(session?.time)}/>
    </div>
  );
}

export default Pomodoro;
