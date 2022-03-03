import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import LoadingPage from "../pages/LoadingPage";
import { User } from "../types";
import { useAuth } from "./useAuth";

enum Status {
  Invalid,
  Valid,
  Loading,
}

const PrivateOutlet = () => {
  const [status, setStatus] = useState<Status>(Status.Loading);
  const [user, setUser] = useState<User | null>(null);
  const { fetchUser } = useAuth();

  useEffect(() => {
    const timeOut = setTimeout(() => {
      (async () => {
        const fetched = await fetchUser();
        if (!fetched) {
          setStatus(Status.Invalid);
          return;
        }
        setUser(fetched);
        setStatus(Status.Valid);
      })();
    }, 1000);
    return () => clearTimeout(timeOut);
  });

  if (status === Status.Loading) {
    return <LoadingPage />;
  }

  if (status === Status.Invalid) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default PrivateOutlet;
