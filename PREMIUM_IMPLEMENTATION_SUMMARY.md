# Hệ thống Premium - Tóm tắt Implementation

## 🎯 Mục đích

Kiểm tra quyền truy cập Premium của parent để xác định có thể truy cập các khóa học có phí hay không.

## 📁 Files đã tạo/cập nhật

### 1. **`src/utils/premium.ts`** - Utility functions chính

```typescript
// Các functions chính:
- hasParentPremiumAccess(): boolean     // Kiểm tra có premium không
- canAccessCourse(course): boolean      // Kiểm tra có thể truy cập khóa học
- getPremiumStatusInfo()                // Lấy thông tin premium chi tiết
- checkCourseAccess(course)             // Kiểm tra và trả về message phù hợp
```

### 2. **`src/hooks/usePremium.ts`** - Custom hook

```typescript
// Usage:
const { isPremium, displayText, canAccessCourse } = usePremium();
const hasPremium = usePremiumAccess(); // Version đơn giản hơn
```

### 3. **`src/components/premium-badge.tsx`** - UI Components

```typescript
<PremiumBadge showUpgradeButton={true} size="md" />
<PremiumStatusDisplay />
```

### 4. **`src/lib/api.ts`** - API functions

```typescript
checkParentPremiumStatus(parentId); // Lấy premium status từ API parent
refreshParentPremiumData(parentId); // Refresh data từ API
```

## 🔧 Cách hoạt động

### Dữ liệu từ localStorage

Hệ thống đọc từ `localStorage.getItem('parentData')` với cấu trúc:

```json
{
  "data": {
    "subscriptionType": "premium", // "free" | "premium" | "family"
    "subscriptionExpiry": "2025-07-26T07:33:06.546Z",
    "isPremium": true
  }
}
```

### Logic kiểm tra Premium

1. **Free courses**: Luôn có thể truy cập
2. **Premium courses**: Cần kiểm tra:
   - `subscriptionType` = "premium" hoặc "family"
   - `subscriptionExpiry` > current date (nếu có)
   - `isPremium` = true

## 🚀 Cách sử dụng

### Trong React Components:

#### Option 1: Sử dụng Hook

```typescript
import { usePremium } from "@/hooks/usePremium";

function CourseCard({ course }) {
  const { isPremium, canAccessCourse } = usePremium();

  const canAccess = canAccessCourse(course.isPremium);

  return (
    <div>
      {canAccess ? (
        <Button>Bắt đầu học</Button>
      ) : (
        <Button onClick={() => redirectToPremiumUpgrade()}>
          Nâng cấp Premium
        </Button>
      )}
    </div>
  );
}
```

#### Option 2: Sử dụng Utility Functions

```typescript
import { canAccessCourse, checkCourseAccess } from "@/utils/premium";

function CourseDetail({ course }) {
  const canAccess = canAccessCourse(course);
  const accessInfo = checkCourseAccess(course);

  return (
    <div>
      <p>{accessInfo.message}</p>
      <Button>{accessInfo.actionText}</Button>
    </div>
  );
}
```

#### Option 3: Sử dụng Component

```typescript
import { PremiumBadge } from "@/components/premium-badge";

function Header() {
  return (
    <div>
      <PremiumBadge showUpgradeButton={true} />
    </div>
  );
}
```

## 📊 Đã cập nhật các trang:

### ✅ Trang đã implement:

- `src/app/parent/courses/[id]/page.tsx` - Course detail với premium check
- `src/app/environment-kid/kid-learning-zone/[kidId]/courses/page.tsx` - Kid courses với premium logic

### 🔄 Có thể áp dụng thêm:

- `src/app/parent/courses/page.tsx` - Parent courses listing
- `src/app/kid/courses/page.tsx` - Kid courses listing
- Các trang course detail khác

## 🎨 UI/UX Premium

### Premium Badge Styles:

- **Free**: Xám với icon User
- **Premium**: Vàng với icon Crown
- **Expired**: Đỏ với cảnh báo

### Course Card Indicators:

- **Free Course**: Hiển thị "Miễn phí" màu xanh
- **Premium Accessible**: Hiển thị "Có quyền truy cập" với checkmark
- **Premium Restricted**: Hiển thị "Cần Premium" với lock icon + nút upgrade

## 🛠️ Maintenance

### Khi thay đổi premium status:

1. Update localStorage `parentData`
2. Hoặc gọi `refreshParentPremiumData(parentId)` để lấy data mới từ API
3. UI sẽ tự động cập nhật nhờ reactive hooks

### Debug:

```javascript
// Kiểm tra premium status hiện tại
console.log(hasParentPremiumAccess());
console.log(getPremiumStatusInfo());
```

## ✨ Tính năng chính

✅ **Tự động kiểm tra expiry date**  
✅ **Support multiple subscription types**  
✅ **Reactive UI updates**  
✅ **Graceful fallback cho free users**  
✅ **Consistent premium indicators**  
✅ **Easy upgrade flow**

---

**Tóm tắt**: Hệ thống đã hoàn chỉnh và sẵn sàng sử dụng! Chỉ cần import và sử dụng các functions/hooks/components đã tạo.
