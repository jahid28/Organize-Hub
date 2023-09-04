import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';
// import { useRouter } from 'next/router';
// import { usePathname } from 'next/navigation'
import { usePathname,useRouter } from 'next/navigation'


import User from "@/models/user";
import { connectToDB } from "@/utils/database";
import { NextResponse } from "next/server";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_SECRET,
      // authorizationUrl: 'https://github.com/login/oauth/authorize', // Customize this URL

    })
  ],
  callbacks: {
    async session({ session }) {
      // store the user id from MongoDB to session
      // const sessionUser = await User.findOne({ email: session.user.email });
      // session.user.id = sessionUser._id.toString();

      return session;
    },

    async signIn({ account, profile, user, credentials }) {
      try {
        await connectToDB();
        const checkEmail = await User.find({ email: user.email })

        if (checkEmail.length == 0) {
          await User.insertMany({ name: user.name, email: user.email })

        }  

        return true
      }
      catch (error) {
        return false
      }
      // finally{
        
      // }
    },

//     async signOut({ session }) {
//       try {
//         // Here you can execute your custom function
//         // when someone signs out
// const router=useRouter()
// router.replace("/")        
//         // Returning true to allow sign out
//         return true;
//       } catch (error) {
//         return false;
//       }
//     },
  }
})


export { handler as GET, handler as POST }