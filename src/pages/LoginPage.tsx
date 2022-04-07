import { FormEventHandler, ChangeEventHandler, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import { LoginCredentials } from "../types";

const LoginPage = () => {
  const { loginUser, cachedUser } = useAuth();
  const [credentials, setCredentials] = useState<LoginCredentials>({
    userID: "",
    userPassword: "",
  });

  const handleFormSubmit: FormEventHandler<HTMLElement> = async (e) => {
    e.preventDefault();
    console.log(credentials);
    await loginUser(credentials);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return cachedUser ? (
    <Navigate to="" />
  ) : (
    <div className="h-screen flex bg-gray-bg1">
      <div className="w-full max-w-md m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-16">
        <h1 className="text-2xl font-medium text-primary mt-4 mb-12 text-center">
          Hesabınıza giriş yapın 🔐
        </h1>

        <form onSubmit={handleFormSubmit}>
          <div>
            <label htmlFor="email">E-posta</label>
            <input
              type="text"
              className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
              name="userID"
              placeholder="E-posta adresiniz"
              value={credentials.userID}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="password">Parola</label>
            <input
              type="password"
              className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
              name="userPassword"
              placeholder="Parolanız"
              value={credentials.userPassword}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex justify-center items-center mt-6">
            <button
              className={`bg-green py-2 px-4 text-sm text-white rounded border bg-green-600 focus:bg-green-400 hover:bg-green-500`}
            >
              Giriş yap
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
