import { useState } from "react";
import { toast } from "sonner";

import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import useApi from "@/hooks/useApi";
import { userApi } from "@/http";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

export default function ChangePasswordDialog({
  isOpen,
  handleClose,
}: {
  isOpen: boolean;
  handleClose: () => void;
}) {
  const [passwordInputs, setPasswordInputs] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const { isLoading, handler } = useApi(userApi.changePassword);

  const handleChangePassword = async () => {
    const { responseData, success, error } = await handler(passwordInputs);
    if (success) {
      toast.success(responseData?.message);
      setPasswordInputs({ oldPassword: "", newPassword: "" });
      handleClose();
    } else {
      toast.error("Failed to update password", { description: error?.message });
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change password</DialogTitle>
        </DialogHeader>
        <div className="w-full flex flex-col gap-5 px-6">
          <div className="w-full flex flex-col gap-3">
            <Label htmlFor="oldPassword">Old Password</Label>
            <Input
              id="oldPassword"
              type="password"
              name="oldPassword"
              value={passwordInputs?.oldPassword}
              onChange={(e) =>
                setPasswordInputs((prev) => ({
                  ...prev,
                  oldPassword: e.target.value,
                }))
              }
            />
          </div>
          <div className="w-full flex flex-col gap-2">
            <Label htmlFor="newPassword">New Password</Label>
            <Input
              id="newPassword"
              type="password"
              name="newPassword"
              value={passwordInputs?.newPassword}
              onChange={(e) =>
                setPasswordInputs((prev) => ({
                  ...prev,
                  newPassword: e.target.value,
                }))
              }
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose>
            <Button variant={"outline"} disabled={isLoading}>
              Cancel
            </Button>
          </DialogClose>
          <Button
            disabled={
              isLoading ||
              !passwordInputs?.oldPassword ||
              !passwordInputs?.newPassword ||
              passwordInputs?.oldPassword === passwordInputs?.newPassword
            }
            onClick={handleChangePassword}
          >
            {isLoading ? "Updating..." : "Update"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
