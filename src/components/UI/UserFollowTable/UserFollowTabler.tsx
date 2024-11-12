"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  User,
} from "@nextui-org/react";
import { useState } from "react";

import UserFollowButton from "./UserFollowButton";

import { IUser } from "@/src/types";

const columns = [
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "action", label: "Action" },
];

const UserFollowTable = ({
  followers = [],
  following = [],
  viewer,
  tableType,
}: {
  followers?: IUser[];
  following?: IUser[];
  viewer: IUser;
  tableType?: string;
}) => {
  const users = tableType === "following" ? following : followers;

  const [mainUser, setMainUser] = useState<IUser[]>(users || []);
  const [action, setAction] = useState<boolean>(false);

  // Function to handle user unfollow
  const onUserUnfollowed = (userId: string) => {
    console.log("User unfollowed:", userId);
    setMainUser((prevUsers) => prevUsers.filter((user) => user._id !== userId));
  };

  console.log({ mainUser });

  return (
    <Table aria-label="User follow table">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.key}
            align={mainUser.length === 0 ? "center" : "start"}
            className={` ${
              column.key === "action"
                ? "flex justify-end me-5 pe-7 items-center"
                : ""
            }`}
          >
            {column.label}
          </TableColumn>
        )}
      </TableHeader>
      {mainUser?.length === 0 ? (
        <TableBody
          emptyContent={`${tableType === "following" ? "You are not following anyone." : "You have no followers."}`}
        >
          {[]}
        </TableBody>
      ) : (
        <TableBody>
          {mainUser?.map((user: IUser) => (
            <TableRow key={user?._id}>
              <TableCell>
                <User
                  avatarProps={{
                    radius: "lg",
                    src: user?.image[0]?.url || "",
                  }}
                  description={user?.email}
                  name={user?.name}
                />
              </TableCell>
              <TableCell>
                <p className="text-bold text-sm capitalize text-default-400">
                  {user?.email}
                </p>
              </TableCell>
              <TableCell className="flex justify-end me-5">
                <div className="relative flex items-center gap-2">
                  <Tooltip content="">
                    <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                      <UserFollowButton
                        setAction={setAction}
                        setMainUser={setMainUser}
                        tableType={tableType}
                        user={user}
                        viewer={viewer}
                        onUserUnfollowed={onUserUnfollowed} // Pass onUserUnfollowed here
                      />
                    </span>
                  </Tooltip>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      )}
    </Table>
  );
};

export default UserFollowTable;
