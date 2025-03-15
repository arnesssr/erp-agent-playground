import { ModeToggle } from "@/components/ui/mode-toggle";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link to="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl">AI Agent Playground</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center space-x-4">
            <Button variant="ghost" asChild>
              <Link to="/dashboard">Dashboard</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link to="/templates">Templates</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link to="/my-agents">My Agents</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link to="/metrics">Metrics</Link>
            </Button>
          </nav>
          <div className="flex items-center space-x-2">
            <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
