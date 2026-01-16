import { useEffect, useState } from "react";
import dataModification from "./utils/dataModification";
import infoModification from "./utils/infoModification";
import configModification from "./utils/configModification";
import combineToOneObj from "./utils/combineToOneObj";

export default function App() {
  const [data, setData] = useState<any>(null);

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
      }
    };

    fetchData()
      .then(async (result) => {
        console.log(result);

        return await combineToOneObj(
          await configModification(result.config),
          await dataModification(result.data),
          await infoModification(result.info)
        ).then((obj) => {
          setData(obj);
          console.log(obj);
        });
      })
      .finally(() => {
        console.log("Fetchig finished data stored in state");
        setLoading(false);
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
