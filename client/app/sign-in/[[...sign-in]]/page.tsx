import { SignIn } from "@clerk/nextjs";
import { Meteors } from "@/components/ui/meteors";

export default function SignInPage() {
  return (
    <main className="relative min-h-[100dvh] w-full bg-zinc-50 dark:bg-[#0B0C0E] flex items-center justify-center overflow-hidden p-4">
      {/* Meteors background */}
      <Meteors />

      {/* Clerk Sign In */}
      <div className="relative z-10">
        <SignIn fallbackRedirectUrl="/dashboard" />
      </div>
    </main>
  );
}
