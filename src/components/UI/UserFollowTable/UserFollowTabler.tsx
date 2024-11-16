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
import { UseQueryResult } from "@tanstack/react-query";
import { useRef } from "react";

import UserFollowButton from "./UserFollowButton";

import { IUser } from "@/src/types";

const columns = [
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "action", label: "Action" },
];

export type RefetchType = UseQueryResult<IUser, Error>["refetch"];
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
  refetch?: RefetchType;
}) => {
  const users = tableType === "following" ? following : followers;

  const actionFollowToggler = useRef<boolean>(false);

  return (
    <Table aria-label="User follow table">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.key}
            align="start"
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
      {users?.length === 0 ? (
        <TableBody
          className=" focus-within:shadow-none border-none"
          emptyContent={`${tableType === "following" ? "You are not following anyone." : "You have no followers."}`}
        >
          {[]}
        </TableBody>
      ) : (
        <TableBody>
          {users?.map((user: IUser) => (
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
                        actionFollowToggler={actionFollowToggler}
                        tableType={tableType}
                        user={user}
                        viewer={viewer}
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
