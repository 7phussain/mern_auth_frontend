import {
  Box,
  Flex,
  Link,
  Button,
  useColorMode,
  IconButton,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import NextLink from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [active, setActive] = useState("Home");
  const router = useRouter();

  const navItems = [
    { name: "Users", path: "/userlist" },
    { name: "Leads", path: "/" },
  ];

  return (
    <Box
      as="nav"
      position="sticky"
      top="0"
      zIndex="1000"
      bg={colorMode === "light" ? "white" : "gray.800"}
      boxShadow="md"
      px={6}
      py={3}
    >
      <Flex justify="space-between" align="center" maxW="1200px" mx="auto">
        <Flex gap={4}>
          {navItems.map((item) => (
            <>
              {" "}
              <NextLink key={item.name} href={item.path} passHref>
                <Link
                  px={4}
                  py={2}
                  fontWeight="bold"
                  rounded="md"
                  bg={active === item.name ? "blue.500" : "transparent"}
                  color={active === item.name ? "white" : "inherit"}
                  _hover={{ bg: "blue.400", color: "white" }}
                  onClick={() => setActive(item.name)}
                >
                  {item.name}
                </Link>
              </NextLink>
            </>
          ))}
          <button
            onClick={() => {
              localStorage.removeItem("authToken");
              router.push("/login");
            }}
          >
            Logout
          </button>
        </Flex>
        {/* 
        <IconButton
          icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          onClick={toggleColorMode}
          variant="ghost"
          aria-label="Toggle Dark Mode"
        /> */}
      </Flex>
    </Box>
  );
};

export default Navbar;
