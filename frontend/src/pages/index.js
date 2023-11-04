import { useEffect, useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/python");
        const data = await res.json();
        setMessage(data.message);
      } catch {
        setMessage("API Endpoint 500")
      }
      
    };

    fetchData();
  }, []);

  return <h1>{message}</h1>;
}
