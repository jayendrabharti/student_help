import { Button } from "@/components/ui/button";
import { authOptions } from "@/utils/authOptions";
import { User } from "@prisma/client";
import { BanIcon, HomeIcon } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  const user = session?.user as User;
  const isAdmin = user.role === "superAdmin";

  if (!isAdmin) {
    return (
      <div className="flex flex-col justify-center items-center w-full h-full space-y-4">
        <BanIcon className="size-20 text-destructive" />
        <span className="text-2xl md:text-4xl font-bold text-center text-destructive">
          This page can only be access by System Admins.
        </span>
        <Link href={"/"} prefetch={true}>
          <Button variant={"outline"} className="active:scale-90">
            <HomeIcon className="size-4" />
            Homepage
          </Button>
        </Link>
      </div>
    );
  }

  return children;
}
