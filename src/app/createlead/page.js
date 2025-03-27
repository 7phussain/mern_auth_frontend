"use client";
import React, { Suspense } from "react";
import { useLead } from "@/context/Leadcontext";
import { Spinner, Flex } from "@chakra-ui/react";
const CreateLeadForm = React.lazy(() =>
  import("../components/leads/Create-Lead").then((module) => ({
    default: module.CreateLeadForm,
  }))
);
function Page() {
  const { tempLeadData, createLead } = useLead();

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
        <CreateLeadForm tempData={tempLeadData} createLead={createLead} />
      </Suspense>
    </div>
  );
}

export default Page;
