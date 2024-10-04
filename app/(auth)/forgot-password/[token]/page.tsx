import type { Metadata } from "next";
import { NewPasswordForm } from "./new-password-form";

export const metadata: Metadata = {
  title: "Reset password"
};

export default function Page() {
  return (
    <div className="w-full max-w-sm space-y-10">
      <NewPasswordForm />
    </div>
  );
}
