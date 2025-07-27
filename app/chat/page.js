"use client";
import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setQuery,
  setLoading,
  appendAnswer,
  updateLastAnswer,
} from "@store/qaSlice";
import QueryInput from "@components/QueryInput";
import AnswerCard from "@components/AnswerCard";

export default function Page() {
  const dispatch = useDispatch();
  const { query, answers, loading } = useSelector((state) => state.qa);
  const answersEndRef = useRef(null);

  async function handleChatSubmit(e, submittedQueryParam = query) {
    if (e && e.preventDefault) {
      e.preventDefault();
    }

    const currentQuery = submittedQueryParam.trim();
    if (!currentQuery) return;

    dispatch(setLoading(true));
    dispatch(appendAnswer({ query: currentQuery, answer: "" }));

    try {
      const response = await fetch("http://192.168.29.56:8000/chatbot-api/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: currentQuery }),
      });
       
      const reader =  response.body
        .pipeThrough(new TextDecoderStream())
        .getReader();

        dispatch(setQuery(""))
      while (true) {
        const { value, done } = await reader.read();
        
        if (done) break;
        if (value) {
          dispatch(updateLastAnswer(value));
        }
      };

      dispatch(setQuery(""));
    } catch (err) {
      console.error("Fetch error:", err);
      dispatch(
        appendAnswer({
          query: currentQuery,
          answer: `Error fetching answer: ${err.message || "Unknown error"}`,
        })
      );
    } finally {
      dispatch(setLoading(false));
       
    }
  }

  useEffect(() => {
    if (answersEndRef.current) {
      answersEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [answers]);

  return (
    <div className="flex flex-col items-center w-full h-full">
      <div className="flex-1 overflow-y-auto  flex flex-col gap-6 pb-4 w-full max-w-3xl mx-auto mt-8">
        {answers.map((item, idx) => (
          <AnswerCard
            key={idx}
            query={item.query}
            answer={item.answer}
            images={item.images || []}
            sources={item.sources || []}
          />
        ))}
        <div ref={answersEndRef} />
      </div>

      <div className="w-full max-w-3xl mx-auto sticky bottom-0 z-10 py-4 bg-[#181A20]">
        <QueryInput
          value={query}
          onChange={(e) => dispatch(setQuery(e.target.value))}
          onSubmit={handleChatSubmit}
          loading={loading}
        />
      </div>
    </div>
  );
}
