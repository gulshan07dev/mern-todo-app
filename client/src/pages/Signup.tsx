import { useNavigate } from "react-router-dom";

import PageLayout from "../layouts/PageLayout";
import AuthForm, { IAuthInputs } from "@/components/auth/AuthForm";
import { useToast } from "@/components/ui/use-toast";
import useApi from "@/hooks/useApi";
import { userApi } from "@/http";

export default function Signup() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isLoading, error, handler } = useApi(userApi.signup);

  async function handleSubmit({ name, email, password }: IAuthInputs) {
    toast({ title: "Creating your account..." });
    const { responseData, success } = await handler({ name, email, password });
    setTimeout(() => {
      if (success && !isLoading) {
        toast({ title: responseData?.message });
        navigate("/");
      } else {
        toast({ title: error?.message, variant: "destructive" });
      }
    }, 5000);
  }
  return (
    <PageLayout className="flex justify-center items-center max-md:p-0 max-md:py-0 max-md:bg-primary-foreground">
      <AuthForm
        handleSubmit={handleSubmit}
        type="signup"
        errorMessage={error?.message}
        isLoading={isLoading}
      />
    </PageLayout>
  );
}
