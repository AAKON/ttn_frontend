"use client";

import { useEffect, useState } from "react";

const TextAnimator = ({
  animationWordArray = ["Apparel", "Textile", "Clothing", "Fabric"],
  className,
  cursorColor,
}) => {
  // const animationWordArray = ["Apparel", "Textile", "Clothing", "Fabric"];
  const [currentWord, setCurrentWord] = useState("");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const typingSpeed = 150; // Speed for typing (ms per character)
  const deletingSpeed = 100; // Speed for deleting
  const pause = 1000; // Pause between animationWordArray (in ms)

  useEffect(() => {
    let typingTimeout;

    if (isDeleting) {
      // Handle deleting
      typingTimeout = setTimeout(() => {
        setCurrentWord((prev) => prev.slice(0, -1));
        if (currentWord === "") {
          setIsDeleting(false);
          setIndex((prev) => (prev + 1) % animationWordArray.length);
        }
      }, deletingSpeed);
    } else {
      // Handle typing
      typingTimeout = setTimeout(() => {
        setCurrentWord(
          animationWordArray[index].slice(0, currentWord.length + 1)
        );
        if (currentWord === animationWordArray[index]) {
          setTimeout(() => setIsDeleting(true), pause);
        }
      }, typingSpeed);
    }

    return () => clearTimeout(typingTimeout);
  }, [currentWord, isDeleting, index, animationWordArray]);

  return (
    <span className={`relative ${className}`}>
      {currentWord + " "}
      <span
        className={`absolute -right-2 w-10 transition-all ${cursorColor} animate-blink`}
      >
        &nbsp;|
      </span>
    </span>
  );
};

export default TextAnimator;
