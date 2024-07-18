import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";

import useAuthStore from "@/app/authStore";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function AuthLayout({
  authRequired = true,
}: {
  authRequired?: boolean;
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn } = useAuthStore();

  if (isLoggedIn && !authRequired) {
    return <Navigate to={"/"} />;
  } else if (!isLoggedIn && authRequired) {
    return (
      <AlertDialog open>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you authenticated?</AlertDialogTitle>
            <AlertDialogDescription>
              You cannot access this page without authenticated. Please login or
              signup to access this page.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => navigate("/")}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() =>
                navigate("/login", { state: { redirect: location.pathname } })
              }
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  } else {
    return <Outlet />;
  }
}
