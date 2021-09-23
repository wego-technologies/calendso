import Link from "next/link";

const PoweredByCalendso = () => (
  <div className="p-1 text-xs text-center sm:text-right">
    <Link href={`https://cal.com?utm_source=embed&utm_medium=powered-by-button`}>
      <a target="_blank" className="text-gray-500 opacity-50 dark:text-white hover:opacity-100">
        powered by{" "}
        <img className="dark:hidden w-auto inline h-[10px] relative" src="/logo.svg" alt="Cal.com Logo" />
        <img
          className="hidden dark:inline w-auto h-[10px] relative"
          src="/logo-white.svg"
          alt="Cal.com Logo"
        />
      </a>
    </Link>
  </div>
);

export default PoweredByCalendso;
