import { useLocation, useNavigate } from "react-router-dom";

import PageLayout from "@/layouts/PageLayout";
import AuthForm, { IAuthInputs } from "@/components/auth/AuthForm";
import { useToast } from "@/components/ui/use-toast";
import useApi from "@/hooks/useApi";
import { userApi } from "@/http";
import useAuthStore from "@/app/authStore";

export default function Signup() {
  const navigate = useNavigate();
  const location = useLocation();
  const redirect = location?.state?.redirect || "/";
  const { toast } = useToast();
  const { login } = useAuthStore();
  const { isLoading, error, handler } = useApi(userApi.signup);

  async function handleSubmit({ name, email, password }: IAuthInputs) {
    toast({ title: "Creating your account..." });
    const { responseData, success } = await handler({ name, email, password });
    setTimeout(() => {
      if (success && !isLoading) {
        toast({ title: responseData?.message });
        login(responseData?.data?.user);
        navigate(redirect);
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
