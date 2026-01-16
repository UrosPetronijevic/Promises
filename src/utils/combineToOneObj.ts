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

export default function combineToOneObj(
  config: Config,
  data: Data,
  info: Info
) {}
