"use client";

import { Share } from "@/components/share";
import { url } from "@/lib/metadata";

interface ResultProps {
  animal: "cat" | "dog" | "fox" | "hamster" | "horse";
  retake: () => void;
}

export default function Result({ animal, retake }: ResultProps) {
  const animalImages: Record<string, string> = {
    cat: "/cat.png",
    dog: "/dog.png",
    fox: "/fox.png",
    hamster: "/hamster.png",
    horse: "/horse.png",
  };

  const animalNames: Record<string, string> = {
    cat: "Cat",
    dog: "Dog",
    fox: "Fox",
    hamster: "Hamster",
    horse: "Horse",
  };

  const shareText = `I just discovered I'm most like a ${animalNames[animal]}! Check it out: ${url}`;

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-2xl font-semibold">
        You are most like a {animalNames[animal]}!
      </h2>
      <img
        src={animalImages[animal]}
        alt={animalNames[animal]}
        width={256}
        height={256}
        className="rounded"
      />
      <Share text={shareText} />
      <button
        className="px-4 py-2 bg-secondary text-secondary-foreground rounded hover:bg-secondary/90"
        onClick={retake}
      >
        Retake Quiz
      </button>
    </div>
  );
}
