import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createNote } from "../redux/slices/createNoteSlice";
import { createUser } from "../redux/slices/createUserSlice";

export const useCallAPI = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const [notes, setNotes] = useState(null);
  const [notesId,setNotesId] = useState(null);
  const [success,setSuccess] = useState(false);

  const dispatch = useDispatch();


  const getUserInfo = JSON.parse(localStorage.getItem("userInfo"));

  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };
  const options = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${getUserInfo?.token}`,
    },
  };
  const callLoginPostAPI = async (email, password) => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        "/api/users/login",
        { email, password },
        config
      );
      setLoading(false);
      setUserInfo(data);
      dispatch(createUser(data));
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      setLoading(false);
      setError(error.response.data?.message);
    }
  };

  const callRegisterPostAPI = async (name, email, password, pic) => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        "/api/users",
        { name, email, password, pic },
        config
      );
      setLoading(false);
      setUserInfo(data);
      dispatch(userInfo(data));
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      setLoading(false);
      setError(error.response.data?.message);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setError("");
    }, 3500);
    return () => {
      clearTimeout(timer);
    };
  }, [error]);

  const fetchNotes = async () => {
    try {
      setLoading(true);
     
      if (getUserInfo?.token) {
        const { data } = await axios.get("/api/notes", options);
        setNotes(data);
        dispatch(createNote(data));
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err.response.data?.message);
    }
  };

  const createPostNoteAPI = async (title, content, category) => {
    try {
      setLoading(true);
     
      if (getUserInfo?.token) {
        const { data } = await axios.post(
          "/api/notes/create",
          { title, content, category },
          options
        );
        dispatch(createNote(data));
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      setError(error.response.data?.message);
    }
  };

  const updatePostNoteAPI = async (id, title, content, category) => {
    try {
      setLoading(true);
     
      if (getUserInfo?.token) {
        const { data } = await axios.put(
          `/api/notes/${id}`,
          { title, content, category },
          options
        );
        setNotes(data);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      setError(error.response.data?.message);
    }
  };

  const deleteNoteAPI = async(id) => {
    try{
    const {data} = await axios.delete(`/api/notes/${id}`,options);
    setLoading(false);
    setNotesId(id);
    }catch(error){
      setLoading(false);
      setError(error.response.data?.message);
    }
  }

  const updateProfilePostAPI = async (name,email,password,pic) => {
    try{
      setLoading(true);
      if (getUserInfo?.token) {
      const {data} = await axios.post("/api/users/profile",{name,email,password,pic},options);
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      setSuccess(true);
      }
      }catch(error){
        setLoading(false);
        setError(error.response.data?.message);
      }
  }

  return {
    loading,
    error,
    userInfo,
    success,
    callLoginPostAPI,
    callRegisterPostAPI,
    createPostNoteAPI,
    updatePostNoteAPI,
    deleteNoteAPI,
    updateProfilePostAPI,
    fetchNotes,
    notes,
    notesId
  };
};
