import {
  Flex,
  Box,
} from "@chakra-ui/react";
import React from "react";
import { ScoreCard } from "./ScoreCard";

export function ScoreCards() {
  return (
    <Box>
      <Flex direction={"row"} justifyContent={"center"}>
        <ScoreCard />
        <ScoreCard />
        <ScoreCard />
      </Flex>
    </Box>
  );
}
