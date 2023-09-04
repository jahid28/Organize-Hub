import Note from "@/models/note";
import { connectToDB } from "@/utils/database";
import { NextResponse } from "next/server";
// import { NextApiRequest, NextApiResponse } from 'next';
export async function POST(req) {
    const { email, noteHead, noteBody } = await req.json();
    await connectToDB()

    await Note.insertMany({ email, noteHead, noteBody })

    // return new Response(JSON.stringify({jeet:'jeet'}), { status: 200 })


    // return NextResponse.json({tasks:"done"},{status:201})

}

export async function PUT(req) {
    const { email } = await req.json();
    await connectToDB()

    let result = await Note.find({ email })

    return new Response(JSON.stringify(result), { status: 200 })

}
export async function DELETE(req) {
    await connectToDB()
    const { _id } = await req.json();
    // _id='64e461b80fb287c73e95f93b'

    await Note.deleteOne({ _id })
    //   return NextResponse.json({tasks:"deletd"},{status:201})

    // return new Response(JSON.stringify(result), { status: 200 })

}

export async function PATCH(req) {
    await connectToDB()
    const { _id,noteHead,noteBody } = await req.json();
    // _id='64e461b80fb287c73e95f93b'

    await Note.updateOne({ _id }, { $set: { noteHead,noteBody } })
    //   return NextResponse.json({tasks:"updated"},{status:201})

    // return new Response(JSON.stringify(result), { status: 200 })

}