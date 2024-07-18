import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

import useAuthStore from "@/app/authStore";
import { useToast } from "@/components/ui/use-toast";
import useApi from "@/hooks/useApi";
import { userApi } from "@/http";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function LogoutButton() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { logout } = useAuthStore();
  const { isLoading, handler } = useApi(userApi.logout);

  const handleLogout = async () => {
    const { success, error } = await handler();
    if (success) {
      logout();
      toast({ title: "Logout successfull" });
      navigate("/");
    } else {
      toast({ title: error?.message || "Failed to logout, try again" });
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="flex gap-2 items-center bg-transparent px-4 py-2">
          <LogOut />
          Logout
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to log out of your account?
          </AlertDialogTitle>
          <AlertDialogDescription>
            You will need to log in again to access your data and settings.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
          <AlertDialogAction disabled={isLoading} onClick={handleLogout}>
            {isLoading ? "Logout..." : "Continue"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
