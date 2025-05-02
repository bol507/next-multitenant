import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { headers as getHeader } from "next/headers";

export const authRouter = createTRPCRouter({
  session: baseProcedure.query(async ({ ctx }) => {
    const headers = await getHeader();
    const session = await ctx.db.auth({ headers });
    return session;

  }),
  
});
  