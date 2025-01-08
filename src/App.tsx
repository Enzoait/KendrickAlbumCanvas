import { Header } from "./components/Header";
import { Cover } from "./components/Cover";
import { Tour } from "./components/Tour";
function App() {
  return (
    <>
      <Header />

      <Tour />

      <Cover />
      <button>Acheter</button>
      <p>
        Copyright 2025{" "}
        <a href="https://www.github.com/Enzoait">Enzo AIT-YAKOUB</a>
        <a href="https://www.github.com/CaptainZiboo">Lucas POYART</a>
      </p>
    </>
  );
}

export default App;
