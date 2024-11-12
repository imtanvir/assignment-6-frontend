import { Spinner } from "@nextui-org/react";

const Loading = ({ value = "Possessing" }: { value?: string }) => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-black/10 fixed inset-0 z-[999] backdrop-blur-md">
      <Spinner size="lg" />
      <span>{value}</span>
    </div>
  );
};

export default Loading;
