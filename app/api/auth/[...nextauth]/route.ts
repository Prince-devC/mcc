import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { authOptions } from "./auth";

const prisma = new PrismaClient();

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }; 