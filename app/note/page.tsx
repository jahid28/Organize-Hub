"use client";
import { useEffect, useState } from "react";
import { BsPlusCircleFill } from "react-icons/bs";
// import { BiEditAlt } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { GiCancel } from "react-icons/gi";
// import "@styles/note.css";
// import './style.css'

import { signIn, signOut, useSession, getProviders } from "next-auth/react";
// import Link from "next/link";
const NotePage = () => {
  interface newElementType {
    email: any;
    noteHead: any;
    noteBody: any;
  }
  const session = useSession();
  const [noteHead, setNoteHead] = useState("");
  const [noteBody, setNoteBody] = useState("");
  const [allNotes, setAllNotes] = useState<newElementType[]>([]);
  const [singleNoteID, setSingleNoteID] = useState<String>();

  const handleNoteHead = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNoteHead(event.target.value.toString());
    // console.log("date ",(event.target.value).toString())
  };
  const handleNoteBody = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNoteBody(event.target.value);
  };

  const saveNote = async () => {
    try {
      await fetch("/api/note", {
        method: "POST",
        body: JSON.stringify({
          email: session.data?.user?.email,
          noteHead,
          noteBody,
        }),
      });

      const newElement: newElementType = {
        email: session.data?.user?.email!,
        noteHead,
        noteBody,
      };
      setAllNotes((prevArray) => [...prevArray, newElement]);

      setNoteHead("");
      setNoteBody("");
    } catch (error) {
      console.log(error);
    }
  };
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [isNoteVisible, setIsNoteVisible] = useState(false);

  const toggle = () => {
    setIsInputVisible(!isInputVisible);
  };
  const toggleNoteVisible = () => {
    setIsNoteVisible(!isNoteVisible);
  };

  useEffect(() => {
    // console.log("useffetc");
    const getNotes = async () => {
      try {
        const response = await fetch("/api/note", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: session.data?.user?.email,
          }),
        });
        const data = await response.json();
        // console.log("func is", data);
        setAllNotes(data); // Set the fetched data to the state
      } catch (error) {
        console.log(error);
      }

      // data = await response.json();
    };
    if (session.status == "authenticated") getNotes();
    // getCompletedTasks()
  }, [session]);

  const deleteNote = async (_id: any, index: any) => {
    try {
      const newArray = [...allNotes];
      newArray.splice(index, 1);
      setAllNotes(newArray);

      await fetch("/api/note", {
        method: "DELETE",
        body: JSON.stringify({
          _id: _id,
        }),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const noteClicked = (_id:any,index: any) => {
    setIsNoteVisible(!isNoteVisible);
    setSingleNoteID(_id)
    setNoteHead(allNotes[index].noteHead);
    setNoteBody(allNotes[index].noteBody);
  };

  const updateNote = async () => {
    try {

      await fetch("/api/note", {
        method: "PATCH",
        body: JSON.stringify({
          _id: singleNoteID,
          noteHead,
          noteBody
        }),
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="h-[100vh] bg grid place-items-center">
      <div className="border-black border-2 p-4 rounded-md shadow-lg w-[90vw] md:w-[50vw]">
        <div className="flex">
          <h1 className="text text-4xl font-semibold mb-5">Notes</h1>

          <p
            onClick={toggle}
            className="text-green-500 text-4xl cursor-pointer ml-auto"
          >
            <BsPlusCircleFill />
          </p>
        </div>

        <section id="sec" className="mt-3">
          <div>
            {allNotes.map((e: any, index) => (
              <div
                key={index}
                onClick={() => {
                  noteClicked(e._id,index);
                }}
                className="flex cursor-pointer border-black border-2 p-2 mb-1"
              >
                <p className="text">{e.noteHead}</p>
                <div className="ml-auto flex w-1/12">
                  <p
                    onClick={() => {
                      deleteNote(e._id, index);
                    }}
                    className=" text-red-500 mr-3 text-3xl cursor-pointer"
                  >
                    <MdDelete />
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {isNoteVisible ? (
        <div className="w-[100vw] h-[100vh] grid place-items-center bg fixed">
          <section className="border-black border-2 p-2 rounded-md w-[90vw] md:w-[50vw]">
            <input
              onChange={handleNoteHead}
              value={noteHead}
              type="text"
              placeholder="Heading"
              className="p-1 text border-black bg_dark border-2 text-xl mb-4 w-full"
            />
            <br />
            <textarea
              onChange={handleNoteBody}
              value={noteBody}
              cols={30}
              rows={10}
              placeholder="Your note here"
              contentEditable={true}
              className="p-1 text bg_dark border-black text-xl border-2 w-full"
            ></textarea>
            <button
              onClick={() => {
                updateNote();
              }}
              className="p-2 rounded-md bg_dark text mt-3"
            >
              Save Changes
            </button>
          </section>
          <p onClick={toggleNoteVisible} className="text-5xl mb-8 cursor-pointer">
            <GiCancel />
          </p>
        </div>
      ) : (
        <div></div>
      )}

      {isInputVisible ? (
        <div className="w-[100vw] h-[100vh] grid place-items-center bg fixed">
          <section className="border-black border-2 p-2 rounded-md w-[90vw] md:w-[50vw]">
            <input
              onChange={handleNoteHead}
              type="text"
              placeholder="Heading"
              className="p-1 text bg_dark border-black  text-xl border-2 mb-4 w-full"
            />
            <br />
            <textarea
              onChange={handleNoteBody}
              cols={30}
              rows={10}
              placeholder="Your note here"
              className="p-1 text bg_dark border-black text-xl border-2 w-full"
            ></textarea>
            <button
              onClick={() => {
                saveNote();
              }}
              className="p-2 rounded-md text bg_dark mt-3"
            >
              Add
            </button>
          </section>
          <p onClick={toggle} className="text-5xl mb-8 cursor-pointer">
            <GiCancel />
          </p>
        </div>
      ) : (
        <div></div>
      )}
    </main>
  );
};

export default NotePage;
