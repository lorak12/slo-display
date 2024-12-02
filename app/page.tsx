import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center justify-center gap-4 min-h-screen">
      <Link href="/">Home</Link>
      <Link href="/controller">Kontroller</Link>
      <Link href="/view">View</Link>
    </div>
  );
}
