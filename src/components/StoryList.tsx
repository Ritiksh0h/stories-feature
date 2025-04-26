"use client";

import { useEffect, useState, useRef } from "react";
import StoryItem from "./StoryItem";
import { AnimatePresence, motion } from "framer-motion";
import NextImage from "next/image";

interface Story {
  id: string;
  src: string;
  createdAt: number;
  seen?: boolean;
}

export default function StoryList() {
  const [stories, setStories] = useState<Story[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [progress, setProgress] = useState<number[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("stories");
    if (stored) {
      const parsed: Story[] = JSON.parse(stored);
      const validStories = parsed.filter(
        (story) => Date.now() - story.createdAt < 24 * 60 * 60 * 1000
      );
      setStories(validStories);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("stories", JSON.stringify(stories));
  }, [stories]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const base64 = await resizeImage(file); // <--- use resized version

    const newStory: Story = {
      id: Date.now().toString(),
      src: base64,
      createdAt: Date.now(),
    };

    setStories((prev) => [...prev, newStory]);
  };

  const openViewer = (index: number) => {
    setCurrentIndex(index);
    setProgress(new Array(stories.length).fill(0));

    setStories((prev) => {
      const updated = [...prev];
      updated[index].seen = true;
      return updated;
    });
  };

  const closeViewer = () => {
    setCurrentIndex(null);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const nextStory = () => {
    if (currentIndex !== null) {
      if (currentIndex < stories.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        closeViewer();
      }
    }
  };

  const deleteStory = (id: string) => {
    setStories((prev) => {
      const updated = prev.filter((story) => story.id !== id);
      localStorage.setItem("stories", JSON.stringify(updated));
      return updated;
    });
  };

  const prevStory = () => {
    if (currentIndex !== null && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const pauseProgress = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const resumeProgress = () => {
    if (currentIndex === null) return;
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        const updated = [...prev];
        updated[currentIndex] += 100 / (3 * 20); // same speed
        if (updated[currentIndex] >= 100) {
          updated[currentIndex] = 100;
          nextStory();
        }
        return updated;
      });
    }, 50);
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setStories((prev) => {
        const valid = prev.filter(
          (story) => Date.now() - story.createdAt < 24 * 60 * 60 * 1000
        );
        localStorage.setItem("stories", JSON.stringify(valid));
        return valid;
      });
    }, 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (currentIndex === null) return;

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        const updated = [...prev];
        updated[currentIndex] += 100 / (3 * 20); // 3 seconds -> 20 updates per second
        if (updated[currentIndex] >= 100) {
          updated[currentIndex] = 100;
          nextStory();
        }
        return updated;
      });
    }, 50); // update every 50ms
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [currentIndex]);

  const resizeImage = (
    file: File,
    maxWidth = 1080,
    maxHeight = 1920
  ): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          let width = img.width;
          let height = img.height;

          if (width > maxWidth) {
            height = (maxWidth / width) * height;
            width = maxWidth;
          }

          if (height > maxHeight) {
            width = (maxHeight / height) * width;
            height = maxHeight;
          }

          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL("image/jpeg", 0.7));
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <>
      <div className="flex items-center space-x-4 p-4 overflow-x-scroll">
        <label className="w-14 h-14 md:w-20 md:h-20 rounded-full flex items-center justify-center border-2 border-dashed border-gray-400 cursor-pointer">
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="hidden"
          />
          <span className="text-3xl text-gray-400">+</span>
        </label>
        {stories.map((story, idx) => (
          <div key={story.id} className="relative">
            <StoryItem
              key={story.id}
              src={story.src}
              onClick={() => openViewer(idx)}
              seen={story.seen}
            />

            <button
              onClick={(e) => {
                e.stopPropagation(); // prevent opening viewer
                deleteStory(story.id);
              }}
              className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
            >
              ✖
            </button>
          </div>
        ))}
      </div>

      {/* Modal Viewer */}
      <AnimatePresence>
        {currentIndex !== null && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeViewer}
          >
            <motion.div
              className="relative w-fit h-full bg-black rounded-md overflow-hidden"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ type: "spring", stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Progress Bars */}
              <div className="top-2 left-2 right-2 flex space-x-1">
                {stories.map((_, idx) => (
                  <div key={idx} className="bg-gray-700 h-1 flex-1 rounded">
                    <div
                      className="bg-white h-full rounded"
                      style={{
                        width: `${progress[idx] || 0}%`,
                        transition: "width 0.05s linear",
                      }}
                    />
                  </div>
                ))}
              </div>
              <motion.div
                className="w-full h-full flex items-center justify-center relative"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={(e, info) => {
                  if (info.offset.x < -100) {
                    nextStory();
                  } else if (info.offset.x > 100) {
                    prevStory();
                  }
                }}
                onMouseDown={pauseProgress}
                onMouseUp={resumeProgress}
                onTouchStart={pauseProgress}
                onTouchEnd={resumeProgress}
              >
                <NextImage
                  key={stories[currentIndex].id}
                  width={320}
                  height={480}
                  src={stories[currentIndex].src}
                  alt="Story"
                  className="w-full h-full object-fit"
                />
              </motion.div>

              {/* Arrows */}
              <button
                onClick={prevStory}
                className="absolute left-0 top-1/2 -translate-y-1/2 p-4 text-white text-3xl"
              >
                &#8592;
              </button>
              <button
                onClick={nextStory}
                className="absolute right-0 top-1/2 -translate-y-1/2 p-4 text-white text-3xl"
              >
                &#8594;
              </button>

              {/* Close */}
              <button
                onClick={closeViewer}
                className="absolute top-2 right-2 text-white text-2xl"
              >
                ✖
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
