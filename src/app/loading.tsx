import { Spinner } from "@nextui-org/react";

const loading = () => {
  return (
    <section className="flex justify-center items-center h-screen bg-black/10 fixed inset-0 z-[999] backdrop-blur-md">
      <Spinner
        color="primary"
        label="Loading..."
        labelColor="primary"
        size="lg"
      />
    </section>
  );
};

export default loading;
