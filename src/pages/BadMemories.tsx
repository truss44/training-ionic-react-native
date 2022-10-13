import React, { useContext } from "react";
import MemoriesContent from "../components/MemoriesContent";
import MemoriesContext from "../data/memories-context";

const BadMemories: React.FC = () => {
  const memoriesCtx = useContext(MemoriesContext);
  const badMemories = memoriesCtx.memories.filter(
    (memory) => memory.type === "bad"
  );

  return (
    <MemoriesContent
      title="Bad Memories"
      fallbackText="No Bad Memories Found"
      memories={badMemories}
    />
  );
};

export default BadMemories;
