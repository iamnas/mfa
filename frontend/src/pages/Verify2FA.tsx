import { useNavigate } from "react-router-dom";
import TwoFAVerification from "../components/TwoFAVerification";

function Verify2FA() {

  const nav = useNavigate();

  const handleVerifyComplete = async (data: unknown) => {

    if (data) {
      nav("/");
    }
  }

  const handleResetComplete = (data: unknown) => {
    if (data) {
      nav("/setup-2fa");
    }
  }

  return (
    <TwoFAVerification onVerifyComplete={handleVerifyComplete} onResetComplete={handleResetComplete} />
  )
}

export default Verify2FA