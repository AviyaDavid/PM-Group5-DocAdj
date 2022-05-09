import React from 'react';
import { useState, useEffect } from "react";
import mockdata from "../data.json";
import TableBody from "./TableBody";
import TableHead from "./TableHead";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import "../index.css";

const Table = () => {
  const [tableData, setTableData] = useState(mockdata);
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
 
  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/login");
    if(user && user.email == "donacontactmail@gmail.com") return navigate("/Adminpanel");
  }, [user, loading]);


  const columns = [
    { label: "Doctor's Name", accessor: "Doctor", sortable: true },
    { label: "Client's Name", accessor: "Client", sortable: true },
    { label: "Date", accessor: "Date", sortable: true },
    { label: "Hour", accessor: "Hour", sortable: true },
    { label: "Duration", accessor: "Duration", sortable: true },
    { label: "Type", accessor: "Type", sortable: true },
  ];

  const handleSorting = (sortField, sortOrder) => {
    if (sortField) {
      const sorted = [...tableData].sort((a, b) => {
        if (a[sortField] === null) return 1;
        if (b[sortField] === null) return -1;
        if (a[sortField] === null && b[sortField] === null) return 0;
        return (
          a[sortField].toString().localeCompare(b[sortField].toString(), "en", {
            numeric: true,
          }) * (sortOrder === "asc" ? 1 : -1)
        );
      });
      setTableData(sorted);
    }
  };

  return (
    <>
    <br></br>
      <table className="table">
        <TableHead {...{ columns, handleSorting }} />
        <TableBody {...{ columns, tableData }} />
      </table>
    </>
  );
};

export default Table;