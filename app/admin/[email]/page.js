import React from "react";
import UserDeets from "../../../components/admin/EditDeets/UserDeets";

export default function page({ params }) {
  const { email } = params;
  return <UserDeets data={email} />;
}
