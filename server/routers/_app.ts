/**
 * This file contains the root router of the tRPC-backend
 */
import { createRouter } from "../createRouter";
import { bookingRouter } from "./booking";
import { testRouter } from "./test";

/**
 * Create your application's root router
 * If you want to use SSG, you need export this
 * @link https://trpc.io/docs/ssg
 * @link https://trpc.io/docs/router
 */
export const appRouter = createRouter()
  /**
   * Add data transformers
   * @link https://trpc.io/docs/data-transformers
   */
  // .transformer(superjson)
  /**
   * Optionally do custom error (type safe!) formatting
   * @link https://trpc.io/docs/error-formatting
   */
  // .formatError(({ shape, error }) => { })
  .merge("test.", testRouter)
  .merge("booking.", bookingRouter);

export type AppRouter = typeof appRouter;
