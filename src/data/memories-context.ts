import React from "react";

export type MemoryType = "good" | "bad";

export interface Memory {
  id: string;
  imagePath: string;
  title: string;
  type: MemoryType;
  base64Url: string;
}

export interface Photo {
  path: string | undefined;
  preview: string;
}

const MemoriesContext = React.createContext<{
  memories: Memory[];
  addMemory: (
    photo: Photo,
    title: string,
    type: MemoryType
  ) => void;
  initContext: () => void;
}>({
  memories: [],
  addMemory: () => {},
  initContext: () => {},
});

export default MemoriesContext;
