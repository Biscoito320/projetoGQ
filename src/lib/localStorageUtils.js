
import React from "react";

export const saveToLocalStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
  }
};

export const loadFromLocalStorage = (key, defaultValue) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error loading ${key} from localStorage:`, error);
    return defaultValue;
  }
};

export const saveChallengesToLocalStorage = (challenges) => {
  saveToLocalStorage("challenges", challenges);
};

export const loadChallengesFromLocalStorage = (initialChallengesData) => {
  return loadFromLocalStorage("challenges", initialChallengesData);
};

export const saveRewardsToLocalStorage = (rewards) => {
  saveToLocalStorage("rewards", rewards);
};

export const loadRewardsFromLocalStorage = (initialRewardsData) => {
  return loadFromLocalStorage("rewards", initialRewardsData);
};

export const saveLessonsToLocalStorage = (lessons) => {
  saveToLocalStorage("lessons", lessons);
};

export const loadLessonsFromLocalStorage = (initialLessonsData) => {
  const storedLessons = loadFromLocalStorage("lessons", null);
  if (storedLessons) {
    return storedLessons.map(storedLesson => {
      const lessonTemplate = initialLessonsData.find(l => l.id === storedLesson.id);
      return {
        ...lessonTemplate, 
        ...storedLesson, 
      };
    });
  }
  return initialLessonsData.map(lesson => ({...lesson, isCompletedByUser: false }));
};
