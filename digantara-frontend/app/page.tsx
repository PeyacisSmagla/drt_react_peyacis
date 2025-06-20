import AssetsPanel from "../components/AssetsPanel";
import SelectedPanel from "../components/SelectedPanel";

export default function Home() {
  return (
     <main className="flex w-full h-screen lg:px-15 py-5 bg-gradient-to-b from-[#002027] to-[#08020e]">
      <div className="w-7/10 p-4 border-r border-gray-700">
        <AssetsPanel />
      </div>
      <div className="w-3/10 p-4">
        <SelectedPanel />
      </div>
    </main>
  );
}
