import { useEffect, useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/python");
      const data = await res.json();
      setMessage(data.message);
    };

    fetchData();
  }, []);

  return <h1>{message}</h1>;
}
