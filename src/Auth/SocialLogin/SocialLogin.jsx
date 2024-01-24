import { FaGoogle } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const SocialLogin = () => {
  const { googleSignIn } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const location = useLocation();

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        console.log(result.user);
        const userInfo = {
          email: result.user?.email,
          name: result.user?.displayName,
          role: 'generalUser',
        };
        axiosPublic.post("/users", userInfo).then((res) => {
          console.log(res.data);
          navigate(location?.state ? location.state : "/");
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <div className="flex flex-col items-center justify-center mx-auto">
      <button onClick={handleGoogleSignIn}>
        <FaGoogle className="text-4xl text-white"></FaGoogle>
      </button>
      <p className="text-sm text-white">
        <small>Google Sign in</small>{" "}
      </p>
    </div>
  );
};

export default SocialLogin;
