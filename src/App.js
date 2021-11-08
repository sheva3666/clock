import './App.scss';
import React, { Component } from "react";
import { render } from "react-dom";
import { useEffect, useState } from "react";
import { interval, Subject } from "rxjs";
import { Observable } from "rxjs";
import { takeUntil } from "rxjs/operators";

function App() {
  const [sec, setSec] = useState(0);
  const [status, setStatus] = useState("stop");
 
  useEffect(() => {
    const unsubscribe$ = new Subject();
    interval(1000)
      .pipe(takeUntil(unsubscribe$))
      .subscribe(() => {
        if (status === "run") {
          setSec(val => val + 1000);
        }
      });
    return () => {
      unsubscribe$.next();
      unsubscribe$.complete();
    };
  }, [status]);
 
  const start = React.useCallback(() => {
    setStatus("run");
  }, []);
 
  const stop = React.useCallback(() => {
    setStatus("stop");
    setSec(0);
  }, []);
 
  const reset = React.useCallback(() => {
    setSec(0);
  }, []);
 
  const wait = React.useCallback(() => {
    setStatus("wait");
  }, []);


  return (
    <div className="container">  
  <div className="clock">
    <div className="clock__face">
  <span> {new Date(sec).toISOString().slice(11, 19)}</span>
    </div>
    <div className="clock__btn">
  <button className="clock__btn-start btn" onClick={start}>
    Start
  </button>
  <button className="clock__btn-stop btn" onClick={stop}>
    Stop
  </button>
  <button className="clock__btn-reset btn" onClick={reset}>Reset</button>
  <button className="clock__btn-wait btn" onClick={wait}>Wait</button>
  </div>
</div>
</div>
);
    
}

export default App;
