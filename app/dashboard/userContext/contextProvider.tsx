"use client";
import React, { useContext, useEffect, useState } from "react";
import userContext from "./context";

export default function ContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [data, setData] = useState([]);
  const [dataisfullfetched, setDataisfullfetched] = useState(false);
  const [userid, setUserid] = useState(null);
  useEffect(() => {
    async function getData() {
      let res = await fetch("http://localhost:3000/api/me");
      let data = await res.json();
      if (data) {
        setDataisfullfetched(true);
        setUserid(data?.user?.userId);
        console.log("data : ", data?.user?.userId);
        // (data.user);
      }
    }
    getData();
  }, []);
  useEffect(() => {
    async function fetchdata() {
      let res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/users/${userid}`,
        {
          credentials: "include",
        },
      );
      let data = await res.json();
      setData(data);
    }
    fetchdata();
  }, [dataisfullfetched, userid !== null]);

  return <userContext.Provider value={data}>{children}</userContext.Provider>;
}
