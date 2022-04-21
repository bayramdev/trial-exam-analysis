import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import LoadingPage from "../pages/LoadingPage";
import { useAuth } from "./useAuth";

enum Status {
  Invalid,
  Valid,
  Loading,
}

const PrivateOutlet = () => {
  const [status, setStatus] = useState<Status>(Status.Loading);
  const { fetchUser } = useAuth();

  useEffect(() => {
    (async () => {
      const fetched = await fetchUser();
      if (!fetched) {
        setStatus(Status.Invalid);
        return;
      }
      setStatus(Status.Valid);
    })();
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
