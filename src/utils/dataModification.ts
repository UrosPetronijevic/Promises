export default function dataModification(data: any) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: data.id,
        title: data.title,
        style: data.style_title,
        artist: data.artist_title,
        description: data.short_description,
        dimensions: data.dimensions,
        exhibition_history: data.exhibition_history,
        place_of_origin: data.place_of_origin,
        technique: data.technique_titles,
      });
    }, 500);
  });
}
