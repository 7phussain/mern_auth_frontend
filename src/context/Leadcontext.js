"use client";
import "react-toastify/dist/ReactToastify.css";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setLeads, setLoading } from "../redux/leadSlice";
import { setUser, setUserLoading } from "../redux/userSlice";
const LeadContext = createContext();
const baseurl = "https://mern-auth-backend-sable.vercel.app/api";
export const LeadProvider = ({ children }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editLead, setEditLead] = useState(false);
  const [tempLeadData, settempLeadData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [userTempData, setUserTempData] = useState({});
  const [totalPages, setTotalPages] = useState(1);
  const fetchLeads = async (filter = "All") => {
    dispatch(setLoading(true));

    const url =
      filter === "All"
        ? `${baseurl}/leads`
        : `${baseurl}/leads?status=${filter}`;

    try {
      const response = await axios.get(url);
      // Store leads data in Redux
      dispatch(setLeads(response?.data?.data));
    } catch (error) {
      console.error("Error fetching leads:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };
  const GetAllUser = async (page = 1, limit = 5) => {
    dispatch(setUserLoading(true));
    try {
      const response = await axios.get(
        `https://mern-auth-backend-sable.vercel.app/api/v1/user/getalluser?page=${page}&limit=${limit}`
      );
      dispatch(setUser(response?.data?.data?.users));
      setTotalPages(response?.data?.data?.totalPages);
      setCurrentPage(response?.data?.data?.currentPage);
    } catch (error) {
      console.error("Error fetching User:", error);
    } finally {
      dispatch(setUserLoading(false));
    }
  };
  const fetchSingleLead = async (id) => {
    const url = `${baseurl}/leads/${id}`;
    try {
      const response = await axios.get(url);
      settempLeadData(response?.data?.data);
    } catch (error) {
      console.error("Error fetching leads:", error);
    } finally {
    }
  };
  const createLead = async (payload, id, status = false) => {
    const payloadData = {
      name: payload?.name,
      email: payload?.email,
      phone: payload?.number,
      status: payload?.status,
    };
    const url = id ? `${baseurl}/leads/${id}` : `${baseurl}/leads/`;
    try {
      const response = id
        ? await axios.put(url, payloadData)
        : await axios.post(url, payloadData);
      setEditLead(false);
      settempLeadData({});
      fetchLeads();
      router.push("/");
      toast.success(`Lead is successfully ${id ? "updated" : "created"}`);
    } catch (error) {
      console.error("Error fetching leads:", error);
    } finally {
    }
  };
  const deletelead = async (id) => {
    const url = `${baseurl}/leads/${id}`;
    try {
      const response = await axios.delete(url);
      fetchLeads();
      toast.success(`Lead is successfully deleted`);
    } catch (error) {
      console.error("Error fetching leads:", error);
    } finally {
    }
  };
  useEffect(() => {
    fetchLeads();
  }, []);
  return (
    <LeadContext.Provider
      value={{
        fetchLeads,
        createLead,
        isLoading,
        setIsLoading,
        tempLeadData,
        currentPage,
        setCurrentPage,
        totalPages,
        setTotalPages,
        userTempData,
        setUserTempData,
        settempLeadData,
        editLead,
        setEditLead,
        fetchSingleLead,
        userList,
        setUserList,
        GetAllUser,
        deletelead,
      }}
    >
      {children}
    </LeadContext.Provider>
  );
};

export const useLead = () => useContext(LeadContext);
