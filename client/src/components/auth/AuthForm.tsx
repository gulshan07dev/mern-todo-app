import { FormEvent, useState } from "react";
import { ArrowRight, MessageSquareWarningIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Logo from "../Logo";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Link, useLocation } from "react-router-dom";

export interface IAuthInputs {
  name: string;
  email: string;
  password: string;
}

interface IAuthFormProps {
  handleSubmit: (data: IAuthInputs) => Promise<void>;
  type: "signup" | "login";
  errorMessage?: string | null;
  isLoading: boolean;
}

export default function AuthForm({
  handleSubmit,
  type,
  errorMessage,
  isLoading,
}: IAuthFormProps) {
  const location = useLocation();
  const redirect = location?.state?.redirect || "/";
  const [authInputs, setAuthInputs] = useState<IAuthInputs>({
    name: "",
    email: "",
    password: "",
  });

  function onSubmitForm(e: FormEvent) {
    e.preventDefault();
    handleSubmit(authInputs);
  }

  return (
    <Card className="w-full md:max-w-4xl flex flex-col md:flex-row justify-center items-start bg-transparent rounded-full md:rounded-l-full md:rounded-r-none max-md:rounded-none md:border-t-0 md:border-r-0 p-4 md:p-0 max-md:border-0 max-md:shadow-none">
      <Card className="md:bg-transparent md:w-[60%] w-full text-center md:border-0 px-8 py-4 md:px-7 md:py-8 rounded-l-full max-md:rounded-sm">
        <CardHeader className="flex flex-col gap-1">
          <div className="flex gap-2.5 items-center max-md:justify-center">
            <Logo className="gap-1 text-sm text-muted-foreground hover:text-black dark:hover:text-white" />
            <ArrowRight className="text-xs text-muted-foreground" size={20} />
            <CardTitle className="text-2xl font-lato">
              {type === "signup" ? "Signup" : "Login"}
            </CardTitle>
          </div>
          <CardDescription className="text-muted-foreground text-base font-rubik">
            {type === "signup"
              ? "Create your account to get started"
              : "Login to your account to get started"}
          </CardDescription>
          <div className="text-sm md:text-base">or</div>
          <Link
            to={type === "signup" ? "/login" : "/signup"}
            state={{ redirect }}
            className="underline text-primary"
          >
            {type === "signup" ? "Login" : "Signup"}
          </Link>
        </CardHeader>
      </Card>
      <Card
        className={cn(
          "w-full p-8 md:p-12 md:pb-7 max-md:px-0 max-md:py-5 bg-primary-foreground rounded-none md:border-b-0 max-md:border-0 max-md:shadow-none",
          errorMessage && "md:pt-7"
        )}
      >
        {errorMessage && (
          <Alert className="mb-4" variant={"destructive"}>
            <MessageSquareWarningIcon className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}
        <form className="w-full flex flex-col gap-4" onSubmit={onSubmitForm}>
          <div
            className={cn(
              "grid grid-cols-1 md:grid-cols-2 gap-4",
              type === "login" ? "md:grid-cols-1" : "md:grid-cols-2"
            )}
          >
            {type === "signup" && (
              <div className="w-full">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Gulshan"
                  type="text"
                  name="name"
                  value={authInputs.name}
                  onChange={(e) =>
                    setAuthInputs({ ...authInputs, name: e.target.value })
                  }
                  required
                />
              </div>
            )}
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="g@example.com"
                name="email"
                value={authInputs.email}
                onChange={(e) =>
                  setAuthInputs({ ...authInputs, email: e.target.value })
                }
                required
              />
            </div>
          </div>
          <div className="w-full">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              name="password"
              value={authInputs.password}
              onChange={(e) =>
                setAuthInputs({ ...authInputs, password: e.target.value })
              }
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full mt-3 py-5 rounded-full"
            disabled={isLoading}
          >
            {isLoading && (
              <span className="h-5 w-5 mr-3 rounded-full border-2 border-background border-l-0 border-r-0 border-b-0 animate-spin"></span>
            )}
            {type === "signup"
              ? isLoading
                ? "Signing Up..."
                : "Signup"
              : isLoading
              ? "Logging In..."
              : "Login"}
          </Button>
        </form>
      </Card>
    </Card>
  );
}
