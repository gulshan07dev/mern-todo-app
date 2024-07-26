import { useState } from "react";
import { Edit, MoreHorizontal } from "lucide-react";

import PageLayout from "@/layouts/PageLayout";
import useAuthStore from "@/app/authStore";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import LogoutButton from "@/layouts/navbar/LogoutButton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UpdateUserProfileDialog from "@/components/auth/UpdateUserProfileDialog";
import ChangePasswordDialog from "@/components/auth/ChangePasswordDialog";

function Profile() {
  const { user } = useAuthStore();
  const [dialogOpen, setDialogOpen] = useState<
    "UPDATE_USER_PROFILE" | "UPDATE_PASSWORD" | null
  >(null);

  const handleCloseDialog = () => {
    setDialogOpen(null);
  };

  return (
    <PageLayout className="flex flex-col gap-8">
      <div className="flex justify-between">
        <h1 className="text-3xl font-lato font-semibold text-secondary-foreground">
          Profile
        </h1>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full text-secondary-foreground"
            >
              <MoreHorizontal />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Profile</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setDialogOpen("UPDATE_PASSWORD")}>
              Change password
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <LogoutButton />
          </DropdownMenuContent>
        </DropdownMenu>

        <UpdateUserProfileDialog
          isOpen={dialogOpen === "UPDATE_USER_PROFILE"}
          handleClose={handleCloseDialog}
        />
        <ChangePasswordDialog
          isOpen={dialogOpen === "UPDATE_PASSWORD"}
          handleClose={handleCloseDialog}
        />
      </div>

      <Card className="py-10 px-3.5 sm:px-7 flex flex-col gap-5">
        <div className="w-full flex flex-col gap-3">
          <Label htmlFor="name">Name</Label>
          <div className="flex justify-between items-center gap-2">
            <Input
              id="name"
              type="text"
              name="name"
              value={user?.name}
              className="flex-1"
              readOnly
            />
            <Button
              onClick={() => setDialogOpen("UPDATE_USER_PROFILE")}
              variant={"outline"}
            >
              <Edit />
            </Button>
          </div>
        </div>
        <div className="w-full flex flex-col gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="text"
            name="email"
            value={user?.email}
            readOnly
          />
        </div>
      </Card>
    </PageLayout>
  );
}

export default Profile;
