import React, { useEffect, useState } from "react";

const Typewriter = ({ text }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let currentIndex = 0;

    const intervalId = setInterval(() => {
      setDisplayedText((prevText) => prevText + text[currentIndex]);
      currentIndex++;

      if (currentIndex === text.length) {
        clearInterval(intervalId);
      }
    }, 100); // Adjust the interval as needed

    return () => clearInterval(intervalId);
  }, [text]);

  return <div>{displayedText}</div>;
};

const App = () => {
  const data =
    "Saladin is the Western name of Salah al-Din Yusuf ibn Ayyub, the Muslim sultan of Egypt and Syria who famously defeated a massive army of Crusaders in the Battle of Hattin and captured the city of Jerusalem in 1187.";

  return (
    <div>
      <Typewriter text={data} />
    </div>
  );
};

export default App;
