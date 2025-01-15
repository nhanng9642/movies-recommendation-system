import toast from "react-hot-toast";
import { sendVerifyEmail } from "../services/AuthService";
import { useAuth } from "../contexts/AuthContext";

export function VerifyEmailWarning() {
	const {user} = useAuth();

  const verifyEmail = async () => {
    toast.promise(
        sendVerifyEmail(user.email),
        {
            loading: 'Send verify email...',
            success: (data) => {
                return data.message;
            },
            error: err => err.message
        }
    )
  }

  return (
    <div className="bg-[#e53935] p-1 pl-4 text-gray-800 text-center text-sm">
      <button onClick={verifyEmail} className="hover:opacity-80 text-blue-900 hover:underline mr-1">
        Verify Email
      </button>
      to active your account!
    </div>
  );
}
