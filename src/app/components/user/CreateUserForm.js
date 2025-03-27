"use client";
// components/CreateUserForm.tsx
import React, { useEffect } from "react";
import {
  Button,
  Input,
  FormControl,
  FormLabel,
  VStack,
  HStack,
  Text,
} from "@chakra-ui/react";
import { useLead } from "@/context/Leadcontext";

export const CreateUserForm = ({
  step,
  setStep,
  formData,
  handleChange,
  handleNext,
  handleBack,
  handleSubmit,
}) => {
  const { userTempData, setUserTempData } = useLead();
  useEffect(() => {
    alert("useEffect ");
    if (userTempData && Object.keys(userTempData).length > 0) {
      // Populate the form with userTempData if it's not empty (editing case)
      formData.username = userTempData.username || "";
      formData.email = userTempData.email || "";
      formData.fullName = userTempData.fullName || "";
      formData.password = userTempData.password || "";
    } else {
      // Clear formData for new user creation (empty userTempData)
      formData.username = "";
      formData.email = "";
      formData.fullName = "";
      formData.password = "";
    }
  }, [userTempData]);
  alert("useEffect ");
  return (
    <form onSubmit={step === 3 ? handleSubmit : (e) => e.preventDefault()}>
      <VStack spacing={4}>
        {step === 1 && (
          <>
            <FormControl isRequired>
              <FormLabel>Username</FormLabel>
              <Input
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
            </FormControl>
          </>
        )}

        {step === 2 && (
          <>
            <FormControl isRequired>
              <FormLabel>Full Name</FormLabel>
              <Input
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
              />
            </FormControl>
          </>
        )}

        {step === 3 && (
          <>
            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
              />
            </FormControl>
          </>
        )}

        {/* Step Control Buttons */}
        <HStack justify="space-between" width="full" mt={4}>
          {step > 1 && (
            <Button onClick={handleBack} colorScheme="gray" width="full">
              Back
            </Button>
          )}
          {step < 3 ? (
            <Button onClick={handleNext} colorScheme="teal" width="full">
              Next
            </Button>
          ) : (
            <Button type="submit" colorScheme="teal" width="full">
              Submit
            </Button>
          )}
        </HStack>
      </VStack>

      {/* Step Indicator */}
      <Text mt={4} textAlign="center">
        Step {step} of 3
      </Text>
    </form>
  );
};
