"use client";
import { ChakraProvider } from "@chakra-ui/react";
import { LeadProvider } from "../context/Leadcontext";
import { ToastContainer, toast } from "react-toastify";
import "./globals.css";
import { store } from "../redux/store";
import { Provider } from "react-redux";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
// import { useRouter }
// from "next/navigation";
import { redirect, useRouter } from "next/navigation";
import { revalidatePath } from "next/cache";
import Navbar from "./components/Navbar";

export default function RootLayout({ children }) {
  const router = useRouter();
  const [isSidebar, setIsSidebar] = useState(false);
  const pathname = usePathname();
  console.log("pathname", pathname);
  useEffect(() => {
    if (pathname != "/signup") {
      const token = localStorage.getItem("authToken");
      if (!token) {
        router.push("/login"); // Use router.push() instead of redirect()
      }
    }
    if (pathname == "/signup" || pathname == "/login") {
      setIsSidebar(false);
    } else {
      setIsSidebar(true);
    }
  }, [pathname]);

  return (
    <html lang="en">
      <body className={``}>
        <Provider store={store}>
          <LeadProvider>
            <ChakraProvider>
              {isSidebar && <Navbar />}
              {children}
              <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                closeButton={true}
                newestOnTop
                rtl={false}
              />
            </ChakraProvider>
          </LeadProvider>
        </Provider>
      </body>
    </html>
  );
}

// "use client";
// import { ChakraProvider } from "@chakra-ui/react";
// import { LeadProvider } from "../context/Leadcontext";
// import { ToastContainer, toast } from "react-toastify";
// import "./globals.css";
// import { store } from "../redux/store";
// import { Provider } from "react-redux";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";

// export default function RootLayout({ children }) {
//   const router = useRouter();
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     // Check if the token exists in localStorage
//     const token = localStorage.getItem("authToken");
//     if (token) {
//       setIsAuthenticated(true); // Token exists, user is authenticated
//     } else {
//       router.push("/login"); // Redirect to login page if no token
//     }
//   }, [router]);

//   if (!isAuthenticated) {
//     return null; // Don't render children until authentication check is done
//   }

//   return (
//     <html lang="en">
//       <body>
//         <Provider store={store}>
//           <LeadProvider>
//             <ChakraProvider>
//               {children}
//               <ToastContainer
//                 position="top-right"
//                 autoClose={3000}
//                 hideProgressBar={false}
//                 closeButton={true}
//                 newestOnTop
//                 rtl={false}
//               />
//             </ChakraProvider>
//           </LeadProvider>
//         </Provider>
//       </body>
//     </html>
//   );
// }
