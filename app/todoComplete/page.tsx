"use client";
import { useEffect, useState } from "react";
import { BsPlusCircleFill, BsCheckCircleFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import Link from "next/link";
const TodoComplete = () => {
  const session = useSession();

  const [allTasks, setAllTasks] = useState([]);

  // let data: any;

  useEffect(() => {
    // console.log("useffetc");
    const getCompletedTasks = async () => {
      try {
        const response = await fetch("/api/todo", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: session.data?.user?.email,
            completed: true,
          }),
        });
        const data = await response.json();
        // console.log("func is", data);
        setAllTasks(data); // Set the fetched data to the state
      } catch (error) {
        console.log(error);
      }

      // data = await response.json();
    };
    if (session.status == "authenticated") getCompletedTasks();
    // getCompletedTasks()
  }, [session]);

  return (
    <main className="h-[100vh] bg grid place-items-center">
      <section>
      <div className="border-black border-2 p-4 rounded-md shadow-lg w-[90vw] md:w-[50vw]">
        <h1 className="text-3xl md:text-4xl text font-semibold mb-5">Your completed tasks</h1>

        <section id="sec" className="mt-3">
          <p>
            {allTasks.map((e: any, index) => (
              <div key={index} className="flex border-black border-2 p-2 mb-1">
                <p className="text">{e.task}</p>
              </div>
            ))}
          </p>
        </section>
      </div>
      <Link href={"/todoIncomplete"}>
        <button className="bg_dark text p-2 mt-4 text-2xl rounded-md">
          Incompleted tasks
        </button>
      </Link>
      </section>
    </main>
  );
};

export default TodoComplete;
