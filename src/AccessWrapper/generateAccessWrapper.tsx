import { SESSIONS_STATUS } from "../useAuth/useAuth";
import { State } from "../useAuth/useAuth";
import { StoreApi, UseBoundStore } from "zustand";

export interface AccessWrapperProps {
  profiles: string[];
  route: boolean;
  children: React.ReactNode;
}

export const generateAccessWrapper = (
  useAuthInstance: UseBoundStore<StoreApi<State>>,
  loaderComponent: React.ReactNode,
  errorComponent: React.ReactNode
) => (
  function AccessWrapper({ profiles = [], route, children }: AccessWrapperProps) {
    const { hasProfiles, sessionStatus } = useAuthInstance();

    if (route && sessionStatus === SESSIONS_STATUS.LOADING) return loaderComponent;
    if (route && !hasProfiles(profiles)) return errorComponent;
    if (hasProfiles(profiles)) return (children);
  }
);