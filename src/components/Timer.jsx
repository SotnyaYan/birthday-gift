import { useEffect, useState } from "react";


export default function Timer({finishTime}) {

  const [time, setTime] = useState(
    finishTime - Date.now()
  );


  useEffect(()=>{

    const interval = setInterval(()=>{

      setTime(
        finishTime - Date.now()
      );

    },1000);


    return ()=>clearInterval(interval);

  },[finishTime]);


  if(time <=0){
    return (
      <div className="ready">
        🎁 гостинец готов!
      </div>
    );
  }


  const minutes = Math.floor(
    time / 1000 / 60
  );

  const seconds = Math.floor(
    (time / 1000) % 60
  );


  return (
    <div className="timer">

      Следующий гостинец через:

      <br/>

      <b>
        {minutes}:{seconds
          .toString()
          .padStart(2,"0")}
      </b>

    </div>
  );
}