import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Link } from "react-router-dom";
import supabase from "../config/supabaseClient";
import { useNavigate, useParams } from "react-router-dom";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function UpdateJoke() {
  const { toast } = useToast();
  const { id } = useParams();
  const navigate = useNavigate();
  const [jokes, setJokes] = useState("");
  const [category, setCategory] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJoke = async () => {
      const { data, error } = await supabase
        .from("makemelaugh")
        .select()
        .eq("id", id)
        .single();

      if (error) {
        navigate("/myjokes", { replace: true });
        // setFormError("Could not fetch the jokes");
        // setJoke([]);
        // console.log(error);
      }
      if (data) {
        setJokes(data.joke);
        setCategory(data.category);

        // setFormError(null);
        console.log(data.joke);
        console.log(data.category);
      }
    };
    fetchJoke();
  }, [id, navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!jokes || !category) {
      setFormError("Please fill out all fields");
      return;
    }

    const { data, error } = await supabase
      .from("makemelaugh")
      .update({ joke: jokes, category: category })
      .eq("id", id)
      .select();
    navigate("/myjokes");
    toast({
      description: "Your joke has been updated.",
    });

    if (error) {
      console.log(error);
      setFormError("Please fill out all fields");
    }
    if (data) {
      console.log(data);
      setFormError(null);
    }
  };

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
            <div className="flex items-center gap-4 mr-2">
              <Link to="/app" className="ml-2">
                <Button>App</Button>
              </Link>
              <Link to="/myjokes">
                <Button>My Jokes</Button>
              </Link>
              <ModeToggle />
            </div>
          </div>
        </Navbar>
      </nav>

      <section className="w-3/4 md:w-3/5 lg:w-2/5  mx-auto border rounded-lg shadow-sm mt-7 p-8 mb-7 ">
        <h1>Update Your Joke</h1>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <Textarea
            id="joke"
            value={jokes}
            onChange={(e) => setJokes(e.target.value)}
          />
          <Select onValueChange={setCategory} defaultValue={category}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={category} />
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
          {formError && <p>{formError}</p>}
          <Button>Save changes</Button>
        </form>
      </section>
    </>
  );
}

export default UpdateJoke;
