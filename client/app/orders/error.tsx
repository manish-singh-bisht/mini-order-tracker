"use client";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  return (
    <div className="h-screen w-screen flex items-center justify-center text-2xl">
      Something went wrong! {`${error.message}`}
    </div>
  );
}
