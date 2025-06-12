import Main from "@/components/Main";
import MainNavBar from "@/components/MainNavBar";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Main
      id="main"
      className={cn(
        `main grid grid-rows-[auto_1fr_auto]`,
        `h-dvh max-h-dvh w-full overflow-y-auto`
      )}
    >
      <MainNavBar />
      <div className={"flex flex-col py-2 px-2 md:px-10"}>{children}</div>
      <Footer />
    </Main>
  );
}
