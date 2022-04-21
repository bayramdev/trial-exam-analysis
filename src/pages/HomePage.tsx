import { useAuth } from "../auth/useAuth";

const HomePage = () => {
  const { cachedUser } = useAuth();
  console.log(cachedUser);
  return <div className="text-lg text-red-600">home page</div>;
};

export default HomePage;
