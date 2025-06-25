const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8386';

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

// API cho lesson with improved error handling and retry mechanism
export async function getLessonsByCourse(courseId: string, retryCount: number = 3) {
  let lastError: Error | null = null;
  
  for (let attempt = 1; attempt <= retryCount; attempt++) {
    try {
      console.log(`🔄 Attempt ${attempt}/${retryCount}: Fetching lessons for course ${courseId}`);
      
      // Add timeout to prevent hanging requests
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
      const response = await fetch(`${API_URL}/api/lesson/course/${courseId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorMessage = await handleErrorResponse(response);
        throw new Error(`HTTP ${response.status}: ${errorMessage}`);
      }

      const data = await response.json();
      console.log(`✅ Successfully fetched lessons for course ${courseId}:`, data);
      return data;
      
    } catch (error) {
      lastError = error as Error;
      console.error(`❌ Attempt ${attempt}/${retryCount} failed for course ${courseId}:`, error);

      // Handle specific error types
      if (error instanceof Error) {
        // ECONNRESET, ENOTFOUND, etc.
        if (error.message.includes('ECONNRESET')) {
          console.warn(`🔌 Connection reset detected on attempt ${attempt}. Server may be overloaded.`);
        } else if (error.message.includes('ENOTFOUND')) {
          console.error(`🌐 DNS resolution failed. Check if API_URL is correct: ${API_URL}`);
          break; // Don't retry DNS errors
        } else if (error.message.includes('fetch')) {
          console.warn(`📡 Network fetch error on attempt ${attempt}.`);
        } else if (error.name === 'AbortError') {
          console.warn(`⏰ Request timeout on attempt ${attempt} (>10s).`);
        }
      }

      // Don't retry on the last attempt
      if (attempt === retryCount) {
        break;
      }

      // Wait before retrying (exponential backoff)
      const delay = Math.min(1000 * Math.pow(2, attempt - 1), 5000); // Max 5 seconds
      console.log(`⏳ Waiting ${delay}ms before retry...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  // All attempts failed, throw the last error with improved message
  if (lastError) {
    console.error(`🚫 All ${retryCount} attempts failed for getLessonsByCourse(${courseId})`);
    
    if (lastError.message.includes('ECONNRESET')) {
      throw new Error(`Kết nối bị gián đoạn khi tải danh sách bài học. Server có thể đang quá tải. Vui lòng thử lại sau ít phút.`);
    } else if (lastError.message.includes('ENOTFOUND')) {
      throw new Error(`Không thể kết nối đến server API. Vui lòng kiểm tra kết nối mạng hoặc liên hệ quản trị viên.`);
    } else if (lastError.message.includes('fetch')) {
      throw new Error(`Lỗi kết nối mạng khi tải danh sách bài học. Vui lòng kiểm tra kết nối internet và thử lại.`);
    } else if (lastError.name === 'AbortError') {
      throw new Error(`Yêu cầu tải danh sách bài học quá lâu (>10s). Vui lòng thử lại hoặc kiểm tra kết nối mạng.`);
    } else {
      throw new Error(`Không thể tải danh sách bài học: ${lastError.message}`);
    }
  }
  
  throw new Error('Đã xảy ra lỗi không xác định khi lấy danh sách bài học');
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
  points?: number;
  level?: number;
  unlockedAvatars?: string[];
  streak?: {
    current: number;
    longest: number;
  };
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

// Course Progress API functions - Updated to match actual backend structure
export async function getCourseProgress(kidId: string, courseId: string) {
  try {
    // Use the bulk progress API to find specific course progress
    const progressResponse = await getAllCourseProgressByKidId(kidId);
    
    if (progressResponse?.success && progressResponse.data?.courseProgressList) {
      const courseProgress = progressResponse.data.courseProgressList.find((progress: any) => {
        const currentCourseId = typeof progress.courseId === 'object' 
          ? (progress.courseId._id || progress.courseId.id)
          : progress.courseId;
        return currentCourseId === courseId;
      });
      
      if (courseProgress) {
        console.log('✅ Found course progress:', courseProgress);
        return {
          success: true,
          message: "Course progress found",
          data: courseProgress
        };
      }
    }
    
    // If not found, try to auto-enroll
    console.log('Course progress not found, trying to enroll...');
    try {
      return await enrollInCourse(kidId, courseId);
    } catch (enrollError) {
      console.error('Failed to enroll in course:', enrollError);
      
      // Return fallback data to allow access but indicate not enrolled
      return {
        success: true,
        message: "Course progress not found",
        data: {
          courseId: courseId,
          kidId: kidId,
          status: false,
          testResults: [],
          lessonCompleted: [],
          _id: "not_found",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          __v: 0
        }
      };
    }
  } catch (error) {
    console.error('Get course progress error:', error);
    
    // Return fallback data
    return {
      success: true,
      message: "Using fallback data",
      data: {
        courseId: courseId,
        kidId: kidId,
        status: false,
        testResults: [],
        lessonCompleted: [],
        _id: "fallback_id",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        __v: 0
      }
    };
  }
}

// Get all course progress by kid ID
export async function getAllCourseProgressByKidId(kidId: string) {
  try {
    console.log(`🔍 Fetching all progress for kid: ${kidId}`);
    const response = await fetch(`${API_URL}/api/progress/kid/${kidId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    console.log(`📡 Progress API response status: ${response.status}`);

    if (!response.ok) {
      console.log('❌ All progress endpoint failed, trying individual course checks...');
      
      // If the bulk endpoint fails, we'll try to get enrollment status differently
      // For now, return empty but we'll implement a fallback in the component
      return {
        success: false,
        message: "All progress endpoint not available",
        data: [],
        needsFallback: true
      };
    }

    const data = await response.json();
    console.log('✅ Progress API response data:', data);
    return data;
  } catch (error) {
    console.error('❌ Get all course progress error:', error);
    return {
      success: false,
      message: "Network error or API unavailable",
      data: [],
      needsFallback: true
    };
  }
}

export async function updateCourseProgress(kidId: string, courseId: string, progressData: {
  testResults?: Array<{
    testId: string;
    score: number;
    passed: boolean;
  }>;
  lessonCompleted?: Array<{
    lessonId: string;
  }>;
  status?: boolean;
}) {
  try {
    // First, get the progress record to find the progressId
    const progressResponse = await getAllCourseProgressByKidId(kidId);
    let progressId = null;
    
    if (progressResponse?.success && progressResponse.data?.courseProgressList) {
      const courseProgress = progressResponse.data.courseProgressList.find((progress: any) => {
        const currentCourseId = typeof progress.courseId === 'object' 
          ? (progress.courseId._id || progress.courseId.id)
          : progress.courseId;
        return currentCourseId === courseId;
      });
      
      if (courseProgress) {
        progressId = courseProgress._id;
        console.log('✅ Found progressId:', progressId);
      }
    }
    
    if (!progressId) {
      console.warn('❌ No progressId found for course, cannot update');
      return { success: false, message: 'No progress record found' };
    }

    // Update progress using the correct endpoint: PUT /api/progress/{progressId}
    const response = await fetch(`${API_URL}/api/progress/${progressId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(progressData),
      credentials: 'include',
    });

    if (!response.ok) {
      console.warn('Failed to update progress via API, continuing with local storage only');
      return { success: false, message: 'API update failed, using local storage' };
    }

    const data = await response.json();
    console.log('✅ Progress updated successfully via API:', data);
    return data;
  } catch (error) {
    console.error('Update course progress error:', error);
    // Don't throw error, just log and continue with local storage
    console.warn('Progress update failed, continuing with local storage only');
    return { success: false, message: 'Local storage only' };
  }
}

// Enroll in course API
export async function enrollInCourse(kidId: string, courseId: string) {
  try {
    const response = await fetch(`${API_URL}/api/progress/enroll`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ kidId, courseId }),
      credentials: 'include',
    });

    if (!response.ok) {
      // Handle specific case where kid is already enrolled
      if (response.status === 400) {
        const errorData = await response.json().catch(() => ({}));
        if (errorData.message && errorData.message.includes('already enrolled')) {
          // Return success response if already enrolled
          return {
            success: true,
            message: "Kid is already enrolled in this course",
            data: {
              courseId: courseId,
              kidId: kidId,
              status: false,
              testResults: [],
              lessonCompleted: [],
              _id: "already_enrolled",
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              __v: 0
            }
          };
        }
      }
      
      const errorMessage = await handleErrorResponse(response);
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Enroll in course error:', error);

    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng.');
    }

    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Đã xảy ra lỗi khi đăng ký khóa học');
  }
}

// Helper function to update lesson completion
export async function updateLessonCompletion(kidId: string, courseId: string, lessonId: string) {
  return updateCourseProgress(kidId, courseId, {
    lessonCompleted: [{ lessonId }],
    status: false // Set to true when all lessons in course are completed
  });
}

// Helper function to update test result  
export async function updateTestResult(
  kidId: string, 
  courseId: string, 
  testId: string, 
  score: number, 
  passed: boolean
) {
  return updateCourseProgress(kidId, courseId, {
    testResults: [{ testId, score, passed }]
  });
}

// Submit test result function - uses updateCourseProgress since there's no separate submit endpoint
export async function submitTestResult(kidId: string, courseId: string, lessonId: string, testId: string, testData: {
  score: number;
  totalPoints: number;
  answers: any[];
  timeSpent: number;
  passed: boolean;
}) {
  console.log('submitTestResult: Using updateCourseProgress for test result');
  return updateTestResult(kidId, courseId, testId, testData.score, testData.passed);
}

// Function to update kid points when completing a course
export async function updateKidPointsForCourse(kidId: string, coursePoints: number) {
  try {
    // First get current kid data
    const kidResponse = await getKidById(kidId);
    if (!kidResponse || !kidResponse.success) {
      throw new Error('Không thể lấy thông tin kid');
    }

    const currentKid = kidResponse.data;
    const currentPoints = currentKid.points || 0;
    const newPoints = currentPoints + coursePoints;

    // Calculate new level based on points (every 100 points = 1 level)
    const newLevel = Math.floor(newPoints / 100) + 1;

    // Update kid with new points and level
    const updateResponse = await updateKid(kidId, {
      points: newPoints,
      level: newLevel,
    });

    console.log(`🎉 Updated kid points: ${currentPoints} -> ${newPoints}, Level: ${newLevel}`);
    
    return updateResponse;
  } catch (error) {
    console.error('Error updating kid points:', error);
    throw error;
  }
}

// Function to check if course is completed and award points
export async function checkAndAwardCourseCompletion(kidId: string, courseId: string) {
  try {
    // Import the kid progress utilities
    const { kidLocalStorage } = await import('@/utils/kidProgress');
    
    // Get course progress
    const progressResponse = await getCourseProgress(kidId, courseId);
    if (!progressResponse || !progressResponse.success) {
      return null;
    }

    const progress = progressResponse.data;
    
    // Check if course is completed (status = true)
    if (progress.status === true) {
      // Get course details to find points
      const courseResponse = await getCourseById(courseId);
      if (courseResponse && courseResponse.success) {
        const course = courseResponse.data;
        const coursePoints = course.pointsEarned || course.points || 50; // Default 50 points
        
        // Check if points have already been awarded using our utility function
        if (!kidLocalStorage.hasPointsBeenAwarded(kidId, courseId)) {
          // Award points
          await updateKidPointsForCourse(kidId, coursePoints);
          
          // Mark as awarded using our utility function
          kidLocalStorage.markPointsAwarded(kidId, courseId, {
            courseId: courseId,
            pointsAwarded: coursePoints,
            timestamp: new Date().toISOString(),
            courseName: course.title
          });
          
          console.log(`🏆 Course completed! Awarded ${coursePoints} points for course: ${course.title} to kid: ${kidId}`);
          
          return {
            success: true,
            pointsAwarded: coursePoints,
            courseName: course.title
          };
        } else {
          // Already awarded - log this but don't re-award
          const existingAward = kidLocalStorage.getPointsAwardData(kidId, courseId);
          console.log(`⚠️ Points already awarded for this course:`, existingAward);
          return null;
        }
      }
    }
    
    return null;
  } catch (error) {
    console.error('Error checking course completion:', error);
    return null;
  }
}
