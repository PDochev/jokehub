import { tailspin } from "ldrs";

function Loader() {
  tailspin.register();

  // Default values shown
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center">
      <l-tailspin size="40" stroke="5" speed="0.9" color="black"></l-tailspin>
    </div>
  );
}

export default Loader;
