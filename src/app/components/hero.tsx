import { Spline_Sans, Playfair_Display } from "next/font/google";

const font = Spline_Sans({ subsets: ["latin"] });
const heading = Playfair_Display({ subsets: ["latin"] });

export default function Hero() {
  return (
    <div className="hero relative mt-6 lg:mt-12">
      <h1 className={`text-6xl text-center lg:text-left font-semibold ${heading.className}`}>
        Blend Smart
        <br />
        Spend Wise
      </h1>
      <div className="my-8 text-xl text-center lg:text-left">Never overspend on skincare again!</div>
      <div className={`banner text-white font-semibold p-6 lg:w-3/5 rounded-l-3xl ${font.className}`}>
        Use AI to find cheaper alternatives with
        <br />
        the same function!
      </div>
      <div className="image static lg:absolute max-w-full lg:max-w-none top-0 bg-no-repeat -z-10 lg:z-10 opacity-50 lg:opacity-100"></div>
    </div>
  );
}
