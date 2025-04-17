// import Image from "next/image";
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
    </div>
  );
}
