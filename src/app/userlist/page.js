"use client";

import dynamic from "next/dynamic";
import { Spinner, Flex } from "@chakra-ui/react";

// Lazy loading with a fallback spinner
const List = dynamic(() => import("../components/leads/UseList"), {
  ssr: false,
  loading: () => (
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
  ),
});

export default function Page() {
  return (
    <div>
      <List />
    </div>
  );
}
