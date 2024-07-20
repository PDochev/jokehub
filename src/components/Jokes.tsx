import { Button } from "./ui/button";

function Jokes({ joke, isOpen, toggleOpenState }) {
  return (
    <div className="w-full md:w-4/5 lg:w-4/5 mx-auto border rounded-lg shadow-sm  mt-7 p-8 lg:p-16 ">
      <div className="flex flex-col justify-center items-center">
        <span className="">🤣</span>
        <small className="text-sm text-muted-foreground">
          Category: {joke.category}
        </small>
        <p className="leading-7 text-center [&:not(:first-child)]:mt-6">
          {joke.setup}
        </p>
        {isOpen ? (
          <p className="mt-4 text-center font-bold ">{joke.delivery}</p>
        ) : (
          <Button className="w-26 mt-2" onClick={toggleOpenState}>
            Show Answer
          </Button>
        )}
      </div>
    </div>
  );
}

export default Jokes;
