import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import supabase from "../config/supabaseClient";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function JokeCard({ joke, onDelete }) {
  const { toast } = useToast();
  const [alertDialog, setAlertDialog] = useState(false);
  const handleDelete = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from("makemelaugh")
      .delete()
      .eq("id", joke.id);
    onDelete(joke.id);
    toast({
      variant: "destructive",
      description: "Your joke has been deleted.",
    });

    if (error) {
      console.log(error);
    }
    if (data) {
      console.log(data);
    }
  };

  return (
    <div className="w-3/12 mx-auto border rounded-lg shadow-sm mt-7 p-10 mb-7">
      <div className="flex flex-col justify-center items-center">
        <CardHeader className="text-sm text-muted-foreground">
          Category: {joke.category}
        </CardHeader>
        <CardContent>{joke.joke}</CardContent>
      </div>
      <CardFooter className="flex justify-evenly ">
        <Link to={"/myjokes/" + joke.id}>
          <Button variant="outline">Edit</Button>
        </Link>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">Delete</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                joke.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
      <Toaster />
    </div>
  );
}

export default JokeCard;
