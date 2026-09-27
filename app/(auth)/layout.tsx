import { Logo } from "@/components/common/logo";
import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-surface">
      <div className="flex h-16 items-center px-6 md:px-10">
        <Link href="/" className="flex items-center gap-2">
          <Logo />
          <span className="text-[15px] font-bold tracking-tight">PIRATEAGENT</span>
        </Link>
      </div>
      <div className="flex flex-1 items-center justify-center px-4 pb-16">{children}</div>
    </div>
  );
}
