import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setQuery, setLoading, appendAnswer } from "@store/qaSlice";
import MainLogo from "@components/MainLogo";
import QueryInput from "@components/QueryInput";
import AnswerCard from "@components/AnswerCard";

export default function QuerySection() {
  const dispatch = useDispatch();
  const { query, answers, loading } = useSelector((state) => state.qa);
  const answersEndRef = useRef(null);

  const handleInputChange = (e) => {
    dispatch(setQuery(e.target.value));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!query.trim()) return;

  dispatch(setLoading(true));

  try {
    const res = await fetch("/api/completion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });

    if (!res.body) throw new Error("No response body");

    const reader = res.body
      .pipeThrough(new TextDecoderStream())
      .getReader();

    let fullAnswer = "";

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      fullAnswer += value;
      dispatch(
        appendAnswer({ query, answer: fullAnswer }) // OR more efficient: buffer separately if needed
      );
    }

    dispatch(setQuery("")); // Clear input
  } catch (err) {
    console.error("Streaming fetch error:", err);
    dispatch(
      appendAnswer({
        query,
        answer: `Error fetching answer: ${err.message || "Unknown error"}`,
      })
    );
  } finally {
    dispatch(setLoading(false));
  }
};


  useEffect(() => {
    if (answersEndRef.current) {
      answersEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [answers]);

  return (
    <div className="flex flex-col items-center w-full ">
      <MainLogo />

      
      <div className="flex-1 overflow-y-auto flex flex-col gap-6 pb-4 w-full max-w-3xl mx-auto mt-8">
      
        {answers.map((item, idx) => (
          <AnswerCard key={idx} query={item.query} answer={item.answer} />
        ))}
        <div ref={answersEndRef} />
      </div>
     
      <div className="w-full max-w-3xl mx-auto sticky bottom-0 z-10 py-4 bg-[#181A20]">
        <QueryInput
          value={query}
          onChange={handleInputChange}
          onSubmit={handleSubmit}
          loading={loading}
        />
      </div>
    </div>
  );
}
