
import '../styles sheet/clock.css';
import React, { useEffect, useRef, useState } from 'react';

const Clock = () => {
  const [timerDays, setTimerDays] = useState('00');
  const [timerHours, setTimerHours] = useState('00');
  const [timerMinutes, setTimerMinutes] = useState('00');
  const [timerSeconds, setTimerSeconds] = useState('00');

  let interval = useRef();

  const startTimer = () => {
    const countdownDate = new Date('Oct 10,2022 00:00:00').getTime();

    interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countdownDate - now;

      const days= Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24) / (1000 * 60 * 60)));
      const minutes = Math.floor(distance % (1000 * 60 * 60) / (1000 * 60));
      const seconds = Math.floor(distance % (1000 * 60 ) / (1000));

      if(distance < 0){
        //stop our timer
        clearInterval(interval.current);
      }else{
        //update timer
        setTimerDays(days);
        setTimerHours(hours);
        setTimerMinutes(minutes);
        setTimerSeconds(seconds);
      }

    }, 1000);
  };

  //componentDidMount
  useEffect(() => {
    startTimer();
    return () => {
      clearInterval(interval.current);
    };
  });

  return (
    <section className ="timer-container">
      <section className ="timer">
        <div className = "tittle">
          
          <h2>Inicio del campeonato:</h2>
         
        </div>
        <div>
            <section>
                <p>{timerDays}</p>
                <p>Día(s)</p>
            </section>
            <span>:</span>

            <section>
                <p>{timerHours}</p>
                <p>Hora(s)</p>
            </section>
            <span>:</span>

            <section>
                <p>{timerMinutes}</p>
                <p>Minuto(s)</p>
            </section>
            <span>:</span>

            <section>
                <p>{timerSeconds}</p>
                <p>Segundo(s)</p>
            </section>
            
        </div>
      </section>

    </section>
  );
}

export default Clock;
