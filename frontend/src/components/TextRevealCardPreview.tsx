"use client";
import {
  TextRevealCard,
  TextRevealCardDescription,
  TextRevealCardTitle,
} from "./ui/text-reveal-card";

export function TextRevealCardPreview() {
  return (
    <div className="flex items-center justify-center h-[20rem] rounded-2xl w-full">
      <TextRevealCard
        text="Life is a continuous quiz, "
        revealText="learning is the answer. "
      >
        <TextRevealCardTitle>
          Sometimes, you just need to see it.
        </TextRevealCardTitle>
        <TextRevealCardDescription>
          Hover over the card to reveal the hidden text.
        </TextRevealCardDescription>
      </TextRevealCard>
    </div>
  );
}
