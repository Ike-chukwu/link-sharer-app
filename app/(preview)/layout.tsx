import Navbar from "@/app/components/Navbar";
import PhoneMockup from "../icons/PhoneMockup";
import PreviewNav from "../components/PreviewNav";
import GithubIcon from "../icons/GithubIcon";
import ChevronIcon from "../icons/ChevronIcon";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="lg:bg-[#FAFAFA] relative min-h-[100vh] ">
      <div className=" lg:bg-ctaColor pt-8 lg:pb-96 lg:rounded-bl-[3rem] lg:rounded-br-[3rem] ">
        <PreviewNav />
      </div>
      <div className="absolute gap-20  left-[50%] top-[15%] translate-x-[-50%] lg:top-[22%] lg:shadow-bShadow lg:rounded-[3rem] lg:bg-white w-[300px] lg:w-[340px] min-h-[500px] flex flex-col py-20 px-16">
        <div className="flex gap-6 lg:gap-6 items-center justify-center w-full flex-col">
          <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-full bg-red-500 "></div>
          <h2 className="text-4xl lg:text-[30px] font-bold ">Ugboko Awele</h2>
          <p className="text-2xl text-[#7B7B7B]">iykeugboko9@gmail.com</p>
        </div>
        <div className="flex gap-4 flex-col">
          <div className="bg-black text-white flex justify-between items-center w-full p-6 rounded-2xl">
            <div className="flex gap-3 items-center">
              <GithubIcon />
              <span className="text-2xl text-white capitalize">github</span>
            </div>
            <ChevronIcon />
          </div>
        </div>
      </div>
    </div>
  );
}
