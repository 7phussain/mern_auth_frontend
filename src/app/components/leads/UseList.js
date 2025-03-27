// components/List.tsx
"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
  Heading,
  IconButton,
  Spinner,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Flex,
} from "@chakra-ui/react";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { useLead } from "@/context/Leadcontext";
import { useSelector } from "react-redux";

const List = () => {
  const {
    fetchSingleLead,
    totalPages,
    deletelead,
    currentPage,
    setUserTempData,
    setCurrentPage,
    setEditLead,
    GetAllUser,
  } = useLead();
  const { user, isLoading } = useSelector((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    GetAllUser(currentPage);
  }, [currentPage]);

  return (
    <Box maxW="full" mx="auto" p={4}>
      {/* Header */}
      <Flex justify="space-between" align="center" mb={4}>
        <Box>
          <Heading size="lg">User List</Heading>
        </Box>
        <Button onClick={() => router.push("/createuser")}>Create User</Button>
      </Flex>

      {/* Table */}
      {isLoading ? (
        <Flex justify="center">
          <Spinner size="lg" />
        </Flex>
      ) : (
        <TableContainer
          maxH="400px"
          overflowY="auto"
          boxShadow="md"
          borderRadius="md"
          bg="white"
        >
          <Table variant="striped" colorScheme="teal">
            <Thead>
              <Tr>
                <Th>User Name</Th>
                <Th>Email</Th>
                <Th>Full Name</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {user.length > 0 ? (
                user.map((lead, index) => (
                  <Tr key={index}>
                    <Td>{lead?.username}</Td>
                    <Td>{lead.email}</Td>
                    <Td>{lead?.fullName}</Td>
                    <Td>
                      <Menu>
                        <MenuButton
                          as={IconButton}
                          icon={<AiOutlineEdit />}
                          size="sm"
                          colorScheme="blue"
                        />
                        <MenuList>
                          <MenuItem
                            onClick={() => {
                              setUserTempData(lead);
                              router.push("/createuser");
                            }}
                          >
                            <AiOutlineEdit style={{ marginRight: "5px" }} />
                            Edit
                          </MenuItem>
                          {/* <MenuItem
                            onClick={() => deletelead(lead._id)}
                            color="red"
                          >
                            <AiOutlineDelete style={{ marginRight: "5px" }} />
                            Delete
                          </MenuItem> */}
                        </MenuList>
                      </Menu>
                    </Td>
                  </Tr>
                ))
              ) : (
                <Tr>
                  <Td colSpan={4} textAlign="center">
                    <Text>No Users Found</Text>
                  </Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        </TableContainer>
      )}

      {/* Pagination */}
      <Flex justify="center" mt={4}>
        <Button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          isDisabled={currentPage === 1}
          mr={2}
          colorScheme="blue"
        >
          Previous
        </Button>
        <Text mx={2}>
          Page {currentPage} of {totalPages}
        </Text>
        <Button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          isDisabled={currentPage === totalPages}
          ml={2}
          colorScheme="blue"
        >
          Next
        </Button>
      </Flex>
    </Box>
  );
};

export default List;
// app/page.tsx
