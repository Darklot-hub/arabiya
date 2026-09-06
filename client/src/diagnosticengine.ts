import type { DiagnosticQuestion, Level } from "./types";

export function evaluateAnswer(question: DiagnosticQuestion, answer: string) {
  const normalized = answer.trim().toLowerCase();
  if (!normalized) return { correct: false, points: 0 };
  if (question.options?.length)
    return {
      correct: question.answer?.toLowerCase() === normalized,
      points: question.answer?.toLowerCase() === normalized ? (question.points ?? 1) : 0,
    };
  const words = normalized.split(/\s+/).filter(Boolean);
  const keywordMatch = (question.acceptedKeywords ?? []).some((keyword: string) =>
    normalized.includes(keyword.toLowerCase()),
  );
  const enoughWords = words.length >= (question.minWords ?? 1);
  return {
    correct: keywordMatch && enoughWords,
    points: keywordMatch && enoughWords ? (question.points ?? 1) : 0,
  };
}

export function estimateLevel(total: number): Level {
  if (total >= 90) return "C1";
  if (total >= 75) return "B2";
  if (total >= 60) return "B1";
  if (total >= 40) return "A2";
  return "A1";
}
