import { AuroraLogo } from "./aurora-logo";

export default function Header() {
  return (
    <header className="py-4 px-4 md:px-6 border-b">
      <div className="container mx-auto flex items-center gap-3">
        <AuroraLogo />
        <h1 className="text-xl font-bold tracking-tighter bg-gradient-to-r from-primary to-accent text-transparent bg-clip-text">
          Aurora Vision
        </h1>
      </div>
    </header>
  );
}