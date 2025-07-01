const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8386';

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
// Lấy danh sách giao dịch (transaction) có thể lọc theo tháng/năm
export async function getAllTransactions(page: number = 1, limit: number = 10, month?: number, year?: number) {
    try {
        let url = `${API_URL}/api/transactions?page=${page}&limit=${limit}`;
        if (month && year) {
            url += `&month=${month}&year=${year}`;
        }
        const response = await fetch(url, {
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
        console.error('Lỗi khi lấy danh sách giao dịch:', error);
        if (error instanceof TypeError && error.message.includes('fetch')) {
            throw new Error('Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng và đảm bảo server đang chạy.');
        }
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error('Đã xảy ra lỗi khi lấy danh sách giao dịch');
    }
}

// Lấy tổng số giao dịch (dựa vào length của mảng transactions)
export async function getAllTransactionsCount() {
    try {
        const response = await fetch(`${API_URL}/api/transactions?page=1&limit=1`, {
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
        // Đếm số lượng giao dịch trong mảng transactions
        return Array.isArray(data?.data?.transactions) ? data.data.transactions.length : 0;
    } catch (error) {
        console.error('Lỗi khi lấy tổng số giao dịch:', error);
        if (error instanceof TypeError && error.message.includes('fetch')) {
            throw new Error('Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng và đảm bảo server đang chạy.');
        }
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error('Đã xảy ra lỗi khi lấy tổng số giao dịch');
    }
}

// Lấy danh sách tất cả khóa học
export async function getAllCourses() {
    try {
        const response = await fetch(`${API_URL}/api/courses`, {
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
        console.error('Lỗi khi lấy danh sách khóa học:', error);
        throw new Error('Đã xảy ra lỗi khi lấy danh sách khóa học');
    }
}

// Lấy review theo courseId
export async function getReviewsByCourseId(courseId: string, page: number = 1, limit: number = 10, sortBy: string = 'star', sortOrder: string = 'asc') {
    try {
        const response = await fetch(`${API_URL}/api/reviews/course/${courseId}?page=${page}&limit=${limit}&sortBy=${sortBy}&sortOrder=${sortOrder}`, {
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
        console.error('Lỗi khi lấy review theo courseId:', error);
        throw new Error('Đã xảy ra lỗi khi lấy review theo courseId');
    }
}

export async function updateCourseReview(reviewId: string, reviewData: {
    star?: number;
    content?: string;
  }) {
    try {
      const response = await fetch(`${API_URL}/api/reviews/${reviewId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData),
        credentials: 'include',
      });
  
      if (!response.ok) {
        const errorMessage = await handleErrorResponse(response);
        throw new Error(errorMessage);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error updating course review:', error);
  
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng.');
      }
  
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Đã xảy ra lỗi khi cập nhật đánh giá khóa học');
    }
  }
  
  export async function deleteCourseReview(reviewId: string) {
    try {
      const response = await fetch(`${API_URL}/api/reviews/${reviewId}`, {
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
      console.error('Error deleting course review:', error);
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng.');
      }
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Đã xảy ra lỗi khi xóa đánh giá khóa học');
    }
  }