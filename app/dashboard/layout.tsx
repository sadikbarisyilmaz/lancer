// import { Navbar } from "@/components/Navbar";
// import { MobileNavbar } from "@/components/MobileNavbar";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* <MobileNavbar />
      <Navbar /> */}
      <div className="pt-[70px] lg:pt-0 w-full flex flex-col h-screen">
        {children}
      </div>
    </>
  );
}
