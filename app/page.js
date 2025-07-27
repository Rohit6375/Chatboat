"use client";
import React, { useState } from "react";
import { Provider } from "react-redux";
import store from "../store";
import { useDispatch } from "react-redux";
import { setQuery } from "@store/qaSlice";
import { useRouter } from "next/navigation";
import MainLogo from "@components/MainLogo";
import QueryInput from "@components/QueryInput";

function HomePageContent() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [localQuery, setLocalQuery] = useState(""); 

  const handleHomeSubmit = (queryText) => {
    console.log("handleHomeSubmit called with:", queryText);
    if (!queryText.trim()) {
      console.log("Query is empty or whitespace-only. Returning.");
      return; 
    }
    console.log("Query is valid. Dispatching and redirecting.");
    dispatch(setQuery(queryText)); 
    router.push("/chat"); 
    console.log("Redirect initiated.");
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4">
      <MainLogo />
      <div className="w-full max-w-3xl shadow-lg">
        <QueryInput
          value={localQuery} 
          onChange={(e) => setLocalQuery(e.target.value)} 
          onSubmit={() => handleHomeSubmit(localQuery)} 
          loading={false}
        />
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <Provider store={store}>
      <HomePageContent />
    </Provider>
  );
}
