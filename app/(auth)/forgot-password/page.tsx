import type { Metadata } from "next";
import Link from "next/link";
import { ForgotPasswordForm } from "./forgot-password-form";

export const metadata: Metadata = { title: "Forgot password" };

export default function Page() {
  return (
    <div className="w-full max-w-sm space-y-10">
      <div className="text-center">
        <h2 className="text-xl font-bold tracking-tight text-gray-900">
          Forgot password?
        </h2>
      </div>
      <ForgotPasswordForm />
      <div className="text-center">
        <Link
          href="/sign-in"
          className="inline-flex items-center gap-x-2 text-sm font-semibold leading-6 text-emerald-600 hover:text-emerald-500">
          Return to Sign in
        </Link>
      </div>
    </div>
  );
}
