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

        throw err;
      }
    };

    fetchData()
      .then(async (result) => {
        console.log(result);

        return combineToOneObj(
          await configModification(result.config),
          await dataModification(result.data),
          await infoModification(result.info)
        ).then((obj) => {
          setData(obj);
          console.log(obj);
          console.log("Final Combined Object (from nested .then):", obj);
          return obj;
        });
      })
      .catch((err) => {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred during processing.");
        }
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
    <div className="p-4">
      {data ? (
        <div className="flex flex-col gap-2">
          <p>Title: {data.title}</p>
          <p>ID: {data.id}</p>
          <p>Style: {data.style}</p>
          <p>Description: {data.description}</p>
          <p>Dimensions: {data.dimensions}</p>
          <p>Exhibition History: {data.exhibition_history}</p>
          <p>Place of origin: {data.place_of_origin}</p>
          <p>Technique: {data.technique}</p>
          <p>License: {data.license_text}</p>
          <p>License links: {data.license_links}</p>
          <p>Version: {data.version}</p>
          <p>Iiif url: {data.iiif_url}</p>
          <p>Website url: {data.website_url}</p>
        </div>
      ) : (
        <p>No data available.</p>
      )}
    </div>
  );
}
