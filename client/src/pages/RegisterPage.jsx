import { useForm } from "react-hook-form";
import { UseAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function RegisterPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signup, isAuthenticated, errors: registerErrors } = UseAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/tasks");
  }, [isAuthenticated, navigate]);

  const onSubmit = handleSubmit(async (values) => {
    signup(values, 'patient'); // Crear usuario como paciente
  });
  

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
    <div className="bg-zinc-800 max-w-md p-10 rounded-md">
      {
        registerErrors.map((error, i) => (
          <div className="bg-red-500 p-2 text-white" key={i}>
            {error}
          </div>
        ))
      }
      <h1 className="text-2xl font-bold">Register</h1>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          {...register("username", { required: true })}
          className="w-full bg-zinc-700 text-white px-4 py-2 my-2 rounded-md"
          placeholder="Username"
        />
        {errors.username && (
          <p className="text-red-500"> Username is required</p>
        )}
        <input
          type="email"
          {...register("email", { required: true })}
          className="w-full bg-zinc-700 text-white px-4 py-2 my-2 rounded-md"
          placeholder="Email"
        />
        {errors.email && (
          <p className="text-red-500"> Email is required</p>
        )}
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
          Register
        </button>
      </form>
      <p className="flex gap-x-4 justify-center pt-4">
           already have an account? <Link className="text-sky-500" to="/login">Login</Link>
        </p>
    </div>
    </div>
  );
}

export default RegisterPage;
