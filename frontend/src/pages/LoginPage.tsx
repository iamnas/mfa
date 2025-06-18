import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import { useSession, type User } from "../context/SessionContext";

export default function LoginPage() {

    const navigate = useNavigate();

    const { login } = useSession();

    const handleLoginSuccess = (user:User) => {
        login(user);
        if(!user.isMfaActive){
            navigate("/setup-2fa");
        }else{
            navigate("/verify-2fa");
        }
    }


    return (
        <LoginForm onLoginSuccess={handleLoginSuccess} />
    )
}
