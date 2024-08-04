import LoginCard from "@/components/shared/auth/LoginCard";

const LoginPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-black text-white">
      <div className="w-full max-w-md p-8 bg-black rounded-lg shadow-2xl">
        <LoginCard />
      </div>
    </div>
  );
};

export default LoginPage;