import Image from "next/image";
import Uploader from "./uploader";

export default function Home() {
  return (
    <main className="h-screen w-full py-6 px-12">
      <div className="h-full w-full">
        <h1 className="text-center text-6xl font-bold">Multi-image Uploader</h1>
        <Uploader />
      </div>
    </main>
  );
}
