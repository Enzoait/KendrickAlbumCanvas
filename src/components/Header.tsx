export const Header: React.FC = () => {
  return (
    <header className="relative w-full h-screen">
      <div className="absolute inset-0 w-full h-full bg-cover bg-center md:bg-[url('/butterfly.jpg')] bg-[url('/butterfly-mobile.jpg')] bg-fixed">
        <div className="absolute w-full bg-gradient-to-b from-transparent to-background h-1/2 bottom-0"></div>
      </div>
      <div className="pb-32 relative z-10 flex flex-col items-center justify-center h-full text-center text-white p-4">
        <h2 className="text-lg md:text-2xl uppercase font-medium text-background font-redhat">
          Kendrick Lamar
        </h2>
        <h1 className="text-5xl md:text-8xl font-bold mb-4 font-street text-orange-400 tracking-widest">
          Butterfly
        </h1>
      </div>
      <div className="absolute bottom-4 text-center animate-bounce w-full h-6">
        <p className="text-white">Défilez pour explorer</p>
      </div>
    </header>
  );
};