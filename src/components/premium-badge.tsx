import { Crown, User, AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePremium } from "@/hooks/usePremium";
import { redirectToPremiumUpgrade } from "@/utils/premium";

interface PremiumBadgeProps {
  showUpgradeButton?: boolean;
  refreshFromAPI?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function PremiumBadge({
  showUpgradeButton = true,
  refreshFromAPI = false,
  size = "md",
  className = "",
}: PremiumBadgeProps) {
  const {
    isPremium,
    displayText,
    isExpired,
    loading,
    error,
    refreshPremiumStatus,
  } = usePremium(refreshFromAPI);

  if (loading) {
    return (
      <div
        className={`inline-flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2 ${className}`}
      >
        <RefreshCw className="h-4 w-4 animate-spin text-gray-500" />
        <span className="text-sm text-gray-600">Đang tải...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`inline-flex items-center gap-2 bg-red-50 rounded-full px-4 py-2 ${className}`}
      >
        <AlertCircle className="h-4 w-4 text-red-500" />
        <span className="text-sm text-red-600">Lỗi tải thông tin</span>
        <Button
          onClick={refreshPremiumStatus}
          variant="ghost"
          size="sm"
          className="h-6 w-6 p-0 text-red-500 hover:text-red-600"
        >
          <RefreshCw className="h-3 w-3" />
        </Button>
      </div>
    );
  }

  const sizeClasses = {
    sm: "px-3 py-1 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  const iconSizes = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  };

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      {/* Premium Status Badge */}
      <div
        className={`inline-flex items-center gap-2 rounded-full ${
          sizeClasses[size]
        } ${
          isPremium
            ? "bg-gradient-to-r from-[#FFD700]/20 to-[#FFA500]/20 text-[#8B4513] border border-[#FFD700]/30"
            : isExpired
            ? "bg-red-50 text-red-600 border border-red-200"
            : "bg-gray-100 text-gray-600 border border-gray-200"
        }`}
      >
        {isPremium ? (
          <Crown className={`${iconSizes[size]} text-[#FFD700]`} />
        ) : (
          <User className={iconSizes[size]} />
        )}
        <span className="font-medium">{displayText}</span>

        {/* Refresh button for API data */}
        {refreshFromAPI && (
          <Button
            onClick={refreshPremiumStatus}
            variant="ghost"
            size="sm"
            className="h-5 w-5 p-0 hover:bg-transparent"
            title="Làm mới thông tin premium"
          >
            <RefreshCw className="h-3 w-3" />
          </Button>
        )}
      </div>

      {/* Upgrade Button */}
      {showUpgradeButton && !isPremium && (
        <Button
          onClick={() => redirectToPremiumUpgrade()}
          className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] hover:from-[#FFA500] hover:to-[#FF8C00] text-black rounded-full px-4 py-1 text-sm font-medium"
        >
          <Crown className="h-4 w-4 mr-1" />
          Nâng cấp ngay
        </Button>
      )}
    </div>
  );
}

interface PremiumStatusDisplayProps {
  parentId?: string;
  className?: string;
}

export function PremiumStatusDisplay({
  parentId,
  className = "",
}: PremiumStatusDisplayProps) {
  const premium = usePremium(false);

  return (
    <div className={`space-y-2 ${className}`}>
      <PremiumBadge size="md" />

      {premium.subscriptionExpiry && (
        <p className="text-xs text-gray-500">
          {premium.isExpired
            ? `Hết hạn: ${new Date(
                premium.subscriptionExpiry
              ).toLocaleDateString("vi-VN")}`
            : `Còn hạn đến: ${new Date(
                premium.subscriptionExpiry
              ).toLocaleDateString("vi-VN")}`}
        </p>
      )}
    </div>
  );
}
