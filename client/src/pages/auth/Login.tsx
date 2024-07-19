import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import PageLayout from "@/layouts/PageLayout";
import AuthForm, { IAuthInputs } from "@/components/auth/AuthForm";
import useApi from "@/hooks/useApi";
import { userApi } from "@/http";
import useAuthStore from "@/app/authStore";

export default function Component() {
  const navigate = useNavigate();
  const location = useLocation();
  const redirect = location?.state?.redirect || "/";
  const { login } = useAuthStore();
  const { isLoading, error, handler } = useApi(userApi.login);

  async function handleSubmit({ email, password }: IAuthInputs) {
    const loadingToastId = toast.loading("Log in your account");

    const { responseData, success, error } = await handler({ email, password });

    if (success && !isLoading) {
      toast.success(responseData?.message, { id: loadingToastId });
      login(responseData?.data?.user);
      setTimeout(() => {
        navigate(redirect);
      }, 100);
    } else {
      toast.error("Login failed", {
        description: error?.message,
        id: loadingToastId,
      });
    }
  }
  return (
    <PageLayout className="flex justify-center items-center max-md:p-0 max-md:py-0 max-md:bg-primary-foreground">
      <AuthForm
        handleSubmit={handleSubmit}
        type="login"
        errorMessage={error?.message}
        isLoading={isLoading}
      />
    </PageLayout>
  );
}
