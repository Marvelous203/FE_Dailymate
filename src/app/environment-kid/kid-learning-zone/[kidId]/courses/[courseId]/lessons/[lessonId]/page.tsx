"use client";

import { useState, use, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  CheckCircle,
  Play,
  BookOpen,
  Trophy,
  Star,
  Clock,
  Users,
  Target,
} from "lucide-react";
import Link from "next/link";
import { InteractiveVideo } from "@/components/interactive-video/InteractiveVideo";
import {
  getLessonById,
  getTestsByLesson,
  getLessonsByCourse,
  getCourseProgress,
  updateCourseProgress,
  submitTestResult,
  updateLessonCompletion,
  enrollInCourse,
  getAllCourseProgressByKidId,
} from "@/lib/api";

interface LessonData {
  _id: string;
  courseId: {
    _id: string;
    title: string;
    category: string;
    ageGroup: string;
  };
  title: string;
  description: string;
  content: {
    sections: {
      title: string;
      text: string;
    }[];
  };
  videoUrl: string;
  audioUrl: string;
  imageUrl: string;
  duration: number;
  order: number;
  isPublished: boolean;
}

interface TestData {
  _id: string;
  lessonId: {
    _id: string;
    courseId: string;
    title: string;
  };
  title: string;
  description: string;
  timeLimit: number;
  passingScore: number;
  attempts: number;
  questions: Question[];
  totalPoints: number;
  createdBy: {
    _id: string;
    fullName: string;
    specializations: string[];
  };
  createdAt: string;
  updatedAt: string;
}

interface Question {
  _id: string;
  questionText: string;
  questionType: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  points: number;
}

// Import kid progress utilities
import {
  kidLocalStorage,
  type LessonProgress,
  getStorageKeys,
} from "@/utils/kidProgress";

// Helper function to get the progress key (for compatibility with existing code)
const getProgressKey = (kidId: string, lessonId: string) => {
  return getStorageKeys(kidId).lessonProgress(lessonId);
};

// Helper functions for progress storage using the new utilities
const getStoredProgress = (
  kidId: string,
  lessonId: string
): LessonProgress | null => {
  if (typeof window === "undefined") return null;
  return kidLocalStorage.getLessonProgress(kidId, lessonId);
};

const saveProgress = async (
  kidId: string,
  lessonId: string,
  progress: {
    videoCompleted: boolean;
    interactiveCompleted: boolean;
    lessonCompleted: boolean;
    currentProgress: number;
    completedTests: string[];
  },
  courseId?: string
) => {
  if (typeof window === "undefined") return;
  try {
    // Save to localStorage using the new utility function
    kidLocalStorage.setLessonProgress(kidId, lessonId, progress);

    console.log(
      "💾 Progress saved to localStorage for kid:",
      kidId,
      "lesson:",
      lessonId
    );

    // Sync with backend API if courseId is provided
    if (courseId) {
      try {
        // Update lesson completion if lesson is completed
        if (progress.lessonCompleted) {
          await updateLessonCompletion(kidId, courseId, lessonId);
        }

        // You can also update other progress data using updateCourseProgress
        // with the correct structure when needed
        console.log("✅ Progress synced with backend");
      } catch (apiError) {
        console.warn("⚠️ Failed to sync progress with backend:", apiError);
        // Continue with local storage only
      }
    }
  } catch (error) {
    console.error("❌ Error saving progress:", error);
  }
};

export default function LessonPage({
  params,
}: {
  params: Promise<{ kidId: string; courseId: string; lessonId: string }>;
}) {
  const resolvedParams = use(params);
  const [lessonCompleted, setLessonCompleted] = useState(false);
  const [videoCompleted, setVideoCompleted] = useState(false);
  const [interactiveCompleted, setInteractiveCompleted] = useState(false);
  const [lessonData, setLessonData] = useState<LessonData | null>(null);
  const [testsData, setTestsData] = useState<TestData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [completedTests, setCompletedTests] = useState<string[]>([]);
  const [courseLessons, setCourseLessons] = useState<any[]>([]);
  const [nextLessonId, setNextLessonId] = useState<string | null>(null);
  const [prevLessonId, setPrevLessonId] = useState<string | null>(null);
  const [courseProgressData, setCourseProgressData] = useState<any>(null);
  const [allProgressData, setAllProgressData] = useState<any>(null);
  const [apiStatus, setApiStatus] = useState<{
    courseProgress: "loading" | "success" | "error";
    allProgress: "loading" | "success" | "error";
  }>({
    courseProgress: "loading",
    allProgress: "loading",
  });

  // Load course progress from API and localStorage
  useEffect(() => {
    const loadCourseProgress = async () => {
      // Test both APIs
      try {
        // 1. Get specific course progress
        console.log("📡 Testing Course Progress API...");
        console.log(
          "Course Progress API URL:",
          `${
            process.env.NEXT_PUBLIC_API_URL || "http://localhost:8386"
          }/api/progress/${resolvedParams.courseId}`
        );

        setApiStatus((prev) => ({ ...prev, courseProgress: "loading" }));
        const courseProgress = await getCourseProgress(
          resolvedParams.kidId,
          resolvedParams.courseId
        );
        console.log("✅ Course Progress API Response:", courseProgress);
        setCourseProgressData(courseProgress.data);
        setApiStatus((prev) => ({ ...prev, courseProgress: "success" }));
      } catch (error) {
        console.error("❌ Course Progress API Error:", error);
        setApiStatus((prev) => ({ ...prev, courseProgress: "error" }));
      }

      try {
        // 2. Get all progress by kid ID
        console.log("📡 Testing All Progress API...");
        console.log(
          "All Progress API URL:",
          `${
            process.env.NEXT_PUBLIC_API_URL || "http://localhost:8386"
          }/api/progress/kid/${resolvedParams.kidId}`
        );

        setApiStatus((prev) => ({ ...prev, allProgress: "loading" }));
        const allProgress = await getAllCourseProgressByKidId(
          resolvedParams.kidId
        );
        console.log("✅ All Progress API Response:", allProgress);
        setAllProgressData(allProgress.data);
        setApiStatus((prev) => ({ ...prev, allProgress: "success" }));
      } catch (error) {
        console.error("❌ All Progress API Error:", error);
        setApiStatus((prev) => ({ ...prev, allProgress: "error" }));
      }

      // Load local progress (fallback or sync check)
      const savedProgress = getStoredProgress(
        resolvedParams.kidId,
        resolvedParams.lessonId
      );
      console.log("🔄 Loading saved progress:", savedProgress);
      console.log(
        "🗝️ Loading progress for kid:",
        resolvedParams.kidId,
        "lesson:",
        resolvedParams.lessonId
      );

      if (savedProgress) {
        setVideoCompleted(savedProgress.videoCompleted || false);
        setInteractiveCompleted(savedProgress.interactiveCompleted || false);
        setLessonCompleted(savedProgress.lessonCompleted || false);
        setCurrentProgress(savedProgress.currentProgress || 0);
        setCompletedTests(savedProgress.completedTests || []);

        console.log("✅ Progress loaded successfully:", {
          videoCompleted: savedProgress.videoCompleted,
          interactiveCompleted: savedProgress.interactiveCompleted,
          currentProgress: savedProgress.currentProgress,
          completedTests: savedProgress.completedTests?.length || 0,
        });
      } else {
        console.log("❌ No saved progress found - starting fresh");
      }
    };

    loadCourseProgress();
  }, [resolvedParams.kidId, resolvedParams.lessonId, resolvedParams.courseId]);

  useEffect(() => {
    const fetchLessonData = async () => {
      try {
        setLoading(true);

        // Fetch lesson data
        const lessonResult = await getLessonById(resolvedParams.lessonId);

        if (lessonResult.success && lessonResult.data) {
          setLessonData(lessonResult.data);
        } else {
          setError("Không thể tải dữ liệu bài học");
          return;
        }

        // Fetch tests for this lesson
        try {
          const testsResult = await getTestsByLesson(resolvedParams.lessonId);
          if (testsResult.success && testsResult.data) {
            const tests = Array.isArray(testsResult.data.tests)
              ? testsResult.data.tests
              : Array.isArray(testsResult.data)
              ? testsResult.data
              : [];
            setTestsData(tests);
          }
        } catch (testError) {
          console.warn(
            "Không tìm thấy bài kiểm tra cho bài học này:",
            testError
          );
          setTestsData([]);
        }

        // Fetch course lessons for navigation
        try {
          const lessonsResult = await getLessonsByCourse(
            resolvedParams.courseId
          );
          const lessons = Array.isArray(lessonsResult)
            ? lessonsResult
            : lessonsResult?.lessons || lessonsResult?.data?.lessons || [];

          setCourseLessons(lessons);

          // Find current lesson index and set next/prev
          const sortedLessons = lessons.sort(
            (a: any, b: any) => (a.order || 0) - (b.order || 0)
          );
          const currentIndex = sortedLessons.findIndex(
            (lesson: any) => lesson._id === resolvedParams.lessonId
          );

          if (currentIndex !== -1) {
            // Set next lesson
            if (currentIndex < sortedLessons.length - 1) {
              setNextLessonId(sortedLessons[currentIndex + 1]._id);
            }

            // Set previous lesson
            if (currentIndex > 0) {
              setPrevLessonId(sortedLessons[currentIndex - 1]._id);
            }
          }

          console.log("📚 Course lessons loaded:", {
            totalLessons: lessons.length,
            currentIndex,
            nextLessonId:
              currentIndex < sortedLessons.length - 1
                ? sortedLessons[currentIndex + 1]._id
                : null,
            prevLessonId:
              currentIndex > 0 ? sortedLessons[currentIndex - 1]._id : null,
          });
        } catch (lessonError) {
          console.warn("Không thể tải danh sách bài học:", lessonError);
        }
      } catch (err) {
        console.error("Lỗi khi tải bài học:", err);
        setError("Lỗi khi tải bài học");
      } finally {
        setLoading(false);
      }
    };

    fetchLessonData();
  }, [resolvedParams.lessonId]);

  // This useEffect is removed - progress calculation is now handled in the separate useEffect below

  // State for video duration and dynamic interactions
  const [videoDuration, setVideoDuration] = useState<number>(0);
  const [videoInteractions, setVideoInteractions] = useState<any[]>([]);

  // Generate interaction based on video duration (at 80% of video length)
  const generateInteraction = (duration: number) => {
    if (duration <= 0) return [];

    const interactionTimestamp = Math.floor(duration * 0.8); // 80% of video duration

    // Create context-aware question based on lesson title and category
    const lessonTitle = lessonData?.title || "bài học";
    const category = lessonData?.courseId?.category || "học tập";

    return [
      {
        timestamp: interactionTimestamp,
        type: "question" as const,
        content: {
          question: `Sau khi xem "${lessonTitle}", bạn cảm thấy thế nào về nội dung ${category} này?`,
          options: [
            "Rất thú vị và dễ hiểu!",
            "Hay nhưng cần xem lại một vài phần",
            "Khó hiểu, cần giải thích thêm",
            "Chưa phù hợp với tôi",
          ],
          correctAnswer: 0, // Any answer is considered "correct" for engagement
          feedback:
            "Cảm ơn bạn đã chia sẻ! Mọi phản hồi đều giúp chúng tôi cải thiện nội dung học tập tốt hơn.",
        },
      },
    ];
  };

  // Update interactions when video duration changes or lesson data loads
  useEffect(() => {
    if (videoDuration > 0 && lessonData) {
      const newInteractions = generateInteraction(videoDuration);
      setVideoInteractions(newInteractions);
      console.log("🎯 Generated interaction for video:", {
        duration: videoDuration,
        interactionAt: Math.floor(videoDuration * 0.8),
        totalInteractions: newInteractions.length,
        lessonTitle: lessonData.title,
        category: lessonData.courseId?.category,
      });
    }
  }, [videoDuration, lessonData]);

  const handleVideoComplete = (score: number) => {
    console.log(`📹 Video completed with score: ${score}%`);

    // Load current saved progress to preserve existing states
    const currentSavedProgress = getStoredProgress(
      resolvedParams.kidId,
      resolvedParams.lessonId
    );

    // Update video completion
    setVideoCompleted(true);

    // Preserve existing test completions
    const preservedCompletedTests =
      currentSavedProgress?.completedTests || completedTests;
    setCompletedTests(preservedCompletedTests);

    // Calculate progress with all preserved states
    const testProgress =
      testsData.length > 0
        ? (preservedCompletedTests.length / testsData.length) * 20
        : 0;
    const videoProgress = 40; // Video is now completed

    // Interactive completion is handled separately in handleInteractionComplete
    const currentInteractiveCompleted =
      interactiveCompleted ||
      currentSavedProgress?.interactiveCompleted ||
      false;
    const interactiveProgress = currentInteractiveCompleted ? 40 : 0;

    const totalProgress = videoProgress + interactiveProgress + testProgress;

    setCurrentProgress(totalProgress);

    // Force save progress immediately with all preserved states
    saveProgress(
      resolvedParams.kidId,
      resolvedParams.lessonId,
      {
        videoCompleted: true,
        interactiveCompleted: currentInteractiveCompleted,
        lessonCompleted: totalProgress >= 100,
        currentProgress: totalProgress,
        completedTests: preservedCompletedTests,
      },
      resolvedParams.courseId
    );

    console.log("📹 Video completed, progress saved:", {
      totalProgress,
      interactiveCompleted: currentInteractiveCompleted,
      preservedTests: preservedCompletedTests.length,
      savedProgress: currentSavedProgress,
    });
  };

  const handleVideoDurationLoad = (duration: number) => {
    console.log("📏 Video duration received:", duration);
    setVideoDuration(duration);
  };

  const handleInteractionComplete = (
    answeredCount: number,
    totalInteractions: number
  ) => {
    console.log(
      `🎯 handleInteractionComplete called: ${answeredCount}/${totalInteractions}`
    );
    console.log("Current states:", {
      videoCompleted,
      interactiveCompleted,
      completedTests: completedTests.length,
      currentProgress,
    });

    // Mark interactive as completed when user answers all questions
    if (answeredCount >= totalInteractions && totalInteractions > 0) {
      console.log(
        "🎉 All interactions completed! Setting interactiveCompleted = true"
      );

      setInteractiveCompleted(true);

      // Load current saved progress to preserve existing states
      const currentSavedProgress = getStoredProgress(
        resolvedParams.kidId,
        resolvedParams.lessonId
      );

      console.log("📁 Current saved progress:", currentSavedProgress);

      // Preserve all existing completions
      const currentVideoCompleted =
        videoCompleted || currentSavedProgress?.videoCompleted || false;
      const preservedCompletedTests =
        currentSavedProgress?.completedTests || completedTests;

      // Recalculate progress with interactive completion
      const videoProgress = currentVideoCompleted ? 40 : 0;
      const interactiveProgress = 40; // Interactive is now completed
      const testProgress =
        testsData.length > 0
          ? (preservedCompletedTests.length / testsData.length) * 20
          : 0;
      const totalProgress = videoProgress + interactiveProgress + testProgress;

      console.log("🧮 Progress calculation:", {
        videoProgress,
        interactiveProgress,
        testProgress,
        totalProgress,
      });

      setCurrentProgress(totalProgress);

      // Save updated progress
      const progressToSave = {
        videoCompleted: currentVideoCompleted,
        interactiveCompleted: true,
        lessonCompleted: totalProgress >= 100,
        currentProgress: totalProgress,
        completedTests: preservedCompletedTests,
      };

      console.log("💾 Saving progress:", progressToSave);

      saveProgress(
        resolvedParams.kidId,
        resolvedParams.lessonId,
        progressToSave,
        resolvedParams.courseId
      );

      console.log("✅ Interactive completed, progress updated:", {
        totalProgress,
        videoCompleted: currentVideoCompleted,
        interactiveCompleted: true,
      });
    } else {
      console.log(
        "⏳ Not all interactions completed yet, waiting for more answers..."
      );
    }
  };

  // Navigation handlers
  const handleNextLesson = () => {
    if (nextLessonId && currentProgress >= 80) {
      console.log("🚀 Navigating to next lesson:", nextLessonId);
      window.location.href = `/environment-kid/kid-learning-zone/${resolvedParams.kidId}/courses/${resolvedParams.courseId}/lessons/${nextLessonId}`;
    } else {
      console.warn("⚠️ Cannot navigate:", { nextLessonId, currentProgress });
    }
  };

  const handlePrevLesson = () => {
    if (prevLessonId) {
      console.log("⬅️ Navigating to previous lesson:", prevLessonId);
      window.location.href = `/environment-kid/kid-learning-zone/${resolvedParams.kidId}/courses/${resolvedParams.courseId}/lessons/${prevLessonId}`;
    }
  };

  // Function to handle test completion with API integration
  const handleTestCompletion = async (
    testId: string,
    testResult: {
      score: number;
      totalPoints: number;
      answers: any[];
      timeSpent: number;
      passed: boolean;
    }
  ) => {
    try {
      // Submit test result to backend API using new structure
      const apiResult = await submitTestResult(
        resolvedParams.kidId,
        resolvedParams.courseId,
        resolvedParams.lessonId,
        testId,
        testResult
      );
      console.log("✅ Test result submitted to API:", apiResult);

      // Update local progress after successful API submission
      if (testResult.passed) {
        markTestCompleted(testId);
      }
    } catch (error) {
      console.error("❌ Failed to submit test result to API:", error);
      // Still update local progress as fallback
      if (testResult.passed) {
        markTestCompleted(testId);
      }
    }
  };

  // Function to mark test as completed (call this when returning from test page)
  const markTestCompleted = (testId: string) => {
    setCompletedTests((prev) => {
      if (!prev.includes(testId)) {
        const newCompletedTests = [...prev, testId];

        // Load current saved progress to preserve existing completion states
        const currentSavedProgress = getStoredProgress(
          resolvedParams.kidId,
          resolvedParams.lessonId
        );

        // Use current state OR saved state to preserve video/interactive completion
        const currentVideoCompleted =
          videoCompleted || currentSavedProgress?.videoCompleted || false;
        const currentInteractiveCompleted =
          interactiveCompleted ||
          currentSavedProgress?.interactiveCompleted ||
          false;

        // Calculate progress with preserved states
        const testProgress =
          (newCompletedTests.length / Math.max(testsData.length, 1)) * 20;
        const videoProgress = currentVideoCompleted ? 40 : 0;
        const interactiveProgress = currentInteractiveCompleted ? 40 : 0;
        const totalProgress =
          videoProgress + interactiveProgress + testProgress;

        // Update states to match what we're saving
        setVideoCompleted(currentVideoCompleted);
        setInteractiveCompleted(currentInteractiveCompleted);
        setCurrentProgress(totalProgress);

        saveProgress(
          resolvedParams.kidId,
          resolvedParams.lessonId,
          {
            videoCompleted: currentVideoCompleted,
            interactiveCompleted: currentInteractiveCompleted,
            lessonCompleted: totalProgress >= 100,
            currentProgress: totalProgress,
            completedTests: newCompletedTests,
          },
          resolvedParams.courseId
        );

        console.log("Test marked as completed and progress saved:", {
          testId,
          newCompletedTests,
          videoCompleted: currentVideoCompleted,
          interactiveCompleted: currentInteractiveCompleted,
          totalProgress,
          savedProgress: currentSavedProgress,
        });

        return newCompletedTests;
      }
      return prev;
    });
  };

  // Check if test is completed
  const isTestCompleted = (testId: string) => {
    return completedTests.includes(testId);
  };

  // Listen for test completion from session storage or URL params
  useEffect(() => {
    const checkTestCompletion = async () => {
      console.log("Checking test completion...");

      // Check if coming back from a test with completion status
      const urlParams = new URLSearchParams(window.location.search);
      const completedTestId = urlParams.get("completedTest");

      console.log("URL completedTest param:", completedTestId);
      console.log("Current completed tests:", completedTests);

      if (completedTestId && !completedTests.includes(completedTestId)) {
        console.log("Marking test as completed from URL:", completedTestId);
        markTestCompleted(completedTestId);

        // Clean up URL
        window.history.replaceState({}, "", window.location.pathname);
        return; // Exit early to avoid duplicate processing
      }

      // Also check session storage for test completion
      const sessionTestCompleted = sessionStorage.getItem("lastCompletedTest");
      console.log("Session storage test completion:", sessionTestCompleted);

      if (sessionTestCompleted) {
        try {
          const testCompletionData = JSON.parse(sessionTestCompleted);
          const { testId, lessonId, timestamp, passed, score, totalPoints } =
            testCompletionData;

          console.log("Session test data:", {
            testId,
            lessonId,
            timestamp,
            passed,
            score,
            totalPoints,
          });
          console.log("Current lesson ID:", resolvedParams.lessonId);
          console.log(
            "Time difference:",
            Date.now() - new Date(timestamp).getTime()
          );

          // Only if it's for this lesson, recent, and passed
          if (
            lessonId === resolvedParams.lessonId &&
            Date.now() - new Date(timestamp).getTime() < 5 * 60 * 1000 &&
            passed &&
            !completedTests.includes(testId)
          ) {
            console.log("Processing test completion from session:", testId);

            // Handle test completion with API integration
            await handleTestCompletion(testId, {
              score: score || 0,
              totalPoints: totalPoints || 0,
              answers: [], // We don't store answers in session, but API might not need them
              timeSpent: 0, // We don't track time spent in session
              passed: passed,
            });

            sessionStorage.removeItem("lastCompletedTest");
          }
        } catch (error) {
          console.error("Error parsing session test completion:", error);
        }
      }
    };

    // Only run once when component mounts or when lessonId changes
    // Don't include completedTests in dependencies to avoid infinite loops
    checkTestCompletion();
  }, [resolvedParams.lessonId]); // Removed completedTests dependency

  // Separate useEffect to calculate and save progress when states change
  useEffect(() => {
    const videoProgress = videoCompleted ? 40 : 0;
    const interactiveProgress = interactiveCompleted ? 40 : 0;
    const testProgress =
      testsData.length > 0
        ? (completedTests.length / testsData.length) * 20
        : 0;
    const totalProgress = videoProgress + interactiveProgress + testProgress;

    setCurrentProgress(totalProgress);

    // Save progress to localStorage whenever it changes
    if (videoCompleted || interactiveCompleted || completedTests.length > 0) {
      saveProgress(
        resolvedParams.kidId,
        resolvedParams.lessonId,
        {
          videoCompleted,
          interactiveCompleted,
          lessonCompleted: totalProgress >= 100,
          currentProgress: totalProgress,
          completedTests,
        },
        resolvedParams.courseId
      );

      console.log("Progress recalculated and saved:", {
        videoProgress,
        interactiveProgress,
        testProgress,
        totalProgress,
        completedTests: completedTests.length,
        totalTests: testsData.length,
      });
    }
  }, [
    videoCompleted,
    interactiveCompleted,
    completedTests,
    testsData.length,
    resolvedParams.kidId,
    resolvedParams.lessonId,
  ]);

  // Listen for page focus to check for new test completions
  useEffect(() => {
    const handleFocus = () => {
      console.log("Page focused, checking for test completions...");

      // Check session storage for test completion
      const sessionTestCompleted = sessionStorage.getItem("lastCompletedTest");
      if (sessionTestCompleted) {
        try {
          const { testId, lessonId, timestamp, passed } =
            JSON.parse(sessionTestCompleted);

          console.log("Found test completion in session storage:", {
            testId,
            lessonId,
            currentLessonId: resolvedParams.lessonId,
            passed,
            alreadyCompleted: completedTests.includes(testId),
          });

          // Only if it's for this lesson, recent, passed, and not already marked
          if (
            lessonId === resolvedParams.lessonId &&
            Date.now() - new Date(timestamp).getTime() < 5 * 60 * 1000 &&
            passed &&
            !completedTests.includes(testId)
          ) {
            console.log("Marking test as completed from focus event:", testId);
            markTestCompleted(testId);
            sessionStorage.removeItem("lastCompletedTest");
          }
        } catch (error) {
          console.error("Error parsing session test completion:", error);
        }
      }
    };

    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, [resolvedParams.lessonId, completedTests]);

  // Listen for storage changes from other tabs/windows
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      const progressKey = getProgressKey(
        resolvedParams.kidId,
        resolvedParams.lessonId
      );

      if (e.key === progressKey && e.newValue) {
        try {
          const newProgress = JSON.parse(e.newValue);
          console.log("Progress updated from storage event:", newProgress);

          setVideoCompleted(newProgress.videoCompleted || false);
          setInteractiveCompleted(newProgress.interactiveCompleted || false);
          setLessonCompleted(newProgress.lessonCompleted || false);
          setCurrentProgress(newProgress.currentProgress || 0);
          setCompletedTests(newProgress.completedTests || []);
        } catch (error) {
          console.error("Error parsing storage progress:", error);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [resolvedParams.kidId, resolvedParams.lessonId]);

  // Force save progress before page unload
  useEffect(() => {
    const handleBeforeUnload = () => {
      // Force save current progress before navigating away
      if (videoCompleted || interactiveCompleted || completedTests.length > 0) {
        const videoProgress = videoCompleted ? 40 : 0;
        const interactiveProgress = interactiveCompleted ? 40 : 0;
        const testProgress =
          testsData.length > 0
            ? (completedTests.length / testsData.length) * 20
            : 0;
        const totalProgress =
          videoProgress + interactiveProgress + testProgress;

        saveProgress(
          resolvedParams.kidId,
          resolvedParams.lessonId,
          {
            videoCompleted,
            interactiveCompleted,
            lessonCompleted: totalProgress >= 100,
            currentProgress: totalProgress,
            completedTests,
          },
          resolvedParams.courseId
        );

        console.log("Progress force-saved before unload:", totalProgress);
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [
    videoCompleted,
    interactiveCompleted,
    completedTests,
    testsData.length,
    resolvedParams.kidId,
    resolvedParams.lessonId,
  ]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-10 h-10 bg-gray-300 rounded-full animate-pulse"></div>
            <div className="h-8 bg-gray-300 rounded w-64 animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3 space-y-6">
              <div className="h-80 bg-gray-300 rounded-2xl animate-pulse"></div>
              <div className="h-48 bg-gray-300 rounded-2xl animate-pulse"></div>
            </div>
            <div className="space-y-4">
              <div className="h-64 bg-gray-300 rounded-2xl animate-pulse"></div>
              <div className="h-48 bg-gray-300 rounded-2xl animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !lessonData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 flex items-center justify-center p-6">
        <Card className="w-full max-w-md border-0 shadow-2xl">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-red-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops!</h2>
            <p className="text-red-500 mb-6">
              {error || "Không tìm thấy bài học"}
            </p>
            <div className="space-y-3">
              <Button
                onClick={() => window.location.reload()}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105"
              >
                Thử lại
              </Button>
              <Link
                href={`/environment-kid/kid-learning-zone/courses/${resolvedParams.courseId}`}
              >
                <Button
                  variant="outline"
                  className="w-full border-2 border-gray-300 hover:border-blue-400 py-3 rounded-xl"
                >
                  Quay lại khóa học
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center gap-6 mb-8">
          <Link
            href={`/environment-kid/kid-learning-zone/${resolvedParams.kidId}/courses/${resolvedParams.courseId}`}
          >
            <Button
              variant="ghost"
              className="w-12 h-12 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
            >
              <ArrowLeft className="h-6 w-6 text-blue-600" />
            </Button>
          </Link>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {lessonData.title}
              </h1>
              <Badge className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-3 py-1 rounded-full">
                Bài {lessonData.order}
              </Badge>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{lessonData.duration} phút</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>{lessonData.courseId.ageGroup}</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4" />
                <span>{lessonData.courseId.category}</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Tiến độ học tập
                </span>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-blue-600">
                    {currentProgress}%
                  </span>

                  {/* Debug buttons - remove in production */}
                  {process.env.NODE_ENV === "development" && (
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-xs px-2 py-1"
                        onClick={() => {
                          console.log("Debug: Marking video as completed");
                          handleVideoComplete(90);
                        }}
                      >
                        ✅ Video
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-xs px-2 py-1"
                        onClick={() => {
                          console.log(
                            "Debug: Simulating interactive completion"
                          );
                          handleInteractionComplete(1, 1); // Simulate answering the single question
                        }}
                      >
                        🎯 Interactive
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-xs px-2 py-1"
                        onClick={() => {
                          if (testsData.length > 0) {
                            console.log(
                              "Debug: Marking first test as completed"
                            );
                            markTestCompleted(testsData[0]._id);
                          }
                        }}
                      >
                        🏆 Test
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-xs px-2 py-1"
                        onClick={() => {
                          console.log("Debug: Clearing all progress");
                          localStorage.removeItem(
                            getProgressKey(
                              resolvedParams.kidId,
                              resolvedParams.lessonId
                            )
                          );
                          window.location.reload();
                        }}
                      >
                        🗑️ Clear
                      </Button>
                    </div>
                  )}
                </div>
              </div>
              <Progress
                value={currentProgress}
                className="h-3 bg-gray-200 rounded-full overflow-hidden"
              >
                <div
                  className="h-full bg-gradient-to-r from-green-400 to-blue-500 transition-all duration-500 ease-out rounded-full"
                  style={{ width: `${currentProgress}%` }}
                />
              </Progress>

              {/* Debug console - remove in production */}
              {process.env.NODE_ENV === "development" && (
                <div className="mt-3 p-3 bg-gray-100 rounded-lg text-xs">
                  <strong>Debug Status:</strong>
                  <div>
                    Video: {videoCompleted ? "✅" : "❌"} | Interactive:{" "}
                    {interactiveCompleted ? "✅" : "❌"} | Tests:{" "}
                    {completedTests.length}/{testsData.length}
                  </div>
                  <div>
                    Progress: {currentProgress}% | Storage Key:{" "}
                    {getProgressKey(
                      resolvedParams.kidId,
                      resolvedParams.lessonId
                    )}
                  </div>
                  <div>
                    Navigation: Prev: {prevLessonId ? "✅" : "❌"} | Next:{" "}
                    {nextLessonId ? "✅" : "❌"} | Total Lessons:{" "}
                    {courseLessons.length}
                  </div>
                  <div className="mt-2 flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs px-2 py-1"
                      onClick={() => {
                        if (testsData.length > 0) {
                          const testData = {
                            testId: testsData[0]._id,
                            lessonId: resolvedParams.lessonId,
                            timestamp: new Date().toISOString(),
                            score: 8,
                            totalPoints: 10,
                            passed: true,
                          };
                          sessionStorage.setItem(
                            "lastCompletedTest",
                            JSON.stringify(testData)
                          );
                          console.log(
                            "Debug: Simulated test completion in sessionStorage"
                          );
                          window.location.reload();
                        }
                      }}
                    >
                      🔄 Simulate Test Return
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs px-2 py-1"
                      onClick={() => {
                        console.log(
                          "SessionStorage content:",
                          sessionStorage.getItem("lastCompletedTest")
                        );
                        console.log(
                          "LocalStorage content:",
                          localStorage.getItem(
                            getProgressKey(
                              resolvedParams.kidId,
                              resolvedParams.lessonId
                            )
                          )
                        );
                      }}
                    >
                      📋 Check Storage
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs px-2 py-1"
                      onClick={() => {
                        console.log("Manual progress refresh...");
                        const savedProgress = getStoredProgress(
                          resolvedParams.kidId,
                          resolvedParams.lessonId
                        );

                        if (savedProgress) {
                          setVideoCompleted(
                            savedProgress.videoCompleted || false
                          );
                          setInteractiveCompleted(
                            savedProgress.interactiveCompleted || false
                          );
                          setLessonCompleted(
                            savedProgress.lessonCompleted || false
                          );
                          setCurrentProgress(
                            savedProgress.currentProgress || 0
                          );
                          setCompletedTests(savedProgress.completedTests || []);
                          console.log(
                            "Progress manually refreshed:",
                            savedProgress
                          );
                        } else {
                          console.log("No saved progress found");
                        }
                      }}
                    >
                      🔄 Refresh Progress
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Video Section */}
            <Card className="border-0 shadow-2xl rounded-3xl overflow-hidden bg-white/80 backdrop-blur-sm">
              <CardContent className="p-0">
                <div className="relative">
                  <InteractiveVideo
                    videoSrc={
                      lessonData.videoUrl?.trim().replace(/`/g, "") ||
                      "https://www.youtube.com/watch?v=LIN8GpWQ5rM"
                    }
                    interactions={videoInteractions}
                    onComplete={handleVideoComplete}
                    onInteractionComplete={handleInteractionComplete}
                    onDurationLoad={handleVideoDurationLoad}
                  />
                  {videoCompleted && (
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-green-500 text-white px-3 py-1 rounded-full flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        Hoàn thành
                      </Badge>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Lesson Content */}
            <Card className="border-0 shadow-2xl rounded-3xl bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">
                    Nội dung bài học
                  </h3>
                </div>

                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-600 text-lg leading-relaxed mb-8">
                    {lessonData.description}
                  </p>

                  {lessonData.content?.sections && (
                    <div className="space-y-6">
                      {lessonData.content.sections.map((section, index) => (
                        <div key={index} className="relative">
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 to-purple-500 rounded-full"></div>
                          <div className="pl-8">
                            <h4 className="text-xl font-bold text-gray-800 mb-3">
                              {section.title}
                            </h4>
                            <p className="text-gray-600 leading-relaxed">
                              {section.text}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Tests Section */}
            {testsData.length > 0 && (
              <Card className="border-0 shadow-2xl rounded-3xl bg-white/80 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center">
                      <Trophy className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">
                      Bài kiểm tra
                    </h3>
                    <Badge className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                      {testsData.length} bài test
                    </Badge>
                  </div>

                  {/* Tests Overview */}
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 mb-6">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">
                      Yêu cầu hoàn thành bài kiểm tra
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Xem video bài học trước (40%)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Trophy className="w-4 h-4 text-orange-500" />
                        <span>Làm bài test để hoàn thành 100%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Target className="w-4 h-4 text-purple-500" />
                        <span>Đạt điểm pass để qua bài</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-6">
                    {testsData.map((test, index) => (
                      <div key={test._id} className="group">
                        <div className="p-6 border-2 border-gray-100 rounded-2xl hover:border-blue-300 hover:shadow-lg transition-all duration-300 bg-gradient-to-r from-white to-blue-50">
                          {/* Test Header */}
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-4">
                              <div className="w-14 h-14 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                                {index + 1}
                              </div>
                              <div>
                                <h4 className="font-bold text-xl text-gray-800 group-hover:text-blue-600 transition-colors mb-2">
                                  {test.title}
                                </h4>
                                <p className="text-gray-600 text-sm mb-3">
                                  {test.description}
                                </p>
                                <div className="flex items-center gap-2 text-xs">
                                  <Badge
                                    variant="outline"
                                    className="bg-green-50 text-green-700 border-green-200"
                                  >
                                    {test.questions[0]?.questionType ||
                                      "Multiple Choice"}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              {isTestCompleted(test._id) && (
                                <div className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-1 rounded-full border border-green-200">
                                  <CheckCircle className="w-4 h-4" />
                                  <span className="text-sm font-medium">
                                    Đã hoàn thành
                                  </span>
                                </div>
                              )}
                              <Link
                                href={`/environment-kid/kid-learning-zone/${resolvedParams.kidId}/courses/${resolvedParams.courseId}/lessons/${resolvedParams.lessonId}/tests/${test._id}`}
                              >
                                <Button
                                  className={`font-semibold px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg ${
                                    isTestCompleted(test._id)
                                      ? "bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600 text-white"
                                      : "bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white"
                                  }`}
                                >
                                  {isTestCompleted(test._id) ? (
                                    <>
                                      <CheckCircle className="w-4 h-4 mr-2" />
                                      Làm lại test
                                    </>
                                  ) : (
                                    <>
                                      <Play className="w-4 h-4 mr-2" />
                                      Làm bài test
                                    </>
                                  )}
                                </Button>
                              </Link>
                            </div>
                          </div>

                          {/* Test Statistics */}
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                            <div className="flex items-center gap-2 p-3 bg-white rounded-lg">
                              <Clock className="w-4 h-4 text-blue-500" />
                              <div>
                                <div className="text-xs text-gray-500">
                                  Thời gian
                                </div>
                                <div className="font-semibold text-gray-800">
                                  {test.timeLimit} phút
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 p-3 bg-white rounded-lg">
                              <Target className="w-4 h-4 text-green-500" />
                              <div>
                                <div className="text-xs text-gray-500">
                                  Điểm qua
                                </div>
                                <div className="font-semibold text-gray-800">
                                  {test.passingScore}%
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 p-3 bg-white rounded-lg">
                              <Users className="w-4 h-4 text-purple-500" />
                              <div>
                                <div className="text-xs text-gray-500">
                                  Lần thử
                                </div>
                                <div className="font-semibold text-gray-800">
                                  {test.attempts}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 p-3 bg-white rounded-lg">
                              <Star className="w-4 h-4 text-yellow-500" />
                              <div>
                                <div className="text-xs text-gray-500">
                                  Tổng điểm
                                </div>
                                <div className="font-semibold text-gray-800">
                                  {test.totalPoints}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Test Details */}
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-4 text-gray-600">
                              <span>📝 {test.questions.length} câu hỏi</span>
                              <span>👨‍🏫 {test.createdBy?.fullName}</span>
                              {test.createdBy?.specializations &&
                                test.createdBy.specializations.length > 0 && (
                                  <span>
                                    📚{" "}
                                    {test.createdBy.specializations.join(", ")}
                                  </span>
                                )}
                            </div>
                            <div className="text-xs text-gray-500">
                              Tạo:{" "}
                              {new Date(test.createdAt).toLocaleDateString(
                                "vi-VN"
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Navigation */}
            <div className="flex justify-between items-center pt-6">
              <Button
                variant="outline"
                className={`px-8 py-3 rounded-xl border-2 transition-all duration-300 ${
                  prevLessonId
                    ? "border-gray-300 hover:border-blue-400 hover:bg-blue-50"
                    : "border-gray-200 bg-gray-100 cursor-not-allowed"
                }`}
                disabled={!prevLessonId}
                onClick={handlePrevLesson}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Bài trước
              </Button>
              <Button
                className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                  currentProgress >= 80 && nextLessonId
                    ? "bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white shadow-lg"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
                disabled={currentProgress < 80 || !nextLessonId}
                onClick={handleNextLesson}
              >
                {nextLessonId ? "Bài tiếp theo" : "Bài cuối cùng"}
                <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Lesson Info */}
            <Card className="border-0 shadow-2xl rounded-3xl bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-4 text-gray-800">
                  Thông tin bài học
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Mã bài học:</span>
                    <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                      {lessonData._id.slice(-8)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Khóa học:</span>
                    <span className="font-medium text-blue-600">
                      {lessonData.courseId.title}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Danh mục:</span>
                    <Badge variant="outline">
                      {lessonData.courseId.category}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Độ tuổi:</span>
                    <Badge variant="outline">
                      {lessonData.courseId.ageGroup}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Thứ tự:</span>
                    <span className="font-bold text-purple-600">
                      #{lessonData.order}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* API Testing Panel */}
            <Card className="border-0 shadow-2xl rounded-3xl bg-white/80 backdrop-blur-sm mb-6">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-4 text-gray-800">
                  🧪 API Testing Status
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      Course Progress API:
                    </span>
                    <Badge
                      variant={
                        apiStatus.courseProgress === "success"
                          ? "default"
                          : apiStatus.courseProgress === "error"
                          ? "destructive"
                          : "secondary"
                      }
                    >
                      {apiStatus.courseProgress === "success"
                        ? "✅ Success"
                        : apiStatus.courseProgress === "error"
                        ? "❌ Error"
                        : "⏳ Loading"}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      All Progress API:
                    </span>
                    <Badge
                      variant={
                        apiStatus.allProgress === "success"
                          ? "default"
                          : apiStatus.allProgress === "error"
                          ? "destructive"
                          : "secondary"
                      }
                    >
                      {apiStatus.allProgress === "success"
                        ? "✅ Success"
                        : apiStatus.allProgress === "error"
                        ? "❌ Error"
                        : "⏳ Loading"}
                    </Badge>
                  </div>

                  <div className="text-xs text-gray-500 mt-4 space-y-1">
                    <p>
                      <strong>Get Course Progress:</strong> GET /api/progress/
                      {resolvedParams.courseId}
                    </p>
                    <p>
                      <strong>Get All Progress:</strong> GET /api/progress/kid/
                      {resolvedParams.kidId}
                    </p>
                    <p>
                      <strong>Update Progress:</strong> PUT /api/progress/update
                    </p>
                    <p>
                      <strong>Enroll Course:</strong> POST /api/progress/enroll
                    </p>
                    <p className="text-[10px] bg-gray-100 p-2 rounded">
                      <strong>Update Body:</strong>{" "}
                      {`{kidId: "${resolvedParams.kidId}", courseId: "${resolvedParams.courseId}", testResults: [{testId, score, passed}], lessonCompleted: [{lessonId: "${resolvedParams.lessonId}"}], status: boolean}`}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* All Progress Data Preview */}
            {allProgressData && Array.isArray(allProgressData) && (
              <Card className="border-0 shadow-2xl rounded-3xl bg-blue-50 backdrop-blur-sm mb-6">
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-4 text-blue-800">
                    📋 All Course Progress ({allProgressData.length} courses)
                  </h3>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {allProgressData.map((progress: any, index: number) => (
                      <div
                        key={index}
                        className="flex justify-between items-center text-sm border-b pb-2"
                      >
                        <span className="text-gray-600">
                          Course: {progress.courseId?.slice(-8) || "Unknown"}
                        </span>
                        <div className="flex gap-2">
                          <Badge
                            variant={progress.status ? "default" : "secondary"}
                            className="text-xs"
                          >
                            {progress.status ? "Done" : "Learning"}
                          </Badge>
                          <span className="text-xs text-gray-500">
                            {progress.lessonCompleted?.length || 0}L /{" "}
                            {progress.testResults?.length || 0}T
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Course Progress from API */}
            {courseProgressData ? (
              <Card className="border-0 shadow-2xl rounded-3xl bg-white/80 backdrop-blur-sm mb-6">
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-4 text-gray-800">
                    📊 Tiến độ khóa học (API)
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        Trạng thái khóa học:
                      </span>
                      <Badge
                        variant={
                          courseProgressData.status ? "default" : "secondary"
                        }
                      >
                        {courseProgressData.status
                          ? "Đã hoàn thành"
                          : "Đang học"}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        Bài học đã hoàn thành:
                      </span>
                      <span className="text-sm font-medium">
                        {courseProgressData.lessonCompleted?.length || 0} bài
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        Bài test đã làm:
                      </span>
                      <span className="text-sm font-medium">
                        {courseProgressData.testResults?.length || 0} bài
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        Bài test đã đạt:
                      </span>
                      <span className="text-sm font-medium">
                        {courseProgressData.testResults?.filter(
                          (test: any) => test.passed
                        )?.length || 0}{" "}
                        bài
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        Cập nhật lần cuối:
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(courseProgressData.updatedAt).toLocaleString(
                          "vi-VN"
                        )}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-0 shadow-2xl rounded-3xl bg-yellow-50 backdrop-blur-sm mb-6">
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-4 text-yellow-800">
                    ⚡ Chế độ học ngoại tuyến
                  </h3>
                  <div className="space-y-2">
                    <p className="text-sm text-yellow-700">
                      Hệ thống đang hoạt động với dữ liệu cục bộ.
                    </p>
                    <p className="text-xs text-yellow-600">
                      Tiến độ của bé sẽ được đồng bộ với server khi kết nối ổn
                      định.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Progress Checklist */}
            <Card className="border-0 shadow-2xl rounded-3xl bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-4 text-gray-800">
                  🎯 Tiến độ bài học hiện tại
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      title: "Xem video bài học",
                      completed: videoCompleted,
                      icon: Play,
                      progress: videoCompleted ? "40%" : "0%",
                    },
                    {
                      title: "Hoàn thành hoạt động",
                      completed: interactiveCompleted,
                      icon: BookOpen,
                      progress: interactiveCompleted ? "40%" : "0%",
                    },
                    {
                      title: `Làm bài kiểm tra (${completedTests.length}/${testsData.length})`,
                      completed:
                        testsData.length > 0 &&
                        completedTests.length === testsData.length,
                      icon: Trophy,
                      progress:
                        testsData.length > 0
                          ? `${Math.round(
                              (completedTests.length / testsData.length) * 20
                            )}%`
                          : "0%",
                    },
                  ].map((step, index) => {
                    const IconComponent = step.icon;
                    return (
                      <div key={index} className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                            step.completed
                              ? "bg-gradient-to-r from-green-400 to-blue-500 text-white"
                              : "bg-gray-200 text-gray-400"
                          }`}
                        >
                          {step.completed ? (
                            <CheckCircle className="w-4 h-4" />
                          ) : (
                            <IconComponent className="w-4 h-4" />
                          )}
                        </div>
                        <div className="flex-1">
                          <span
                            className={`font-medium transition-colors ${
                              step.completed ? "text-gray-800" : "text-gray-500"
                            }`}
                          >
                            {step.title}
                          </span>
                          <div className="text-xs text-gray-500 mt-1">
                            Tiến độ: {step.progress}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Rewards */}
            <Card className="border-0 shadow-2xl rounded-3xl bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 text-white">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Trophy className="w-8 h-8" />
                  <h3 className="font-bold text-lg">Phần thưởng</h3>
                </div>
                <p className="mb-4 opacity-90">Hoàn thành bài học để nhận:</p>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-current" />
                  <span className="font-bold text-lg">5 Sao vàng</span>
                </div>
                <div className="mt-4 text-sm opacity-75">
                  Tiến độ: {currentProgress}/100%
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
