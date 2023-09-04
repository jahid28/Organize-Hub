"use client";
import { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { json } from "node:stream/consumers";
import { PacmanLoader } from "react-spinners";
import { useRouter } from "next/navigation";
const LoginPage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  //   if(session.status=='authenticated'){
  // router.replace("/userPage")
  //   }
  if (session) {
    router.replace("/userPage");
    return null; // Prevent rendering while redirecting
  }

  // console.log("sess from googlepage is ", session);

  // const saveUser=async(name:any, email:any)=>{
  //   const response = await fetch("/api/user", {
  //     method: "POST",
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ name,email }),
  //   });

  // }

  return (
    <div className="grid bg place-items-center w-[100vw] h-[100vh]">
      {/* <button
        onClick={() => {
          signIn();
        }}
      ></button> */}

      <div className="lg:w-2/6 md:w-1/2 bg_dark rounded-lg p-8 flex flex-col w-[90vw] mt-10 md:mt-0">
        <h2 className="text text-lg font-medium title-font mb-5">
          Login
        </h2>

        <button
          onClick={() => {
            signIn("google");
          }}
          className="text mb-5 flex  bg border-0 py-2 justify-center focus:outline-none hover:bg-gray-500 rounded text-lg"
        >
          Login through Google
          <p className="mt-1 ml-2">
            <FcGoogle />
          </p>
        </button>

        {/* {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type='button'
                  key={provider.id}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className='black_btn'
                >
                  Sign in
                </button>
              ))} */}

        <button
          onClick={() => {
            signIn("github");
          }}
          className="text flex  bg border-0 py-2 justify-center focus:outline-none hover:bg-gray-500 rounded text-lg"
        >
          Login through Github
          <p className="mt-1 ml-2">
            <FaGithub />
          </p>
        </button>

        <p className="text-xs text-gray-500 mt-3">
          Login quickly with google or github
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
