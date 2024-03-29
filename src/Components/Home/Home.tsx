import { Button, Box, Heading } from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";
import { useState, useEffect } from "react";

export function Home(/*{ points, isDaily, question, category }*/) {
  const createGame = async () => {
    // Create a new game
    const res = await fetch("http://localhost:8080/game/create", {
      method: "POST",
      body: JSON.stringify({
        gameID: uuidv4(),
      }),
    });

    if (!res.ok) {
      const resJOSN = await res.json();
      throw resJOSN.message;
    }

    const resJOSN = await res.json();
    window.location.href = `/play/${resJOSN.gameID}`;
  };

  const [gameList, setGameList] = useState<any[] | null>(null);

  const getPastGames = async () => {
    const res = await fetch("http://localhost:8080/game/all", {
      method: "GET",
    });

    if (!res.ok) {
      const resJOSN = await res.json();
      throw resJOSN.message;
    }

    const resJSON = await res.json();
    const gameList = resJSON.gameList;
    setGameList(gameList);
    console.log("game list", gameList);
  };

  useEffect(() => {
    if (!gameList) {
      getPastGames();
    }
  }, [gameList]);

  return (
    // Do three tabs, single, double and final jeopardy
    <Box>
      <Heading>This is not Jeopardy</Heading>

      <Button onClick={createGame}>Create a New Game</Button>
      <Heading size="md">Past Games:</Heading>
      {gameList ? (
        <ul>
          {gameList.map((gameInfo) => {
            return (
              <li
                onClick={() => {
                  window.location.href = `/play/${gameInfo.id}`;
                }}
              >
                {gameInfo.id}
              </li>
            );
          })}
        </ul>
      ) : (
        <>Loading</>
      )}
    </Box>
  );
}
