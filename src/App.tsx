import { Game } from "./pages/Game";
import { Routes, Route } from "react-router-dom";
import { useStorageState } from "./hooks";
import { defaultUserProfile } from "./constants";
import { User } from "./types/user";
import { Settings } from "./pages/Web3Settings";
import { ThemeProvider } from "@mui/material";
import { GlobalStyle, MuiTheme } from "./styles";
import { ToastContainer } from "react-toastify";
import { NotFound } from "./pages/NotFound";
import { MainLayout } from "./layouts/MainLayout";
import { LandingPage } from "./components";
import { Web3Provider } from "./config/web3";
import { useAppKit, useAppKitAccount } from "@reown/appkit/react";
function AppContent() {
  const [userProfile, setUserProfile] = useStorageState<User>(
    defaultUserProfile,
    "userProfile"
  );
  const userProfileProps = { userProfile, setUserProfile };
  const { open } = useAppKit();
  const { isConnected } = useAppKitAccount();

  const handleConnect = () => {
    open();
  };

  // Show landing page if wallet is not connected
  if (!isConnected) {
    return <LandingPage onConnect={handleConnect} />;
  }

  return (
    <ThemeProvider theme={MuiTheme}>
      <MainLayout {...userProfileProps}>
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<Game {...userProfileProps} />} />
          <Route
            path="/settings"
            element={<Settings {...userProfileProps} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ToastContainer
          position="bottom-left"
          autoClose={6000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </MainLayout>
    </ThemeProvider>
  );
}

function App() {
  return (
    <Web3Provider>
      <AppContent />
    </Web3Provider>
  );
}
export default App;
