"use client";
import { useEffect, useState } from "react";
import { BsPlusCircleFill, BsCheckCircleFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import Link from "next/link";
const TodoImcomplete = () => {
  const session = useSession();
  interface newElementType {
    email: String;
    task: String;
    date: String;
    completed: Boolean;
  }

  const [date, setDate] = useState("");
  const [task, setTask] = useState("");
  const [allTasks, setAllTasks] = useState<newElementType[]>([]);

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value.toString());
    // console.log("date ",(event.target.value).toString())
  };
  const handleTaskChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTask(event.target.value);
  };

  const saveTask = async () => {
    try {
      await fetch("/api/todo", {
        method: "POST",
        body: JSON.stringify({
          email: session.data?.user?.email,
          task: task,
          date: date,
          completed: false,
        }),
      });

      const newElement: newElementType = {
        email: session.data?.user?.email!,
        task: task,
        date: date,
        completed: false,
      };
      setAllTasks((prevArray) => [...prevArray, newElement]);

      setTask("");
      setDate("");
    } catch (error) {
      console.log(error);
    }
  };

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
            completed: false,
          }),
        });
        const data = await response.json();
        console.log("func is", data);
        setAllTasks(data); // Set the fetched data to the state
      } catch (error) {
        console.log(error);
      }

      // data = await response.json();
    };
    if (session.status == "authenticated") getCompletedTasks();
    // getCompletedTasks()
  }, [session]);
  // getCompletedTasks();

  // setInterval(() => {
  //   console.log("ddd is ", allTasks);
  // }, 2000);

  // setTimeout((e:any) => {
  //   e.preventDefault()
  //   setAllTasks(data);
  //   console.log('all is 1s',allTasks)
  // }, 1000);
  // console.log('all is ',allTasks)

  const deleteTask = async (_id: any, index: any) => {
    try {
      const newArray = [...allTasks];
      newArray.splice(index, 1);
      setAllTasks(newArray);

      await fetch("/api/todo", {
        method: "DELETE",
        body: JSON.stringify({
          _id: _id,
        }),
      });
    } catch (error) {
      console.log(error);
    }
  };
  const completeTask = async (_id: any, index: any) => {
    try {
      const newArray = [...allTasks];
      newArray.splice(index, 1);
      setAllTasks(newArray);

      await fetch("/api/todo", {
        method: "PATCH",
        body: JSON.stringify({
          _id: _id,
        }),
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="h-[100vh] bg grid place-items-center">
        <div className="border-black border-2 p-4 rounded-md mx-1 shadow-lg ">
          <h1 className="text-4xl text font-semibold mb-5">To Do</h1>
          <div className="md:flex">
            <input
              onChange={handleTaskChange}
              className="p-1 w-[80vw] md:w-[40vw] mb-2 mr-2 bg_dark text border-black border-2 rounded-md "
              type="text"
              placeholder="Task"
              value={task}
            />
            <br />
            <div className="flex">
            <input
              onChange={handleDateChange}
              className="border-black bg_dark text border-2 mr-2 rounded-md"
              type="date"
              value={date}
            />
            <p
              onClick={saveTask}
              className="text-green-500 text-4xl cursor-pointer"
            >
              <BsPlusCircleFill />
            </p>
            </div>
          </div>

          <section id="sec" className="mt-3">
            <p>
              {allTasks.map((e: any, index) => (
                <div
                  key={index}
                  className="md:flex border-black border-2 p-2 mb-1"
                >
                  <p className="text mb-2">{e.task}</p>
                  <div className="md:ml-auto flex ">
                    <p className=" text bg-gray-500 rounded-md p-1 mr-3">
                      {e.date}
                    </p>
                    <p
                      onClick={() => {
                        deleteTask(e._id, index);
                      }}
                      className=" text-red-500 mr-3 text-3xl cursor-pointer"
                    >
                      <MdDelete />
                    </p>
                    <p
                      onClick={() => {
                        completeTask(e._id, index);
                      }}
                      className=" text-green-500 text-3xl cursor-pointer"
                    >
                      <BsCheckCircleFill />
                    </p>
                  </div>
                </div>
              ))}
            </p>
          </section>
        <Link href={"/todoComplete"}>
          <button className="bg_dark text p-2 mt-4 text-2xl rounded-md">
            Completed tasks
          </button>
        </Link>
        </div>

    </main>
  );
};

export default TodoImcomplete;
