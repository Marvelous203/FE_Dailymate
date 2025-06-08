
// Lấy API URL từ environment variable
const API_URL = process.env.NEXT_PUBLIC_API_URL
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
      const errorData = await response.json();
      throw new Error(errorData.message || 'Đăng nhập thất bại');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Login error:', error);
    
    // Xử lý lỗi mạng cụ thể
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
      const errorData = await response.json();
      throw new Error(errorData.message || 'Tạo tài khoản phụ huynh thất bại');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Create parent error:', error);
    
    // Xử lý lỗi mạng cụ thể
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng và đảm bảo server đang chạy.');
    }
    
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Đã xảy ra lỗi khi tạo tài khoản phụ huynh');
  }
}