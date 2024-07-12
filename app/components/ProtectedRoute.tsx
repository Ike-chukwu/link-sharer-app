import { ReactElement, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ComponentType } from "react";
import { userDataStore } from "../store/userdatastore";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import Loader from "../components/Loader.json";
import dynamic from "next/dynamic";

const WithAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const ComponentWithAuth = (props: P) => {
    const accessToken = userDataStore(
      (state: any) => state.userData.accessToken
    );
    const router = useRouter();

    useEffect(() => {
      if (!accessToken) {
        router.push("/");
      }
    }, [accessToken, router]);

    // Show loading while the authentication status is being checked
    if (!accessToken) {
      return <Lottie animationData={Loader} />; // or a loading spinner
    }

    return <WrappedComponent {...props} />;
  };

  return ComponentWithAuth;
};

export default WithAuth;
