import React, { createContext, useContext, useState } from "react";

// Define types for context value and context methods
type ScoreContextValue = {
  players: { name: string; score: number }[];
  changeScore: (playerNum: number, points: number, isIncrease: boolean) => void;
  updateScore: (playerNum: number, score: number) => void;
  updateName: (playerNum: number, name: string) => void;
  addPlayer: () => void;
  removePlayer: () => void;
};

// Create a context with initial empty array
const ScoreContext = createContext<ScoreContextValue>({
  players: [],
  changeScore: () => {},
  updateScore: () => {},
  updateName: () => {},
  addPlayer: () => {},
  removePlayer: () => {},
});

interface Props {
  children: React.ReactNode;
}

// Custom hook to use ScoreContext
export const useScoreContext = () => useContext(ScoreContext);

// ScoreContext provider component
export const ScoreProvider = ({ children }: Props) => {
  const [players, setPlayers] = useState<{ name: string; score: number }[]>([
    { name: "Player", score: 0 },
    { name: "Player", score: 0 },
    { name: "Player", score: 0 },
  ]);

  // Function to add a score to the array
  const changeScore = (
    playerNum: number,
    points: number,
    isIncrease: boolean
  ) => {
    const newPlayers = [...players];
    if (isIncrease) {
      newPlayers[playerNum].score += points;
    } else {
      newPlayers[playerNum].score -= points;
    }

    setPlayers(newPlayers);
  };

  const updateScore = (playerNum: number, score: number) => {
    const newPlayers = [...players];
    newPlayers[playerNum].score = score;

    setPlayers(newPlayers);
  };

  const updateName = (playerNum: number, name: string) => {
    const newPlayers = [...players];
    newPlayers[playerNum].name = name;

    setPlayers(newPlayers);
  }

  // Function to clear all scores
  const addPlayer = () => {
    setPlayers([...players, { name: "New Player", score: 0 }]);
  };

  const removePlayer = () => {
    if (players.length > 0) {
      const newPlayers = [...players];
      newPlayers.splice(-1);
      setPlayers(newPlayers);
    }
  };

  // Context value
  const value: ScoreContextValue = {
    players,
    changeScore,
    updateScore,
    updateName,
    addPlayer,
    removePlayer,
  };

  return (
    <ScoreContext.Provider value={value}>{children}</ScoreContext.Provider>
  );
};
