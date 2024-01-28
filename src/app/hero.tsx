import { Spline_Sans, Playfair_Display } from "next/font/google";

const font = Spline_Sans({ subsets: ["latin"] });
const heading = Playfair_Display({ subsets: ["latin"] });

export default function Hero() {
  return (
    <div className="hero relative mt-12">
      <h1 className={`${heading.className}`}>Blend Smart<br/>Spend Wise</h1>
      <div className="my-8 text-xl">Never overspend on skincare again!</div>
      <div className={`banner p-6 w-3/5 ${font.className}`}>
        Use AI to find cheaper alternatives with<br/>the same function!
      </div>
      <div className="image absolute top-0 bg-no-repeat"></div>
    </div>
  );
}
