import { useForm } from "react-hook-form";
import { UseAuth } from "../context/AuthContext";
import { Link , useNavigate } from "react-router-dom"
import { useEffect } from "react";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const {signin, errors: signinErrors, isAuthenticated } = UseAuth();
  const navigate = useNavigate()

  const onSubmit = handleSubmit((data) => {
    signin(data);
  });

  useEffect(() => {
    if (isAuthenticated) navigate("/tasks");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated] )



  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
      {
        signinErrors.map((error, i) => (
          <div className="bg-red-500 p-2 text-white my-4" key={i}>
            {error}
          </div>
        ))
      }
        <h1 className="text-2xl font-bold">Login</h1>
        
        <form onSubmit={onSubmit}>
          <input
            type="email"
            {...register("email", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 my-2 rounded-md"
            placeholder="Email"
          />
          {errors.email && <p className="text-red-500"> Email is required</p>}
          <input
            type="password"
            {...register("password", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 my-2 rounded-md"
            placeholder="Password"
          />
          {errors.password && (
            <p className="text-red-500"> Password is required</p>
          )}
          <button
            type="submit"
            className="w-full bg-zinc-700 text-white px-4 py-2 my-2 rounded-md"
          >
            Login
          </button>
        </form>
        <p className="flex gap-x-4 justify-center pt-4">
            Don&apos;t have an account? <Link className="text-sky-500" to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;

