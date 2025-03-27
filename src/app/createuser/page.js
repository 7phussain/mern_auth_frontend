"use client";

import { useLead } from "@/context/Leadcontext";
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  VStack,
  Heading,
  Progress,
  HStack,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-toastify";

export default function Page() {
  const router = useRouter();
  const { userTempData, setUserTempData } = useLead();
  console.log("Create User Page", userTempData);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    fullName: "",
    password: "",
  });
  useEffect(() => {
    if (userTempData && Object.keys(userTempData).length > 0) {
      // Populate the form with userTempData if it's not empty (editing case)
      setFormData({
        username: userTempData?.username || "",
        email: userTempData?.email || "",
        fullName: userTempData?.fullName || "",
        password: "",
      });
    } else {
      formData.username = "";
      formData.email = "";
      formData.fullName = "";
      formData.password = "";
    }
  }, [userTempData]);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url =
        Object.keys(userTempData).length > 0
          ? `https://mern-auth-backend-sable.vercel.app/api/v1/user/register/${userTempData?._id}`
          : "https://mern-auth-backend-sable.vercel.app/api/v1/user/register";
      const res = await fetch(url, {
        method: Object.keys(userTempData).length > 0 ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }
      router.push("/userlist");
      setUserTempData({});
      toast.success(
        `User is successfully ${
          Object.keys(userTempData).length > 0 ? "updated" : "created"
        }`
      );
    } catch (err) {
      console.error("Error:", err.message);
    }
  };

  return (
    <Box maxW="400px" mx="auto" mt="10">
      <Heading mb="6">Create User</Heading>
      <Progress value={(step / 3) * 100} size="sm" colorScheme="teal" mb="6" />

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
      </form>

      {/* Step Indicator */}
      <Text mt={4} textAlign="center">
        Step {step} of 3
      </Text>
    </Box>
  );
}
