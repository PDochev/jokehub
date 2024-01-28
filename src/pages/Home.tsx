import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import DailyJokes from "@/components/DailyJokes";
import { ModeToggle } from "@/components/Mode-toggle";
import { Link } from "react-router-dom";

function Home() {
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
                <Button>Go to app</Button>
              </Link>
              <ModeToggle />
            </div>
          </div>
        </Navbar>
      </nav>
      <main className="container mx-auto mt-12 flex flex-col items-center justify-center">
        <h1 className="text-focus-in scroll-m-20 text-7xl font-extrabold tracking-tight lg:text-9xl">
          Hello, Welcome to the Joke Hub
        </h1>
        <h2 className="w-1/2 mx-auto  scroll-m-20 border-b pb-2 pt-8 mt-10 text-3xl font-semibold tracking-tight first:mt-0 ">
          A place for people to share and read jokes
        </h2>
      </main>
      <section className="w-1/3  mx-auto ">
        <DailyJokes />
      </section>
    </>
  );
}

export default Home;
