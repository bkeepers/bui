import { Link } from "expo-router";
import { Braces } from "./icons/Braces";

export function InspectLink() {
  return (
    <Link href="/inspector">
      <Braces size={23} strokeWidth={1.25} className="text-foreground" />
    </Link>
  );
}
