import { ReactElement, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ComponentType } from "react";
import { userDataStore } from "../store/userdatastore";

const withAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
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
      return <div>Loading...</div>; // or a loading spinner
    }

    return <WrappedComponent {...props} />;
  };

  return ComponentWithAuth;
};

export default withAuth;
