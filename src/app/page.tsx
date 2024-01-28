import Header from "./header";
import Hero from "./hero";

export default function Home() {
  return (
    <div className="flex flex-col max-w-5xl min-h-screen mx-auto">
      <Header />
      <main>
        <Hero />
      </main>
    </div>
  );
}
