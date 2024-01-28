import { Button } from "./ui/button";

function Jokes({ joke, isOpen, toggleOpenState }) {
  return (
    <div className="w-3/12 mx-auto border rounded-lg shadow-sm gap-3 mt-7 p-10 ">
      <div className="flex flex-col justify-center items-center">
        <span className="">🤣</span>
        <small className="text-sm text-muted-foreground">
          Category: {joke.category}
        </small>
        <p className="leading-7  [&:not(:first-child)]:mt-6">{joke.setup}</p>
        {isOpen ? (
          <p className="mt-2">{joke.delivery}</p>
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
