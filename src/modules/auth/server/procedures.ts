import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import z from "zod";
import { headers as getHeader, cookies as getCookies } from "next/headers";
import { AUTH_COOKIE } from "../constants";

export const authRouter = createTRPCRouter({
  session: baseProcedure.query(async ({ ctx }) => {
    const headers = await getHeader();
    const session = await ctx.db.auth({ headers });
    return session;

  }),
  register: baseProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string(),
        username: z.string()
          .min(3,"Username must be at least 3 characters")
          .max(63,"Username must be less than 63 characters")
          .regex(/^[a-z0-9][a-z0-9-]*[a-z0-9]$/,"Username must be alphanumeric")
          .refine(
            (value) => !value.includes("--"),
            "Username cannot contain two consecutive hyphens"
          )
          .transform((value) => value.toLowerCase()),
      })
      
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.create({
        collection: "users",
        data: {
          email: input.email,
          username: input.username,
          password: input.password,
        },
      });
      const data = await ctx.db.login({
        collection: "users",
        data: {
          email: input.email,
          password: input.password,
        },
      })
      if(!data.token) throw new TRPCError({code:"UNAUTHORIZED", message:"Invalid email or password"})
      const cookies = await getCookies();
      cookies.set({
        name: AUTH_COOKIE,
        value: data.token,
        httpOnly: true,
        path: "/",
        // TODO: ensure cross-domain cookie string
      });
    }),
  login: baseProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string()
      })
      
    )
    .mutation(async ({ ctx, input }) => {
      const data = await ctx.db.login({
        collection: "users",
        data: {
          email: input.email,
          password: input.password,
        },
      })
      if(!data.token) throw new TRPCError({code:"UNAUTHORIZED", message:"Invalid email or password"})
      const cookies = await getCookies();
      cookies.set({
        name: AUTH_COOKIE,
        value: data.token,
        httpOnly: true,
        path: "/",
        // TODO: ensure cross-domain cookie string
      });
      return data;
    
     
    }),
  logout: baseProcedure.mutation(async () => {
    const cookies = await getCookies();
    cookies.delete(AUTH_COOKIE);
  }),
});
