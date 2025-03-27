"use client";

import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  VStack,
  Heading,
  Text, // Import Text component to display error
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

export default function Page() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(""); // State for error message

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error on new submit

    try {
      setIsLoading(true);
      const res = await fetch(
        "https://mern-auth-backend-sable.vercel.app/api/v1/user/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Invalid credentials");
      }

      const token = data?.data?.accessToken;
      localStorage.setItem("authToken", token);
      toast.success("User logged in successfully");
      router.push("/");
    } catch (err) {
      // Set error message to state
      setError(err.message || "Invalid credentials");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box maxW="400px" mx="auto" mt="10">
      <Heading mb="6">Login</Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
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

          <Button type="submit" colorScheme="teal" width="full">
            {isLoading ? "Authenticating" : "Login"}
          </Button>

          {/* Sign Up Button */}
          <Button
            colorScheme="blue"
            variant="link"
            width="full"
            mt="4"
            onClick={() => router.push("/signup")} // Redirect to sign-up page
          >
            Don't have an account? Sign Up
          </Button>

          {/* Error Message */}
          {error && (
            <Text color="red.500" mt="4" textAlign="center">
              {error}
            </Text>
          )}
        </VStack>
      </form>
    </Box>
  );
}
