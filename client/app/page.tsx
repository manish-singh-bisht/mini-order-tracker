import { Button } from "@/components/ui/button";
import Link from "next/link";
import { USER_ID } from "./_lib/config";

export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen">
      {/* hardcoding for now ,it will dynamic in real scenario*/}
      <Link href={`/orders?customerId=${USER_ID}`}>
        <Button size="lg" variant="secondary">
          Go to orders
        </Button>
      </Link>
    </div>
  );
}
