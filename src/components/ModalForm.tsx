import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "./ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import supabase from "../config/supabaseClient";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

function ModalForm() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [joke, setJoke] = useState("");
  const [category, setCategory] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!joke || !category) {
      setFormError("Please fill out all fields");
      return;
    }
    const { data, error } = await supabase
      .from("makemelaugh")
      .insert([{ joke, category }]);
    navigate("/myjokes");
    toast({
      description: "Your joke has been added.",
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
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">+ New Joke</Button>
      </DialogTrigger>

      <DialogContent className=" w-3/4 rounded md:w-1/2 lg:w-1/2 mx-auto">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Insert new Joke</DialogTitle>
            <DialogDescription>
              You can insert a new joke here.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Textarea
              id="joke"
              value={joke}
              onChange={(e) => setJoke(e.target.value)}
            />
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
          </div>
          {formError && <p>{formError}</p>}
          <DialogFooter>
            <Button>Submit</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default ModalForm;
