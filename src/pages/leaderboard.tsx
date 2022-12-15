import { motion } from "framer-motion";
import Head from "next/head";
import React, { useContext } from "react";
import { Loading } from "../components/Loading";
import { transition, variants } from "../constants/animation-values";
import { TestContext } from "../context/TestContext";
import { trpc } from "../lib/trpc";

const Leaderboard = () => {
  const { test } = useContext(TestContext);
  const leaderboard = trpc.leaderboard.get.useQuery({ testId: test.id });

  if (!leaderboard.data) {
    return <Loading />;
  }
  return (
    <>
      <Head>
        <title>leaderboard - typle.</title>
        <meta
          name="description"
          content="Leaderboard page for typle - a Wordle-like typing game with global leaderboard."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="page-container items-center justify-center">
        {/* leaderboard list section */}
        <motion.section
          variants={variants}
          initial="hidden"
          whileInView="visible"
          exit="exit"
          transition={transition}
          className="flex h-2/3 w-1/3 flex-col items-center justify-between p-4"
        >
          <h2 className="mb-4 text-3xl font-semibold text-white">
            Leaderboard
          </h2>
          <ul className="max-h-96 w-4/5 overflow-auto">
            {leaderboard.data.leaderboard.map((testResult, i) => {
              return (
                <li
                  key={i}
                  className="my-4 flex items-center justify-between rounded-md bg-dark-gray py-2 px-4 text-2xl font-semibold text-white"
                >
                  <p>{`${i + 1}. ${testResult.wpm}  `}</p>

                  <p className="italic">{testResult.username}</p>
                </li>
              );
            })}
          </ul>
        </motion.section>
      </main>
    </>
  );
};

export default Leaderboard;
