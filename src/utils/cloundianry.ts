interface CloudinaryConfig {
    cloudName: string
    apiKey: string
    apiSecret: string
    uploadPreset: string
  }
  
  const cloudinaryConfig: CloudinaryConfig = {
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || '',
    apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY || '',
    apiSecret: process.env.CLOUDINARY_API_SECRET || '',
    uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || ''
  }
  
  // Validation để đảm bảo tất cả biến môi trường được cung cấp
  if (!cloudinaryConfig.cloudName || !cloudinaryConfig.apiKey || !cloudinaryConfig.uploadPreset) {
    throw new Error('Missing required Cloudinary environment variables. Please check your .env file.')
  }
  
  export default cloudinaryConfig
  