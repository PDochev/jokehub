import { useState, useEffect } from "react";

function DailyJokes() {
  const [jokes, setJokes] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `https://v2.jokeapi.dev/joke/Programming?type=twopart`
      );
      const data = await response.json();
      console.log(data);
      setJokes(data);
    }
    fetchData();
  }, []);

  return (
    <div className=" flex flex-col items-center justify-center rounded gap-3 mt-12 p-8 ">
      <h3 className="focus-in-expand  text-center scroll-m-20 text-4xl font-semibold tracking-tight">
        Joke of the Day
      </h3>
      {/* @ts-expect-error type */}
      <p className="leading-7 text-xl text-center [&:not(:first-child)]:mt-6">
        {jokes.setup}
      </p>
      <p className="border-b font-bold leading-7 [&:not(:first-child)]:mt-6">
        {jokes.delivery}
      </p>
    </div>
  );
}

export default DailyJokes;
