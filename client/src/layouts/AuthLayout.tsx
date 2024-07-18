import { Outlet, useLocation, useNavigate } from "react-router-dom";

import useAuthStore from "@/app/authStore";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function AuthLayout({
  authRequired = true,
}: {
  authRequired?: boolean;
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn } = useAuthStore();

  if (!isLoggedIn && authRequired) {
    return (
      <Dialog open>
        <DialogContent
          onClose={() => {
            navigate("/");
          }}
        >
          <DialogHeader>
            <DialogTitle>Are you authenticated?</DialogTitle>
            <DialogDescription>
              You cannot access this page without authenticated. Please login or
              signup to access this page.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex-row justify-between sm:justify-between">
            <Button
              variant={"secondary"}
              onClick={() =>
                navigate("/signup", { state: { redirect: location.pathname } })
              }
            >
              Signup
            </Button>
            <Button
              className="bg-[#e77111] hover:bg-[#ff7300]"
              onClick={() =>
                navigate("/login", { state: { redirect: location.pathname } })
              }
            >
              Login
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return <Outlet />;
}
