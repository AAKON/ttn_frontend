"use client";

import { useEffect, useState } from "react";

const TextAnimator = ({ className, cursorColor}) => {
  const words = ["Apparel", "Textile", "Clothing", "Fabric"];
  const [currentWord, setCurrentWord] = useState("");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const typingSpeed = 150; // Speed for typing (ms per character)
  const deletingSpeed = 100; // Speed for deleting
  const pause = 1000; // Pause between words (in ms)

  useEffect(() => {
    let typingTimeout;

    if (isDeleting) {
      // Handle deleting
      typingTimeout = setTimeout(() => {
        setCurrentWord((prev) => prev.slice(0, -1));
        if (currentWord === "") {
          setIsDeleting(false);
          setIndex((prev) => (prev + 1) % words.length);
        }
      }, deletingSpeed);
    } else {
      // Handle typing
      typingTimeout = setTimeout(() => {
        setCurrentWord(words[index].slice(0, currentWord.length + 1));
        if (currentWord === words[index]) {
          setTimeout(() => setIsDeleting(true), pause);
        }
      }, typingSpeed);
    }

    return () => clearTimeout(typingTimeout);
  }, [currentWord, isDeleting, index, words]);

  return (
    <span className={`relative ${className}`}>
      {currentWord}
      <span className={`absolute -right-3 transition-all ${cursorColor} animate-blink`}>
        |
      </span>
    </span>
  );
};

export default TextAnimator;
