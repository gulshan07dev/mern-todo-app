import PageLayout from "@/layouts/PageLayout";

const Home = ({ name = "Gulshan" }: { name?: string }) => {
  return (
    <PageLayout className="flex justify-center items-center">
      <div className="flex flex-col gap-3 items-center">
        <span className="text-8xl">🎉</span>
        <h1 className="text-3xl bg-gradient-to-r from-[#ff00cc] to-[#3333ff] bg-clip-text text-transparent text-center">
          🎉WELCOME, {name} TO MY Todo App
        </h1>
        <p className="text-2xl text-[#000000c9]">
          Created By <span className="font-medium">Gulshan</span>{" "}
          <span className="text-[#ff0000]">❤</span>
        </p>
      </div>
    </PageLayout>
  );
};

export default Home;
