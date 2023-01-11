import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";

const SingleEvent = ({ data }) => {
  const [emailValue, setEmailValue] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();
  // const emailValidationRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  const onSubmit = async (e) => {
    e.preventDefault();
    const eventId = router?.query.id;

    // if (!emailValue.match(emailValidationRegex)) {
    //   setMessage("Your email has no valid input")
    // } else {
    setMessage("");
    try {
      const response = await fetch('/api/email-registration', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({email: emailValue, eventId})
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }
      const data = await response.json();
      setMessage(data.message);
      setEmailValue("");
    } catch (error) {
      console.log(error, "ERROR");
    }
   // }
  };

  return(
    <div className="event_single_page">
      <h1>Single Page Event {data.city}</h1>
      <h2>{data.title}</h2>
      <Image width={300} height="200" src={data.image} alt={data.description}/>
      <p>{data.description}</p>
      <form onSubmit={onSubmit} className="email_registration">
        <label htmlFor="email">Get registered for this event</label>
        <input
        //  type="email"
          id="email"
          placeholder="Please enter your email"
          value={emailValue}
          onChange={(e) => setEmailValue(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <p>{message}</p>
    </div>
  )
}

export default SingleEvent;

export async function getStaticPaths() {
  const { allEvents } = await import("../../../data/data.json")
  const allPaths = allEvents.map((event) => {
    return {
      params: {
        cat: event.city.toString(),
        id: event.id.toString(),
      }
    }
  })
  return {
    paths: allPaths,
    fallback: false
  };
}

export async function getStaticProps(context: { params: { id: string } }) {
  const { allEvents } = await import("../../../data/data.json");
  const id = context?.params.id;
  const data = allEvents.find((event) => event.id === id);

  return {
    props: {
      data
    }
  }
}