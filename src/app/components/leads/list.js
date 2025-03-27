"use client";
import { useRouter } from "next/navigation";
import { Button, ButtonGroup } from "@chakra-ui/react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Select,
  Box,
  Heading,
  IconButton,
  Spinner,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useLead } from "@/context/Leadcontext";
import { useEffect } from "react";
const List = () => {
  const {
    fetchLeads,
    fetchSingleLead,
    deletelead,
    editLead,
    setEditLead,
    createLead,
  } = useLead();
  const { leads, isLoading } = useSelector((state) => state.leads);
  const router = useRouter();
  useEffect(() => {
    fetchLeads();
  }, []);
  return (
    <Box maxW="full" mx="auto" p={4}>
      <div className=" flex justify-between items-center">
        <div>
          <Heading size="lg" mb={4}>
            Lead Management
          </Heading>

          {/* Status Filter */}
          <Select
            bg="white"
            width={400}
            mb={4}
            onChange={(e) => fetchLeads(e.target.value)}
          >
            <option value="All">All</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Qualified">Qualified</option>
            <option value="Lost">Lost</option>
            <option value="Closed">Closed</option>
          </Select>
        </div>
        <Button
          onClick={() => {
            router.push("/createlead");
          }}
        >
          Create Lead
        </Button>
      </div>

      {/* Table */}

      {isLoading ? (
        <div className=" w-full justify-center flex">
          <Spinner size="lg" />
        </div>
      ) : (
        <TableContainer
          maxH="400px"
          overflowY="auto"
          boxShadow="md"
          borderRadius="md"
          bg="white"
        >
          <Table variant="striped" colorScheme="teal">
            <Thead
              border={3}
              //  bg="blue.500"
            >
              <Tr>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Phone</Th>
                <Th>Status</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {leads.length > 0 ? (
                leads.map((lead, index) => (
                  <Tr key={index}>
                    <Td>{lead.name}</Td>
                    <Td>{lead.email}</Td>
                    <Td>{lead.phone || "N/A"}</Td>
                    <Td>
                      <Select
                        value={lead.status}
                        onChange={(e) =>
                          createLead(
                            {
                              ...lead,
                              status: e?.target?.value,
                            },
                            lead._id,
                            true
                          )
                        }
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Qualified">Qualified</option>
                        <option value="Lost">Lost</option>
                        <option value="Closed">Closed</option>
                      </Select>
                    </Td>
                    <Td>
                      <Menu>
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
                                fetchSingleLead(lead?._id);
                                setEditLead(true);
                                router.push("/createlead");
                              }}
                            >
                              <AiOutlineEdit style={{ marginRight: "5px" }} />{" "}
                              Edit
                            </MenuItem>
                            <MenuItem
                              onClick={() => deletelead(lead._id)}
                              color="red"
                            >
                              <AiOutlineDelete style={{ marginRight: "5px" }} />{" "}
                              Delete
                            </MenuItem>
                          </MenuList>
                        </Menu>
                      </Menu>
                    </Td>
                  </Tr>
                ))
              ) : (
                <Tr>
                  <Td colSpan={5} textAlign="center">
                    <Text>No Leads Found</Text>
                  </Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default List;
