import { Button } from "@/components/ui/button";
import Link from "next/link";
import { EMAIL } from "./_lib/config";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <div className="flex   gap-2 items-center justify-center h-screen">
      <Input className="w-fit" value={EMAIL} disabled />
      {/* hardcoding for now ,it will dynamic in real scenario*/}
      <Link href={`/orders?email=${EMAIL}`}>
        <Button size="lg" variant="secondary">
          Enter
        </Button>
      </Link>
    </div>
  );
}
