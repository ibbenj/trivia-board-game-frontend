import { Flex, Box, Button } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { ScoreCard } from "./ScoreCard";
import { useScoreContext } from "../../Context/ScoreContext";

export function ScoreCards({ points }: { points: number | undefined }) {
  const { players, addPlayer, removePlayer } = useScoreContext();

  const [curPlayers, setCurPlayers] = useState(players);

  useEffect(() => {
    setCurPlayers(players);
  }, [players]);

  return (
    <Box border={"black"} color={"darkgray"}>
      <Flex direction={"row"} justifyContent={"center"}>
        {curPlayers.map((player, i) => {
          return <ScoreCard key={i} id={i} player={player} points={points} />;
        })}
        {points !== undefined ? (
          <></>
        ) : (
          <Flex direction={"column"}>
            <Button onClick={addPlayer}>+</Button>
            <Button onClick={removePlayer}>-</Button>
          </Flex>
        )}
      </Flex>
    </Box>
  );
}
