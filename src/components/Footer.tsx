export default function Footer() {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <div className="w-full flex justify-center">
      <footer className="p-4 md:px-6 md:py-8">
        <span className="block text-sm text-neutral-200 sm:text-center">
          © {year} Created by{" "}
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
          .<p className="text-center">All Rights Reserved.</p>
        </span>
      </footer>
    </div>
  );
}
