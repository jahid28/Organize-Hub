"use client";
import React from "react";
import { SiSimplenote } from "react-icons/si";
import { CgProfile } from "react-icons/cg";
import Link from "next/link";
import "../styles/component.css";
// interface PROPS{
//   authenticated:boolean,
//   name:string,
//   image:string
// }
import { useEffect, useState } from "react";

import Image from "next/image";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Navbar = () => {
  // const Navbar:React.FC<PROPS> = ({authenticated,name,image}) => {
  const { data: session } = useSession();
  // const session=useSession()
  // console.log("ss from nav is", session);
  // const [providers, setProviders] = useState(null);

  // useEffect(() => {
  //   (async () => {
  //     const res = await getProviders();
  //     setProviders(res);
  //   })();
  // }, []);
  const [mode, setState] = useState("lightmode");

  // function lightMode(){

  //     setState('lightmode')

  //   }
  //   function darkMode(){

  //     setState('darkmode')

  //   }
  useEffect(() => {
    document.body.className = mode;
  }, [mode]);

  return (
    <div className="bg_dark md:flex sticky top-0  w-[100vw] py-4 px-2">
      <Link href={"/"}>
        <div className="text-green-500 text-4xl flex mb-5">
          <SiSimplenote />
          <p className="text text-xl ml-3">Organize Hub</p>
        </div>
      </Link>

      <div className="ml-auto flex ">
        <button
          className="border-black border-2 rounded-full w-10 h-10 bg-white mr-1"
          onClick={() => {
            setState("lightmode");
          }}
        ></button>
        <button
          className="border-black border-2 rounded-full w-10 h-10 bg-black mr-1"
          onClick={() => {
            setState("darkmode");
          }}
        ></button>
        <button
          className="border-black border-2 rounded-full w-10 h-10 bg-blue-950 mr-1"
          onClick={() => {
            setState("bluemode");
          }}
        ></button>
        {/* <button
          className="border-black border-2 rounded-full w-10 h-10 bg-orange-900 mr-1"
          onClick={() => {
            setState("brownmode");
          }}
        ></button> */}
        <button
          className="border-black border-2 rounded-full w-10 h-10 bg-pink-900 mr-1"
          onClick={() => {
            setState("pinkmode");
          }}
        ></button>
        <button
          className="border-black border-2 rounded-full w-10 h-10 bg-green-900 mr-5"
          onClick={() => {
            setState("greenmode");
          }}
        ></button>

        {session != null ? (
          <div className="ml-auto">
            <Link href={"/account"}>
              <div className="text bg md:flex px-2 rounded-lg py-1 mr-1 text-xl ml-auto cursor-pointer">
                <p className="hidden md:block">{session.user?.name}</p>
                <Image
                  src={session.user?.image!}
                  width={35}
                  height={35}
                  alt="profile"
                  className="rounded-full md:ml-4"
                />
              </div>
            </Link>
          </div>
        ) : (
          <div className="ml-auto">
            <Link href="/Login">
              <div className="text bg px-2 rounded-lg py-1 flex mr-4 text-2xl ml-auto cursor-pointer ">
                Login
                <p className="text ml-2 text-3xl mt-1">
                  <CgProfile />
                </p>
              </div>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
