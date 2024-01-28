import { Link } from "react-router-dom";

function NotFound() {
  return (
    <main className="container mx-auto mt-12 flex flex-col items-center justify-center">
      <h2 className="text-pop-up-top scroll-m-20 text-7xl font-extrabold tracking-tight lg:text-9xl">
        Page not found!
      </h2>

      <p className="mt-12 text-4xl flex">
        Go to the
        <Link to="/">
          <p className="ml-2 border-b-2 border-slate-950">Homepage</p>
        </Link>
      </p>
    </main>
  );
}

export default NotFound;
