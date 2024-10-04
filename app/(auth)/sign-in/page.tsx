import type { Metadata } from "next";
import Link from "next/link";
import { SigninForm } from "./sign-in-form";

export const metadata: Metadata = { title: "Sign in" };

export default function Page() {
  return (
    <div className="w-full max-w-sm space-y-10">
      <div className="text-center">
        <h2 className="text-lg font-bold tracking-tight text-gray-900">
          Welcome back
        </h2>
        <p className="mt-1 text-sm text-gray-700">Sign in to your account</p>
      </div>
      <SigninForm />
      <div className="text-center">
        <p className="text-sm text-gray-500">
          Don&apos;t have an account yet?{" "}
          <Link
            href="/create-account"
            className="font-semibold leading-6 text-emerald-600 hover:text-emerald-500">
            Create account
          </Link>{" "}
          here
        </p>
      </div>
    </div>
  );
}
