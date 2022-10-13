import React, { useContext } from "react";
import MemoriesContent from "../components/MemoriesContent";
import MemoriesContext from "../data/memories-context";

const GoodMemories: React.FC = () => {
  const memoriesCtx = useContext(MemoriesContext);
  const badMemories = memoriesCtx.memories.filter(
    (memory) => memory.type === "good"
  );

  return (
    <MemoriesContent
      title="Good Memories"
      fallbackText="No Good Memories Found"
      memories={badMemories}
    />
  );
};

export default GoodMemories;
