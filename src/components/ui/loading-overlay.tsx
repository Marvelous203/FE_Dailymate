'use client';

import { motion } from "framer-motion";
import Image from "next/image";

interface LoadingOverlayProps {
  isVisible: boolean;
  title?: string;
  subtitle?: string;
  logoSrc?: string;
  showProgress?: boolean;
  showDots?: boolean;
}

export function LoadingOverlay({
  isVisible,
  title = "Đang tải...",
  subtitle = "Vui lòng chờ trong giây lát",
  logoSrc = "/globe.svg",
  showProgress = true,
  showDots = true
}: LoadingOverlayProps) {
  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="bg-white rounded-2xl p-8 shadow-2xl flex flex-col items-center space-y-6 max-w-sm mx-4"
      >
        {/* Animated Logo */}
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            rotate: { duration: 2, repeat: Infinity, ease: "linear" },
            scale: { duration: 1, repeat: Infinity, ease: "easeInOut" }
          }}
          className="relative"
        >
          <div className="absolute -inset-2 bg-gradient-to-r from-[#10b981] to-[#3b82f6] rounded-full blur opacity-70"></div>
          <div className="relative bg-white rounded-full p-3">
            <Image
              src={logoSrc}
              alt="Logo"
              width={60}
              height={60}
              className="rounded-full"
            />
          </div>
        </motion.div>

        {/* Loading Text */}
        <div className="text-center">
          <motion.h3 
            className="text-xl font-semibold text-gray-800 mb-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {title}
          </motion.h3>
          <motion.p 
            className="text-gray-500 text-sm"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {subtitle}
          </motion.p>
        </div>

        {/* Animated Progress Bar */}
        {showProgress && (
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#10b981] to-[#3b82f6] rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        )}

        {/* Floating Dots Animation */}
        {showDots && (
          <div className="flex space-x-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-3 h-3 bg-[#10b981] rounded-full"
                animate={{
                  y: [0, -10, 0],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

// Hook để quản lý loading state
export function useLoading() {
  const [isLoading, setIsLoading] = useState(false);

  const showLoading = () => setIsLoading(true);
  const hideLoading = () => setIsLoading(false);

  return {
    isLoading,
    showLoading,
    hideLoading
  };
}