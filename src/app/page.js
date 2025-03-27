"use client";
import React, { Suspense } from "react";
import { Spinner, Flex } from "@chakra-ui/react";
const List = React.lazy(() => import("./components/leads/list"));

export default function Home() {
  return (
    <div>
      <Suspense
        fallback={
          <Flex justify="center" align="center" height="100vh">
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              width="80px"
              height="80px"
            />
          </Flex>
        }
      >
        <List />
      </Suspense>
    </div>
  );
}
