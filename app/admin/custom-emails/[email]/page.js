import React from "react";
import CustomEmail from "../../../../components/admin/CustomEmails/CustomEmail";
export default function page({ params }) {
  const { email } = params;
  const em = email.replace("%40", "@");
  return (
    <div>
      <CustomEmail email={em} />
    </div>
  );
}
