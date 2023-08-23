import Image from "next/image";

export default function Home() {
  return (
    <div className="relative mx-auto max-w-md overflow-hidden rounded-lg bg-white shadow">
      <div>
        <img
          src="https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
          className="w-full object-cover"
          alt=""
        />
      </div>
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black"></div>
      <div className="absolute inset-x-0 bottom-0 z-20 p-4">
        <p className="mb-1 text-sm text-white text-opacity-80">
          Andrea Felsted • <time>18 Nov 2022</time>
        </p>
        <h3 className="text-xl font-medium text-white">Migrating to Sailboat UI</h3>
        <p className="mt-1 text-white text-opacity-80">
          Sailboat UI is a modern UI component library for Tailwind CSS. Get
          started with 150+ open source components.
        </p>
      </div>
    </div>
  );
}
