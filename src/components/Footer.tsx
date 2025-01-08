export default function Footer() {

    var date = new Date();
    var year = date.getFullYear();
  
    return (
      <div className="max-w-2xl mx-auto">
        <footer className="p-4 md:px-6 md:py-8">
          <hr className="mb-6 sm:mx-auto" />
          <span className="block text-sm text-white sm:text-center">
            © {year} Créé par{" "}
            <a
              href="https://github.com/Enzoait"
              target="_blank"
              className="hover:underline text-blue-300"
            >
              Enzoait
            </a>{" "}
            et{" "}
            <a
              href="https://github.com/CaptainZiboo"
              target="_blank"
              className="hover:underline text-blue-300"
            >
              CaptainZiboo
            </a>
            . 
            <p>All Rights Reserved.</p>
          </span>
        </footer>
      </div>
    );
  }