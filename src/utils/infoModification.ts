export type Info = {
  license_text: any;
  license_links: any;
  version: any;
};

export default async function infoModification(info: Info) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        license_text: info.license_text,
        license_links: info.license_links,
        version: info.version,
      });
    }, 500);
  });
}
