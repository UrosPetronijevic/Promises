import type { Config } from "./configModification";
import type { Info } from "./infoModification";

type Data = {
  id: number;
  title: string;
  style: string;
  artist: string;
  description: string;
  dimensions: string;
  exhibition_history: string;
  place_of_origin: string;
  technique: string;
};

type CombinedObject = Config & Data & Info;

export default async function combineToOneObj(
  config: any,
  data: any,
  info: any
): Promise<CombinedObject> {
  return Promise.resolve({ ...config, ...data, ...info });
}
