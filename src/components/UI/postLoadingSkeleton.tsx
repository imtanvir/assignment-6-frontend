import { Card } from "@nextui-org/card";
import { Skeleton } from "@nextui-org/skeleton";

import Container from "./Container";

const PostLoadingSkeleton = () => {
  return (
    <>
      <Container>
        {[1, 2].map((index) => (
          <div key={index} className="mb-6">
            <Card className=" space-y-5 p-4" radius="lg">
              <Skeleton className="rounded-lg">
                <div className="h-24 rounded-lg bg-default-300" />
              </Skeleton>
              <div className="space-y-3">
                <Skeleton className="w-3/5 rounded-lg">
                  <div className="h-3 w-3/5 rounded-lg bg-default-200" />
                </Skeleton>
                <Skeleton className="w-4/5 rounded-lg">
                  <div className="h-3 w-4/5 rounded-lg bg-default-200" />
                </Skeleton>
                <Skeleton className="w-2/5 rounded-lg">
                  <div className="h-3 w-2/5 rounded-lg bg-default-300" />
                </Skeleton>
              </div>
            </Card>
          </div>
        ))}
      </Container>
    </>
  );
};

export default PostLoadingSkeleton;
