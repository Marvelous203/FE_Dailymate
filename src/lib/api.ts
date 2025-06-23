const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

// Helper function để xử lý lỗi response
async function handleErrorResponse(response: Response) {
  const contentType = response.headers.get('content-type');

  if (contentType && contentType.includes('application/json')) {
    try {
      const errorData = await response.json();
      return errorData.message || 'Đã có lỗi xảy ra';
    } catch {
      return `Lỗi ${response.status}: ${response.statusText}`;
    }
  } else if (contentType && contentType.includes('text/html')) {
    try {
      const htmlText = await response.text();
      // Trích xuất thông báo lỗi từ HTML
      const titleMatch = htmlText.match(/<title>(.*?)<\/title>/i);
      const h1Match = htmlText.match(/<h1[^>]*>(.*?)<\/h1>/i);
      const errorMatch = htmlText.match(/Error:\s*([^<]+)/i);

      if (errorMatch) {
        return errorMatch[1].trim();
      } else if (titleMatch && !titleMatch[1].includes('Error')) {
        return titleMatch[1].trim();
      } else if (h1Match) {
        return h1Match[1].replace(/<[^>]*>/g, '').trim();
      }
      return `Lỗi ${response.status}: ${response.statusText}`;
    } catch {
      return `Lỗi ${response.status}: ${response.statusText}`;
    }
  } else {
    try {
      const text = await response.text();
      return text || `Lỗi ${response.status}: ${response.statusText}`;
    } catch {
      return `Lỗi ${response.status}: ${response.statusText}`;
    }
  }
}

export async function loginUser(email: string, password: string) {
  try {
    const response = await fetch(`${API_URL}/api/auth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
      credentials: 'include',
    });

    if (!response.ok) {
      const errorMessage = await handleErrorResponse(response);
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Login error:', error);

    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng và đảm bảo server đang chạy.');
    }

    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Đã xảy ra lỗi khi đăng nhập');
  }
}

export async function createParent(parentData: {
  email: string;
  password: string;
  fullName: string;
  gender: string;
}) {
  try {
    const response = await fetch(`${API_URL}/api/parent/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(parentData),
      credentials: 'include',
    });

    if (!response.ok) {
      const errorMessage = await handleErrorResponse(response);
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Create parent error:', error);

    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng và đảm bảo server đang chạy.');
    }

    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Đã xảy ra lỗi khi tạo tài khoản phụ huynh');
  }
}

// API function để gửi email xác thực
export async function sendVerificationEmail(email: string, forgotPassword: boolean = false) {
  try {
    const response = await fetch(`${API_URL}/api/auth/send-verification`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        email,
        forgotPassword 
      }),
      credentials: 'include',
    });

    if (!response.ok) {
      const errorMessage = await handleErrorResponse(response);
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Send verification email error:', error);

    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng.');
    }

    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Đã xảy ra lỗi khi gửi email xác thực');
  }
}

// API function để xác thực email
export async function verifyEmail(email: string, verifyCode: string) {
  try {
    const response = await fetch(`${API_URL}/api/auth/verify-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, verifyCode }),
      credentials: 'include',
    });

    if (!response.ok) {
      const errorMessage = await handleErrorResponse(response);
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Verify email error:', error);

    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng.');
    }

    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Đã xảy ra lỗi khi xác thực email');
  }
}

// API function để reset mật khẩu
export async function resetPassword(email: string, verifyCode: string, newPassword: string) {
  try {
    const response = await fetch(`${API_URL}/api/auth/forgot-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, verifyCode, newPassword }),
      credentials: 'include',
    });

    if (!response.ok) {
      const errorMessage = await handleErrorResponse(response);
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Reset password error:', error);

    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng.');
    }

    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Đã xảy ra lỗi khi đặt lại mật khẩu');
  }
}

// Course API functions
export async function getAllCourses(page: number = 1, limit: number = 10) {
  try {
    const response = await fetch(`${API_URL}/api/course/all?page=${page}&limit=${limit}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      const errorMessage = await handleErrorResponse(response);
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Get all courses error:', error);

    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng và đảm bảo server đang chạy.');
    }

    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Đã xảy ra lỗi khi lấy danh sách khóa học');
  }
}

export async function getCourseById(courseId: string) {
  try {
    const response = await fetch(`${API_URL}/api/course/${courseId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      const errorMessage = await handleErrorResponse(response);
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Get course by ID error:', error);

    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng và đảm bảo server đang chạy.');
    }

    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Đã xảy ra lỗi khi lấy thông tin khóa học');
  }
}

export async function updateCourse(courseId: string, courseData: any) {
  try {
    const response = await fetch(`${API_URL}/api/course/${courseId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(courseData),
      credentials: 'include',
    });

    if (!response.ok) {
      const errorMessage = await handleErrorResponse(response);
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Update course error:', error);

    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng và đảm bảo server đang chạy.');
    }

    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Đã xảy ra lỗi khi cập nhật khóa học');
  }
}

export async function createCourse(courseData: any) {
  try {
    const response = await fetch(`${API_URL}/api/course/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(courseData),
      credentials: 'include',
    });

    if (!response.ok) {
      const errorMessage = await handleErrorResponse(response);
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Create course error:', error);

    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng và đảm bảo server đang chạy.');
    }

    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Đã xảy ra lỗi khi tạo khóa học');
  }
}

export async function deleteCourse(courseId: string) {
  try {
    const response = await fetch(`${API_URL}/api/course/${courseId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      const errorMessage = await handleErrorResponse(response);
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Delete course error:', error);

    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng và đảm bảo server đang chạy.');
    }

    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Đã xảy ra lỗi khi xóa khóa học');
  }
}

// API cho lesson
export async function getLessonsByCourse(courseId: string) {
  try {
    const response = await fetch(`${API_URL}/api/lesson/course/${courseId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      const errorMessage = await handleErrorResponse(response);
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Get lessons by course error:', error);

    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng và đảm bảo server đang chạy.');
    }

    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Đã xảy ra lỗi khi lấy danh sách bài học');
  }
}

// API cho test theo lesson
export async function getTestsByLesson(lessonId: string) {
  try {
    const response = await fetch(`${API_URL}/api/test/lesson/${lessonId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      const errorMessage = await handleErrorResponse(response);
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Get tests by lesson error:', error);

    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng và đảm bảo server đang chạy.');
    }

    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Đã xảy ra lỗi khi lấy danh sách bài kiểm tra theo bài học');
  }
}

// API cho test theo course
export async function getTestsByCourse(courseId: string) {
  try {
    const response = await fetch(`${API_URL}/api/test/course/${courseId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      const errorMessage = await handleErrorResponse(response);
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Get tests by course error:', error);

    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng và đảm bảo server đang chạy.');
    }

    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Đã xảy ra lỗi khi lấy danh sách bài kiểm tra theo khóa học');
  }
}

// Get test by ID
export async function getTestById(testId: string) {
  try {
    const response = await fetch(`${API_URL}/api/test/${testId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      const errorMessage = await handleErrorResponse(response);
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Get test by ID error:', error);

    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng và đảm bảo server đang chạy.');
    }

    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Đã xảy ra lỗi khi lấy thông tin bài kiểm tra');
  }
}

// Get lesson by ID
export async function getLessonById(lessonId: string) {
  try {
    const response = await fetch(`${API_URL}/api/lesson/${lessonId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching lesson by ID:', error);
    throw error;
  }
}

// Thêm function để gọi multiple APIs cùng lúc
export async function getCourseWithLessons(courseId: string) {
  try {
    const [courseResponse, lessonsResponse] = await Promise.all([
      fetch(`${API_URL}/api/course/${courseId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      }),
      fetch(`${API_URL}/api/lesson/course/${courseId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      })
    ]);

    if (!courseResponse.ok || !lessonsResponse.ok) {
      const courseError = !courseResponse.ok ? await handleErrorResponse(courseResponse) : null;
      const lessonsError = !lessonsResponse.ok ? await handleErrorResponse(lessonsResponse) : null;
      throw new Error(courseError || lessonsError || 'Lỗi khi tải dữ liệu');
    }

    const [courseData, lessonsData] = await Promise.all([
      courseResponse.json(),
      lessonsResponse.json()
    ]);

    return {
      course: courseData,
      lessons: lessonsData
    };
  } catch (error) {
    console.error('Get course with lessons error:', error);
    throw error;
  }
}

// Function để gọi multiple courses với lessons
export async function getCoursesWithLessons(courseIds: string[]) {
  try {
    const promises = courseIds.map(courseId => 
      Promise.all([
        getCourseById(courseId),
        getLessonsByCourse(courseId)
      ]).then(([course, lessons]) => ({ courseId, course, lessons }))
    );
    
    const results = await Promise.all(promises);
    return results;
  } catch (error) {
    console.error('Get courses with lessons error:', error);
    throw error;
  }
}

// Get parent by ID
export async function getParentById(parentId: string) {
  try {
    const response = await fetch(`${API_URL}/api/parent/${parentId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      const errorMessage = await handleErrorResponse(response);
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Get parent by ID error:', error);
    throw error;
  }
}

// Get kid by ID
export async function getKidById(kidId: string) {
  try {
    const response = await fetch(`${API_URL}/api/kid/${kidId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      const errorMessage = await handleErrorResponse(response);
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Get kid by ID error:', error);
    throw error;
  }
}

// Get kids by parent ID
export async function getKidsByParentId(parentId: string) {
  try {
    const response = await fetch(`${API_URL}/api/kid/parent/${parentId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      const errorMessage = await handleErrorResponse(response);
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Get kids by parent ID error:', error);
    throw error;
  }
}

// Function để gọi tất cả APIs sau khi login thành công
export async function fetchUserDataAfterLogin(parentId: string) {
  try {
    // Đầu tiên gọi API để lấy danh sách kid IDs từ parent ID
    const kidsResponse = await getKidsByParentId(parentId);
    
    // Tạo array các promises để gọi song song
    const promises = [
      getParentById(parentId), // API parent
    ];
    
    // Thêm các API calls cho từng kid nếu có
    if (kidsResponse.data && Array.isArray(kidsResponse.data)) {
      kidsResponse.data.forEach((kid: any) => {
        if (kid._id) {
          promises.push(getKidById(kid._id));
        }
      });
    }
    
    // Gọi tất cả APIs cùng lúc bằng Promise.all
    const results = await Promise.all(promises);
    
    return {
      parent: results[0], // Parent data
      kids: results.slice(1), // Kids data (nếu có)
      kidsInfo: kidsResponse // Thông tin kids từ API đầu tiên
    };
  } catch (error) {
    console.error('Fetch user data after login error:', error);
    throw error;
  }
}

// Function để lấy thông tin kid sau khi đăng nhập
export async function fetchKidDataAfterLogin(kidId: string) {
  try {
    const response = await fetch(`${API_URL}/api/kid/${kidId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      const errorMessage = await handleErrorResponse(response);
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch kid data after login error:', error);
    throw error;
  }
}

// Create kid with parent ID
export async function createKid(kidData: {
  fullName: string;
  dateOfBirth: string;
  gender: string;
  parentId: string;
}) {
  try {
    const response = await fetch(`${API_URL}/api/kid/parent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(kidData),
      credentials: 'include',
    });

    if (!response.ok) {
      const errorMessage = await handleErrorResponse(response);
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Create kid error:', error);
    
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng.');
    }

    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Đã xảy ra lỗi khi tạo hồ sơ con');
  }
}

// Update parent information
export async function updateParent(parentId: string, parentData: {
  fullName?: string;
  phoneNumber?: string;
  address?: string;
  dateOfBirth?: string;
  gender?: string;
  image?: string;
}) {
  try {
    const response = await fetch(`${API_URL}/api/parent/${parentId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(parentData),
      credentials: 'include',
    });

    if (!response.ok) {
      const errorMessage = await handleErrorResponse(response);
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Update parent error:', error);

    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng và đảm bảo server đang chạy.');
    }

    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Đã xảy ra lỗi khi cập nhật thông tin phụ huynh');
  }
}


// Update kid information (for parents)
export async function updateKid(kidId: string, kidData: {
  fullName?: string;
  dateOfBirth?: string;
  gender?: string;
  avatar?: string;
  age?: number;
}) {
  try {
    const response = await fetch(`${API_URL}/api/kid/${kidId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(kidData),
      credentials: 'include',
    });

    if (!response.ok) {
      const errorMessage = await handleErrorResponse(response);
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Update kid error:', error);

    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng và đảm bảo server đang chạy.');
    }

    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Đã xảy ra lỗi khi cập nhật thông tin trẻ em');
  }
}

// Delete kid
export async function deleteKid(kidId: string) {
  try {
    const response = await fetch(`${API_URL}/api/kid/${kidId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      const errorMessage = await handleErrorResponse(response);
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Delete kid error:', error);

    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng và đảm bảo server đang chạy.');
    }

    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Đã xảy ra lỗi khi xóa thông tin trẻ em');
  }
}

// Replace 'any' types with proper interfaces
interface ApiResponse<T = unknown> {
  success: boolean;
  data: T;
  message?: string;
}

interface ErrorResponse {
  success: false;
  error: string;
  message: string;
}

interface ProcessedData {
  [key: string]: unknown;
}

export const handleApiError = (error: Error | ErrorResponse): string => {
  if (error instanceof Error) {
    return error.message;
  }

  return error.message;
}

export const processData = (data: Record<string, unknown>): ProcessedData => {
  return Object.keys(data).reduce((acc, key) => {
    acc[key] = data[key];
    return acc;
  }, {} as ProcessedData);
};

// Payment API functions
export async function createPayment(paymentData: {
  amount: number;
  description: string;
  planType?: string;
}) {
  try {
    console.log('🚀 Creating payment with URL:', `${API_URL}/api/payment/create-link`);
    console.log('📦 Payment data:', paymentData);
    
    const response = await fetch(`${API_URL}/api/payment/create-link`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentData),
      credentials: 'include',
    });

    if (!response.ok) {
      const errorMessage = await handleErrorResponse(response);
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Create payment error:', error);

    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Không thể kết nối đến server thanh toán. Vui lòng kiểm tra kết nối mạng.');
    }

    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Đã xảy ra lỗi khi tạo thanh toán');
  }
}

export async function checkPaymentStatus(orderCode: string) {
  try {
    const response = await fetch(`${API_URL}/api/payment/${orderCode}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      const errorMessage = await handleErrorResponse(response);
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Check payment status error:', error);

    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Không thể kết nối đến server thanh toán. Vui lòng kiểm tra kết nối mạng.');
    }

    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Đã xảy ra lỗi khi kiểm tra trạng thái thanh toán');
  }
}
