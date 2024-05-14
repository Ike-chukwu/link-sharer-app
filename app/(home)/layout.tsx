import Navbar from "@/app/components/Navbar";
import PhoneMockup from "../icons/PhoneMockup";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#FAFAFA] min-h-[100vh]">
      <div className="xl:w-[1200px] lg:w-[850px] mx-auto lg:py-10 flex flex-col gap-10">
        <Navbar />
        {children}
      </div>
    </div>
  );
}
