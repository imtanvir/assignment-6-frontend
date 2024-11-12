import { Spinner } from "@nextui-org/react";

const loading = () => {
  return (
    <div className="flex h-[calc(100vh-64px)] flex-col justify-center items-center bg-black/10 z-[999] backdrop-blur-md">
      <Spinner size="lg" />
      <span>Loading...</span>
    </div>
  );
};

export default loading;
