'use client'
import { url } from "inspector";
import Image from "next/image";
// import 'l' from Reacico
import { FaArrowRight } from 'react-icons/fa';
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
const session=useSession()
const router=useRouter()
//   if(session.status=='authenticated'){
// router.replace("/userPage")
//   }
  
  return (
    <div
      style={{ backgroundImage: 'url("gradient.jpg")' }}
      className="grid bg place-items-center w-[100vw] h-[100vh] bg-no-repeat bg-cover bg-center"
    >
      <div>
        <h1 className=" text-5xl md:text-7xl text-center font-extrabold text-gray-600">
          Welcome to Organize Hub
        </h1>
        <br />
        <p className="text-center text-2xl">
          The place to organize all your things and be efficient.
        </p>
      </div>


      <div>
        {session.status=='authenticated' ?
        (
        <Link href={"/userPage"}>
        <button  className="transition ease-in-out text-2xl bg-gray-900 text-white rounded-full py-2 px-6 hover:text-black hover:bg-white duration-500">Start Now &rarr; </button>
      
        </Link>

        ):
        (

        <Link href={"/Login"}>
        <button  className="transition ease-in-out text-2xl bg-gray-900 text-white rounded-full py-2 px-6 hover:text-black hover:bg-white duration-500">Start Now &rarr; </button>
      
        </Link>
        )
      }
      </div>
    </div>
  );
}
