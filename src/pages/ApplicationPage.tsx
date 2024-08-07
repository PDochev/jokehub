import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Link } from "react-router-dom";

import JokesSearch from "@/components/JokesSearch";

function ApplicationPage() {
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
              <Link to="/myjokes" className="ml-4">
                <Button>My Jokes</Button>
              </Link>
              <ModeToggle />
            </div>
          </div>
        </Navbar>
      </nav>
      <section className="mx-auto mt-12 flex flex-col items-center justify-center">
        <JokesSearch />
      </section>
    </>
  );
}

export default ApplicationPage;
