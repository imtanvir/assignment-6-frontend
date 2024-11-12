import { Card } from "@nextui-org/card";
import { Skeleton } from "@nextui-org/skeleton";

import Container from "./Container";

const PostLoadingSkeleton = ({ item = [1] }: { item?: number[] }) => {
  return (
    <>
      <Container>
        <div className="flex flex-col justify-center gap-5 pb-5">
          {item.map((index) => (
            <div key={index} className="">
              <Card className=" space-y-5 p-4" radius="lg">
                <Skeleton className="rounded-lg">
                  <div className="h-40 rounded-lg bg-default-400" />
                </Skeleton>
                <div className="space-y-3">
                  <Skeleton className="w-3/5 rounded-lg">
                    <div className="h-16 w-full rounded-lg bg-default-300" />
                  </Skeleton>
                  <Skeleton className="w-4/5 rounded-lg">
                    <div className="h-3 w-4/5 rounded-lg bg-default-300" />
                  </Skeleton>
                  <Skeleton className="w-2/5 rounded-lg">
                    <div className="h-3 w-2/5 rounded-lg bg-default-400" />
                  </Skeleton>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </Container>
    </>
  );
};

export default PostLoadingSkeleton;
