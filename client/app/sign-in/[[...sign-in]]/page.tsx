import { SignIn } from "@clerk/nextjs";
import { Meteors } from "@/components/ui/meteors";

export default function SignInPage() {
  return (
    <main className="relative min-h-[100dvh] w-full bg-zinc-50 dark:bg-[#0B0C0E] flex items-center justify-center overflow-hidden p-4">
      {/* Meteors background */}
      <Meteors />

      {/* Clerk Sign In */}
      <div className="relative z-10">
        <SignIn
          fallbackRedirectUrl="/dashboard"
          appearance={{
            elements: {
              card: "bg-white dark:bg-[#111827] border border-zinc-200 dark:border-zinc-700 shadow-2xl",
              headerTitle: "text-zinc-900 dark:text-white",
              headerSubtitle: "text-zinc-500 dark:text-zinc-400",
              formFieldLabel: "text-zinc-700 dark:text-zinc-300",
              formFieldInput:
                "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white border-zinc-200 dark:border-zinc-700",
            },
          }}
        />
      </div>
    </main>
  );
}
