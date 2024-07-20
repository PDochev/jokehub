import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "./ui/button";
import { Slider } from "@/components/ui/slider";
import Jokes from "./Jokes";
import Loader from "./Loader";
import ModalForm from "./ModalForm";

function JokesSearch() {
  const [jokes, setJokes] = useState([]);
  const [category, setCategory] = useState("Programming");
  const [amount, setAmount] = useState(9);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [openStates, setOpenStates] = useState({});

  const handleGetJoke = async () => {
    try {
      setIsLoading(true);
      setError("");
      const response = await fetch(
        `https://v2.jokeapi.dev/joke/${category}?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=twopart&amount=${amount}`
      );

      if (!response.ok) {
        throw new Error("Something went wrong with fetching jokes");
      }

      const data = await response.json();
      console.log(data.jokes);
      setJokes(data.jokes);

      const initialOpenStates = data.jokes.reduce((acc, _, index) => {
        acc[index] = false;
        return acc;
      }, {});
      setOpenStates(initialOpenStates);
    } catch (err) {
      console.log(err.message);
      setError("Something went wrong , Failed to load Jokes");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleOpenState = (index) => {
    setOpenStates((prevOpenStates) => {
      return { ...prevOpenStates, [index]: !prevOpenStates[index] };
    });
  };

  return (
    <>
      <div className="mx-auto flex gap-2">
        <div div className="flex flex-col items-center justify-center gap-2">
          <div className="flex">
            <label className="min-w-[130px]" htmlFor="category">
              Select a category
            </label>
          </div>
          <div className="flex gap-2">
            <Select onValueChange={setCategory} defaultValue={category}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Any">Any</SelectItem>
                <SelectItem value="Programming">Programming</SelectItem>
                <SelectItem value="Misc">Misc</SelectItem>
                <SelectItem value="Dark">Dark</SelectItem>
                <SelectItem value="Pun">Pun</SelectItem>
                <SelectItem value="Spooky">Spooky</SelectItem>
                <SelectItem value="Christmas">Christmas</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleGetJoke}>Search</Button>
          </div>
          <ModalForm />
        </div>
      </div>
      <section className="w-4/5 grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
        {isLoading && <Loader />}
        {jokes.map((joke, i) => {
          return (
            <Jokes
              key={i}
              joke={joke}
              isOpen={openStates[i]}
              toggleOpenState={() => toggleOpenState(i)}
            />
          );
        })}
      </section>
    </>
  );
}

export default JokesSearch;
