import Today from "@/models/Today";
import { connectToDB } from "@/utils/database";
import { NextResponse } from "next/server";
// import { NextApiRequest, NextApiResponse } from 'next';

export async function POST(req) {
    await connectToDB()
    const { email, noteBody } = await req.json();
    let currentDate = new Date();
    const nextDate = new Date(currentDate);
    nextDate.setDate(currentDate.getDate() + 1);
        const nextDateString = nextDate.toLocaleDateString();


    await Today.insertMany({ email, todayTask:noteBody, taskDate:nextDateString })

    // return new Response(JSON.stringify({jeet:'jeet'}), { status: 200 })


    // return NextResponse.json({tasks:currentDate},{status:201})

}

export async function PUT(req) {
    const { email,type } = await req.json();
    await connectToDB()
    let currentDate=new Date().toLocaleDateString()
    if(type=="onlyToday"){

        let result = await Today.find({ taskDate:currentDate ,email })
        return NextResponse.json(result,{status:201})
    }
    else if(type=="notToday"){
        
        let result = await Today.find({ taskDate: { $ne: currentDate },email })
        return NextResponse.json(result,{status:201})
    }

    

    // return new Response(JSON.stringify(result), { status: 200 })

}

export async function DELETE(req) {
    await connectToDB()
    const { _id } = await req.json();

    await Today.deleteOne({ _id })
    
}

// export async function PATCH(req) {
//     await connectToDB()
//     const { _id,todayTask } = await req.json();
//     // _id='64e461b80fb287c73e95f93b'

//     await Today.updateOne({ _id }, { $set: { todayTask } })
//     //   return NextResponse.json({tasks:"updated"},{status:201})

//     // return new Response(JSON.stringify(result), { status: 200 })

// }