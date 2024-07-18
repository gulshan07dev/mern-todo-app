import PageLayout from "@/layouts/PageLayout";
import useAuthStore from "@/app/authStore";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { TimerIcon } from "lucide-react";

const Home = () => {
  const { user, isLoggedIn } = useAuthStore();
  return (
    <PageLayout className="flex flex-col gap-12 justify-center items-center">
      <div className="flex flex-col gap-3 items-center">
        <span>
          <TimerIcon size={100} className="text-muted-foreground" />
        </span>
        <h1 className="text-3xl bg-gradient-to-r from-[#ff00cc] to-[#3333ff] bg-clip-text text-transparent text-center">
          🎉WELCOME, {user?.name} TO MY Todo App
        </h1>
        <p className="text-2xl text-[#000000c9]">
          Created By <span className="font-medium">Gulshan</span>{" "}
          <span className="text-[#ff0000]">❤</span>
        </p>
      </div>

      {!isLoggedIn && (
        <Card className="pr-5">
          <span className="font-rubik">
            <Link to={"/login"} state={{ redirect: "/todos" }}>
              <Button className="bg-orange-500 rounded-none font-roboto">
                Login
              </Button>
            </Link>{" "}
            or{" "}
            <Link
              to={"/signup"}
              state={{ redirect: "/todos" }}
              className="text-zinc-900 font-lato font-semibold"
            >
              Signup
            </Link>{" "}
            to get started /
          </span>
        </Card>
      )}
    </PageLayout>
  );
};

export default Home;
