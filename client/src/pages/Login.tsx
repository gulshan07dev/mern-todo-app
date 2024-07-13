import { useNavigate } from "react-router-dom";

import PageLayout from "@/layouts/PageLayout";
import AuthForm, { IAuthInputs } from "@/components/auth/AuthForm";
import { toast } from "sonner";
import useApi from "@/hooks/useApi";
import { userApi } from "@/http";

export default function Component() {
  const navigate = useNavigate();
  const { isLoading, error, handler } = useApi(userApi.login);

  async function handleSubmit({ email, password }: IAuthInputs) {
    toast("Log in your account...");
    const { responseData, success, error } = await handler({ email, password });
    if (success && !isLoading) {
      toast(responseData?.message);
      navigate("/");
    } else {
      toast(error?.message);
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