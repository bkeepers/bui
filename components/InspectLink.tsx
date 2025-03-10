import { Link } from "expo-router";
import { Braces } from "./icons/Braces";

export function InspectLink() {
  return (
    <Link href="/inspector">
      <Braces size={20} strokeWidth={1} className="text-foreground" />
    </Link>
  );
}
