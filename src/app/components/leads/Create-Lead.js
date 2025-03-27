"use client";
import { withFormik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";

const CreateLead = ({
  values,
  resetForm,
  handleBlur,
  setFieldValue,
  errors,
  handleSubmit,
  touched,
  formik,
}) => {
  return (
    <Box
      maxW="400px"
      mx="auto"
      my="100px"
      p={4}
      boxShadow="md"
      borderRadius="md"
      bg="white"
    >
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              name="name"
              value={values.name}
              onChange={(e) => setFieldValue("name", e.target.value)}
              placeholder="Enter full name"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              name="email"
              value={values?.email}
              onChange={(e) => setFieldValue("email", e.target.value)}
              placeholder="Enter email"
            />
          </FormControl>

          <FormControl>
            <FormLabel>Phone</FormLabel>
            <Input
              type="tel"
              name="phone"
              value={values?.number}
              onChange={(e) => setFieldValue("number", e.target.value)}
              placeholder="Enter phone number"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Status</FormLabel>
            <Select
              name="status"
              value={values?.status}
              onChange={(e) => setFieldValue("status", e.target.value)}
            >
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Qualified">Qualified</option>
              <option value="Lost">Lost</option>
              <option value="Closed">Closed</option>
            </Select>
          </FormControl>

          <Button
            type="submit"
            bg="#b3f5ea"
            color="black"
            _hover={{ bg: "#9ee8de" }}
            width="full"
          >
            Submit
          </Button>
        </VStack>
      </form>
    </Box>
  );
};
export const CreateLeadForm = withFormik({
  enableReinitialize: true,
  mapPropsToValues: ({ tempData }) => {
    return {
      name: tempData?.name || "",
      email: tempData?.email || "",
      number: tempData?.phone || "",
      status: tempData?.status || "",
    };
  },
  validationSchema: Yup.object().shape({}),
  handleSubmit: (values, { props: { createLead, tempData } }) => {
    createLead(values, tempData?._id);
    console.log("submit function is call");
  },
})(CreateLead);
