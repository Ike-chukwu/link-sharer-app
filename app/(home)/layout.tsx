import Navbar from "@/app/components/Navbar";
import PhoneMockup from "../icons/PhoneMockup";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#FAFAFA] min-h-[100vh]">
      <div className="xl:w-[1200px] lg:w-[850px] mx-auto lg:py-10 flex flex-col gap-10">
        <Navbar />
        <div className="px-8 lg:px-0 flex gap-10 items-start">
          <div className="hidden lg:flex w-2/5 rounded-xl items-center justify-center min-h-[800px] p-10 bg-white">
            <PhoneMockup />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
