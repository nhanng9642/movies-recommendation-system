import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { verifyEmail } from "../services/AuthService";
import Loading from "../components/Loading";
import { useAuth } from "../contexts/AuthContext";

function VerifyEmail() {
  const { search } = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const queryParams = new URLSearchParams(search);
  const token = queryParams.get("token");
  const navigate = useNavigate();

  const { user, dispatch } = useAuth();

  useEffect(() => {
    toast.promise(      
      verifyEmail(token),
      {
          loading: () => {
            setIsLoading(true);
            return 'Verify email...'
          },
          success: (res) => {
            setIsLoading(false);
            dispatch( "UPDATE_USER", { user: { ...user, isVerified: true } });
            navigate('/')
            return res.message
          },
          error: err => {
            setIsLoading(false);
            return err.message
          }
      }
  )
  }, [navigate, token])
  
  return (
    <>
      {isLoading && <Loading />}
      {!isLoading && <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h2>Sorry, some thing went wrong!.</h2>
            <div>
                <div className="font-medium text-primary-600 dark:text-primary-500 mb-4">
                    Go back to <Link to="/" className="hover:underline font-bold text-blue-600">Home</Link>
                </div>
            </div>  
      </div>}
    </>
  );
}

export default VerifyEmail;
