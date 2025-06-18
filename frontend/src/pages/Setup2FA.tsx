import { useNavigate } from "react-router-dom";
import TwoFASetup from "../components/TwoFASetup"


function Setup2FA() {

  const nav = useNavigate();

  const handleSetupComplete = () => {
    // console.log("Setup complete");
    nav("/verify-2fa");
  }
  return (
    <TwoFASetup onSetupComplete={handleSetupComplete} />
  )
}

export default Setup2FA