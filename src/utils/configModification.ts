export type Config = {
  iiif_url: any;
  website_url: any;
};

export default function configModification(config: Config) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        iiif_url: config.iiif_url,
        website_url: config.website_url,
      });
    }, 500);
  });
}
