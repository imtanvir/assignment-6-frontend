"use client";
import { Avatar } from "@nextui-org/avatar";
import { Card, CardBody } from "@nextui-org/card";
import { Tab, Tabs } from "@nextui-org/tabs";
import { useEffect, useState } from "react";

import Container from "./Container";
import PostCard from "./postCard";
import PostLoadingSkeleton from "./postLoadingSkeleton";

import { useUser } from "@/src/context/user.provider";
import { getUserPosts } from "@/src/services/AuthService";
import { IPost } from "@/src/types";

export default function UserProfile() {
  const { user } = useUser();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (user?.name) {
      getName(user?.name as string);
    }
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getUserPosts();

        if (response?.data) {
          setLoading(false);
        }

        setPosts(response?.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const getName = (name: string) => {
    if (name) {
      const match = name.match(/^(\w)\w*\s*(\w)?/i);

      return match ? (match[1] + (match[2] || "")).toUpperCase() : "";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
        <Avatar
          name={userName ? userName : user?.name?.split(" ")[0]}
          size="lg"
          src={user?.image[0]?.url ? user?.image[0]?.url : ""}
        />
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl font-bold">{user?.name}</h1>
          <p className="mt-2 max-w-md">{user?.email}</p>
        </div>
        <div className="flex gap-8 text-center py-4">
          <div>
            <p className="text-base font-bold">
              {(user?.followers && user?.followers.length) || 0}
            </p>
            <p className="text-muted-foreground text-sm">Followers</p>
          </div>
          <div>
            <p className="text-base font-bold">
              {(user?.following && user?.following.length) || 0}
            </p>
            <p className="text-muted-foreground text-sm">Following</p>
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col">
        <Tabs aria-label="Options">
          <Tab key="posts" title="Posts">
            <Card className="hello">
              <CardBody
                className={`bg-indigo-200 dark:bg-slate-800 shadow-none`}
              >
                <Container>
                  <section>
                    {loading && <PostLoadingSkeleton />}
                    {posts.map((post: IPost) => (
                      <div key={post._id}>
                        <PostCard singlePost={post} />
                      </div>
                    ))}
                    {posts.length === 0 && !loading && (
                      <div className="flex justify-center items-center mb-5">
                        <p className="text-2xl font-light font-mono">
                          You have no posts...
                        </p>
                      </div>
                    )}
                  </section>
                </Container>
              </CardBody>
            </Card>
          </Tab>
          <Tab key="followers" title="Followers">
            <Card>
              <CardBody>
                <h3>The people who follow you</h3>
              </CardBody>
            </Card>
          </Tab>
          <Tab key="following" title="Following">
            <Card>
              <CardBody>
                Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur.
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}
