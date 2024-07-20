import JokeCard from "@/components/JokeCard";
import supabase from "../config/supabaseClient";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";

function MyJokes() {
  const [jokes, setJokes] = useState<{ id: string }[]>([]);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    setJokes((prevJoke) => prevJoke.filter((joke) => joke.id !== id));
  };

  useEffect(() => {
    const fetchJokes = async () => {
      const { data, error } = await supabase.from("makemelaugh").select();

      if (error) {
        setFetchError("Could not fetch the jokes");
        setJokes([]);
        console.log(error);
      }
      if (data) {
        setJokes(data);
        setFetchError(null);
      }
    };

    fetchJokes();
  }, []);

  return (
    <>
      <nav>
        <Navbar>
          <div className="w-full m-2 flex items-center justify-between">
            <Link to="/" className="ml-4">
              <h4 className=" scroll-m-20 text-xl font-semibold tracking-tight ">
                Joke Hub
              </h4>
            </Link>
            <div className="flex items-center gap-4 mr-4">
              <Link to="/app" className="ml-4">
                <Button>App</Button>
              </Link>
              <ModeToggle />
            </div>
          </div>
        </Navbar>
      </nav>
      <h1 className="text-4xl font-bold text-center mt-8">My Jokes</h1>
      <section className="w-4/5 mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
        {fetchError && <p>{fetchError}</p>}
        {jokes && (
          <>
            {jokes.map((joke) => (
              <JokeCard key={joke.id} joke={joke} onDelete={handleDelete} />
            ))}
          </>
        )}
      </section>
    </>
  );
}

export default MyJokes;
