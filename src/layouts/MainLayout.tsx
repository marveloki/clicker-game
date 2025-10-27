import { ReactNode } from "react";
import { UserProfileProps } from "../types/userProfileProps";
import { Navbar } from "../components";

interface Props extends UserProfileProps {
  children: ReactNode;
}

export const MainLayout = ({
  userProfile,
  setUserProfile,
  children,
}: Props) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};
