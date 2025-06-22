import AssetsPanel from "./components/AssetsPanel";

export default function Home() {
  return (
    <main className="w-full h-screen lg:px-15 py-5 bg-gradient-to-b from-[#002027] to-[#08020e]">
      <h1 className="text-2xl font-bold">Create My Asset List</h1>
      <AssetsPanel />
    </main>
  );
}
