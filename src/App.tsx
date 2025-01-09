import { Header } from "./components/Header";
import { Cover } from "./components/Cover";
import { Tour } from "./components/Tour";
import Footer from "./components/Footer";
import { Description } from "./components/Desc";
function App() {
  return (
    <>
      <Header />
      <Description />
      <div className="relative w-full min-h-96 md:min-h-[50vw] overflow-hidden">
        <img
          src="/losangeles_sun.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover min-h-96"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-background to-transparent"></div>
        <div className="absolute inset-0 flex flex-col md:flex-row items-center justify-center p-4 gap-8">
          <img
            src="/mbk.png"
            alt="Black Image"
            className="w-64 h-64 filter invert"
          />
          <div className="flex flex-col">
            <p className="font-redhat text-sm italic text-center md:text-left">
              This album directly supports
            </p>
            <p className="text-white text-center text-lg font-bold md:text-left">
              My Brother's Keeper Foundation
            </p>
          </div>
        </div>
      </div>
      <Cover />
      <Tour />
      <Footer />
    </>
  );
}

export default App;
