import { useEffect, useState } from "react";

export default function App() {
  const [data, setData] = useState<any>(null);
  const [info, setInfo] = useState<any>(null);
  const [config, setConfig] = useState<any>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.artic.edu/api/v1/artworks/129884"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        return result;
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData()
      .then((result) => {
        console.log(result);

        // setData(result.data);
        // setInfo(result.info);
        // setConfig(result.config);

        return;
      })
      .finally(() => {
        console.log("Fetchig finished data stored in state");
      });
  }, []);

  if (loading) {
    return <div className="text-cyan-300">Loading data...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="text-cyan-300">
      <h1>Art works</h1>
      {data ? (
        <div>
          <p>Title: {data.title}</p>
          <p>ID: {data.id}</p>
        </div>
      ) : (
        <p>No data available.</p>
      )}
    </div>
  );
}
