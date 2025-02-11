import Image from "next/image";
import DropdownMenu from "./components/navigationItems/dropdownMenu";
import { dm_sans } from "./fonts";

export default function Home() {
  return (
    <div className="grid grid-rows-[auto_1fr_20px] items-center justify-items-center min-h-screen pb-20 font-[family-name:var(--font-geist-sans)]">
      <DropdownMenu />
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start p-8 sm:p-20">
        <div className="relative h-[600px] w-full">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('/static/images/stock_wholesale.jpg')",
              filter: "brightness(0.7)"
            }}
          />
          <div className="relative z-10 flex items-center justify-center h-full">
            <h2 className={`text-4xl md:text-5xl font-bold text-mint text-center max-w-2xl leading-tight ${dm_sans.className}`}>
              Welcome to VAP<br />
              Your one stop for<br />
              wholesale purchases<br />
              and requests
            </h2>
          </div>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
