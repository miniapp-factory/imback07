"use client";

import { useState } from "react";
import Result from "./result";

type Animal = "cat" | "dog" | "fox" | "hamster" | "horse";

interface Question {
  text: string;
  options: { text: string; animal: Animal }[];
}

const questions: Question[] = [
  {
    text: "What’s your favorite type of snack?",
    options: [
      { text: "Fish", animal: "cat" },
      { text: "Bones", animal: "dog" },
      { text: "Berries", animal: "fox" },
      { text: "Seeds", animal: "hamster" },
      { text: "Meat", animal: "horse" },
    ],
  },
  {
    text: "How do you prefer to spend a weekend?",
    options: [
      { text: "Sleeping", animal: "cat" },
      { text: "Playing fetch", animal: "dog" },
      { text: "Exploring forests", animal: "fox" },
      { text: "Storing food", animal: "hamster" },
      { text: "Running in fields", animal: "horse" },
    ],
  },
  {
    text: "What’s your ideal travel style?",
    options: [
      { text: "Quiet and cozy", animal: "cat" },
      { text: "Adventure with friends", animal: "dog" },
      { text: "Solo and mysterious", animal: "fox" },
      { text: "Close to home", animal: "hamster" },
      { text: "Open and wide", animal: "horse" },
    ],
  },
  {
    text: "Which color do you like most?",
    options: [
      { text: "Black", animal: "cat" },
      { text: "Brown", animal: "dog" },
      { text: "Red", animal: "fox" },
      { text: "Yellow", animal: "hamster" },
      { text: "White", animal: "horse" },
    ],
  },
  {
    text: "What’s your favorite activity?",
    options: [
      { text: "Purring", animal: "cat" },
      { text: "Barking", animal: "dog" },
      { text: "Hunting", animal: "fox" },
      { text: "Chewing", animal: "hamster" },
      { text: "Galloping", animal: "horse" },
    ],
  },
];

function shuffleArray<T>(array: T[]): T[] {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function Quiz() {
  const [current, setCurrent] = useState(0);
  const [scores, setScores] = useState<Record<Animal, number>>({
    cat: 0,
    dog: 0,
    fox: 0,
    hamster: 0,
    horse: 0,
  });
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (animal: Animal) => {
    setScores((prev) => ({ ...prev, [animal]: prev[animal] + 1 }));
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      setShowResult(true);
    }
  };

  const retake = () => {
    setCurrent(0);
    setScores({
      cat: 0,
      dog: 0,
      fox: 0,
      hamster: 0,
      horse: 0,
    });
    setShowResult(false);
  };

  if (showResult) {
    const maxScore = Math.max(...Object.values(scores));
    const bestAnimals = Object.entries(scores)
      .filter(([, s]) => s === maxScore)
      .map(([a]) => a as Animal);
    const resultAnimal = bestAnimals[0]; // pick first in tie
    return <Result animal={resultAnimal} retake={retake} />;
  }

  const shuffledOptions = shuffleArray(questions[current].options);

  return (
    <div className="w-full max-w-md">
      <h2 className="text-xl font-semibold mb-4">{questions[current].text}</h2>
      <div className="flex flex-col gap-2">
        {shuffledOptions.map((opt, idx) => (
          <button
            key={idx}
            className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
            onClick={() => handleAnswer(opt.animal)}
          >
            {opt.text}
          </button>
        ))}
      </div>
    </div>
  );
}
