"use client";
import React from "react";
import { useEffect, useState } from "react";
// import { BiEditAlt } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { GiCancel } from "react-icons/gi";
import { BsPlusCircleFill, BsCheckCircleFill } from "react-icons/bs";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import Link from "next/link";

const OtherTodayTasks = () => {
  interface newElementType {
    email: any;
    todayTask: any;
    taskDate: any;
  }
  const session = useSession();

//   const [isInputVisible, setIsInputVisible] = useState(false);
//   const [noteHead, setNoteHead] = useState("");
//   const [noteBody, setNoteBody] = useState("");
  const [allTodayTask, setAllTodayTask] = useState<newElementType[]>([]);
//   const handleNoteHead = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setNoteHead(event.target.value.toString());
//     // console.log("date ",(event.target.value).toString())
//   };
//   const handleNoteBody = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
//     setNoteBody(event.target.value);
//   };

//   let date = new Date();

//   const saveTomorrowTask = async () => {
//     try {
//       await fetch("/api/today", {
//         method: "POST",
//         body: JSON.stringify({
//           email: session.data?.user?.email,
//           noteBody,
//         }),
//       });

//       //   const newElement: newElementType = {
//       //     email: session.data?.user?.email!,
//       //     noteHead,
//       //     noteBody,
//       //   };
//       //   setAllNotes((prevArray) => [...prevArray, newElement]);

//     //   setNoteHead("");
//       setNoteBody("");
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const toggle = () => {
//     setIsInputVisible(!isInputVisible);
//   };

  useEffect(() => {
    // console.log("useffetc");
    const getNotes = async () => {
      try {
        // let taskDate=new Date().toLocaleDateString()

        const response = await fetch("/api/today", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: session.data?.user?.email,
            type:"notToday"
          }),
        });
        const data = await response.json();
        console.log('data is ',data)
        // console.log("func is", data);
        setAllTodayTask(data); // Set the fetched data to the state
      } catch (error) {
        console.log(error);
      }

    };
    if (session.status == "authenticated") getNotes();
  }, [session]);

  return (
    <div className="w-[100vw] h-[100vh] bg grid place-items-center">
      <div className="border-2 border-black p-4 rounded-md w-[90vw] md:w-[50vw]">
        <h1 className="text-2xl mb-4">All other tasks : </h1>

        {allTodayTask.map((e: any, index) => (
          <div
            key={index}
            className="flex text cursor-pointer border-black border-2 p-2 mb-1"
          >
        <p>{e.todayTask}</p>
        <p className="ml-auto p-1 bg_dark rounded-md">{e.taskDate}</p>
          </div>
        ))}

        
        <Link href={"/today"}>
        <button className="bg_dark text p-2 mt-4 rounded-md">
          Today&apos;s Tasks
        </button>
      </Link>
      </div>

      
    </div>
  );
};

export default OtherTodayTasks;
