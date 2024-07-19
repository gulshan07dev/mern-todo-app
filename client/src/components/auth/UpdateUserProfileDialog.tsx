import { useState } from "react";
import { toast } from "sonner";

import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import useAuthStore from "@/app/authStore";
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
import { IUser } from "@/types";

export default function UpdateUserProfileDialog({
  isOpen,
  handleClose,
}: {
  isOpen: boolean;
  handleClose: () => void;
}) {
  const { user, setUser } = useAuthStore();
  const [userDetails, setUserDetails] = useState({
    name: user?.name || "",
  });
  const { isLoading, handler } = useApi(userApi.updateUserProfile);

  const handleUpdateUserProfile = async () => {
    const { responseData, success, error } = await handler(userDetails);
    if (success) {
      toast.success(responseData?.message);
      setUser({ ...user, ...userDetails } as IUser);
      handleClose();
    } else {
      toast.error("Failed update", { description: error?.message });
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update fullname</DialogTitle>
        </DialogHeader>

        <div className="w-full flex flex-col gap-2 px-6">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            type="text"
            name="name"
            value={userDetails?.name}
            onChange={(e) =>
              setUserDetails((prev) => ({ ...prev, name: e.target.value }))
            }
          />
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
              !userDetails?.name ||
              userDetails?.name === user?.name
            }
            onClick={handleUpdateUserProfile}
          >
            {isLoading ? "Updating..." : "Update"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
