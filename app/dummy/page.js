"use client"
import AnswerCard from "@components/AnswerCard";

import React from 'react'

const page = () => {
  return (
    <div><AnswerCard
  query="Who is Ajay Devgn?"
  answer={`Ajay Devgn has won several awards including four National Film Awards and four Filmfare Awards.
    

![Ajay Devgn](https://example.com/ajay.jpg)



[Wikipedia](https://en.wikipedia.org/wiki/Ajay_Devgn)
[TOI Article](https://timesofindia.indiatimes.com/ajay-devgn-news)

### Personal Life:
* Born in New Delhi
* Married to Kajol
`}
/></div>
  )
}

export default page