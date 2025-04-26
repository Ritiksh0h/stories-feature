"use client";

import Image from "next/image";
import { motion } from 'framer-motion';

interface StoryItemProps {
  src: string;
  onClick: () => void;
  seen?: boolean;
}

export default function StoryItem({ src, onClick, seen }: StoryItemProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      onClick={onClick}
      className={`w-14 h-14 md:w-20 md:h-20 rounded-full border-2 cursor-pointer overflow-hidden ${
        seen ? "border-gray-400" : "border-blue-500"
      }`}
    >
      <Image
        src={src}
        width={80}
        height={80}
        alt="story"
        className="object-cover w-full h-full"
      />
    </motion.div>
  );
}
