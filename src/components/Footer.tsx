export default function Footer() {

    var date = new Date();
    var year = date.getFullYear();

    return <>
        <div className="max-w-2xl mx-auto">
            <footer className="p-4 bg-white rounded-lg md:px-6 md:py-8 ">
                <hr className="my-6  sm:mx-auto lg:my-8" />
                <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© {year} Créé par <a href="https://github.com/Enzoait" target="_blank" className="hover:underline text-slate-800">Enzoait</a> et <a href="https://github.com/CaptainZiboo" target="_blank" className="hover:underline text-slate-800">CaptainZiboo</a>. All Rights Reserved.
            </span>
            </footer>
        </div>
    </>
}