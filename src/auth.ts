import NextAuth, { type NextAuthConfig } from "next-auth"
import Credentials from 'next-auth/providers/credentials';
import { z } from "zod";
import prisma from "./lib/prisma";
import bcryptjs from 'bcryptjs';

export const authConfig: NextAuthConfig = {
    //difine the pages login an new-account
    pages: {
        signIn: '/auth/login',
        newUser: '/auth/new-account',
    },


    callbacks: {

        // Validation with middleware
        authorized({ auth, request: { nextUrl } }) {
            // console.log(auth);
            const isLoggedIn = !!auth?.user;


            const isOnDashboard = nextUrl.pathname.startsWith('/checkout') ||
                nextUrl.pathname.startsWith('/orders') || nextUrl.pathname.startsWith('/admin')
                || nextUrl.pathname.startsWith('/profile');
            if (isOnDashboard) {
                if (nextUrl.pathname.startsWith('/admin') && auth?.user.role != 'admin') return Response.redirect(new URL('/', nextUrl));
                if (isLoggedIn) return true;
                return false; // Redirect unauthenticated users to login page
            } else if (isLoggedIn && (nextUrl.pathname.startsWith('/auth'))) {
                return Response.redirect(new URL('/', nextUrl));
            }
            return true;
        },

        //json word token
        jwt({ token, user }) {
            //pass the data to session in de token
            if (user) {
                token.data = user;
            }

            return token;
        },

        session({ session, token, user }) {
            //difine the user with token dara to expand the user data
            // "as any" is used to avoid errors
            session.user = token.data as any;
            return session;
        }


    },
    // Define the providers in this case we have only credentials this porovider allows us to have a login with de database 
    providers: [
        Credentials({
            async authorize(credentials) {

                //Validation of data
                const parsedCredencial = z
                    .object({ email: z.string().email(), password: z.string().min(6) })
                    .safeParse(credentials);

                if (!parsedCredencial.success) return null; // The data is not correct

                // console.log(parsedCredencial.success);
                const { email, password } = parsedCredencial.data;


                //Shearch Email in DB
                const user = await prisma.user.findUnique({
                    where: {
                        email: email.toLowerCase(),
                    }
                });

                if (!user) return null;

                // Do a comparetion of passwords
                if (!bcryptjs.compareSync(password, user.password)) return null;


                // Return user without password
                const { password: _, ...rest } = user;


                return rest;

            }

        })


    ],
};

//export the variables wich will be used in the app to sing in, sign out, auth (session), handlers (it is used to get the session in the client side) 
export const { signIn, signOut, auth, handlers } = NextAuth(authConfig);