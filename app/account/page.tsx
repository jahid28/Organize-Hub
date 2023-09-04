"use client";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { useRouter } from "next/navigation";

const AccountPage = () => {
  const session = useSession();
  const router = useRouter();

  if (session.status == "unauthenticated") {
    router.replace("/Login");
  }

  return (
    <div className="grid place-items-center bg h-[100vh]">
      <div className="grid place-items-center">
        <h1 className="text-4xl text-center text mb-5 mt-8">
          Hi 👋 {session.data?.user?.name}
        </h1>
        <p className="text text-center">Your email : {session.data?.user?.email}</p>
        <button
          onClick={() => {
            signOut();
          }}
          className="text-white text bg_dark mb-5 mt-10 flex text-center  bg-gray-600 border-0 py-2 px-6 justify-center focus:outline-none hover:bg-gray-500 rounded text-lg"
        >
          LogOut
        </button>
      </div>
    </div>
  );
};

export default AccountPage;
