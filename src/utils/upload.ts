// import { message } from "antd";

import cloudinaryConfig from "@/utils/cloundianry"
import { toast } from "sonner"



export const handleUploadFile = async (file: File, type: 'video' | 'image' | 'audio') => {
  // Check file size for images
  if (type === 'image' && file.size > 5 * 1024 * 1024) {
    toast.error('Kích thước ảnh tối đa là 5MB.')
    return ''
  }

  // Check file size for videos
  if (type === 'video' && file.size > 100 * 1024 * 1024) {
    toast.error('Kích thước video tối đa là 100MB.')
    return ''
  }

  // Check file type for videos
  if (type === 'video' && !file.type.startsWith('video/')) {
    toast.error('File phải là định dạng video.')
    return ''
  }

  // Check file size for audio
  if (type === 'audio' && file.size > 50 * 1024 * 1024) { // Max 50MB for audio
    toast.error('Kích thước âm thanh tối đa là 50MB.')
    return ''
  }

  // Check file type for audio
  if (type === 'audio' && !file.type.startsWith('audio/')) {
    toast.error('File phải là định dạng âm thanh.')
    return ''
  }

  // Create FormData object for multipart/form-data upload
  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', cloudinaryConfig.uploadPreset)

  // Add video-specific parameters
  if (type === 'video') {
    formData.append('resource_type', 'video')
  }

  // Add audio-specific parameters
  if (type === 'audio') {
    formData.append('resource_type', 'video') // Cloudinary treats audio as video resource type
  }

  const resourceType = type === 'video' || type === 'audio' ? 'video' : 'image'
  const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/${resourceType}/upload`

  try {
    // Use fetch with multipart/form-data
    const response = await fetch(uploadUrl, {
      method: 'POST',
      body: formData
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error('Upload failed with status:', response.status, 'Error data:', errorData)
      toast.error(`Không thể tải lên ${type === 'video' ? 'video' : type === 'audio' ? 'âm thanh' : 'ảnh'}: ${errorData.error?.message || 'Lỗi không xác định'}`)
      return ''
    }

    const data = await response.json()

    // For videos and audio, return the secure URL
    if (type === 'video' || type === 'audio') {
      return data.secure_url
    }

    return data.secure_url
  } catch (error) {
    console.error('Upload error:', error)
    toast.error(`Không thể tải lên ${type === 'video' ? 'video' : type === 'audio' ? 'âm thanh' : 'ảnh'}. Vui lòng thử lại.`)
    return ''
  }
}

export const customUploadHandler = async (
  options: {
    file: File
    onSuccess: (url: string) => void
    onError: () => void
  },
  type: 'video' | 'image' | 'audio',
  setUploading: (value: boolean) => void,
  onSuccessCallback: (type: 'video' | 'image' | 'audio', url: string) => void
) => {
  const { file, onSuccess, onError } = options

  try {
    setUploading(true)

    // Handle file size validation
    const maxSize =
      type === 'video' ? 100 * 1024 * 1024 :
        type === 'audio' ? 50 * 1024 * 1024 : // 50MB for audio
          5 * 1024 * 1024 // 5MB for image

    if (file.size > maxSize) {
      throw new Error(`Kích thước file vượt quá giới hạn ${maxSize / (1024 * 1024)}MB`)
    }

    const url = await handleUploadFile(file, type)
    if (url) {
      onSuccessCallback(type, url)
      onSuccess(url)
      toast.success(`${type === 'video' ? 'Video' : type === 'audio' ? 'Âm thanh' : 'Ảnh'} tải lên thành công`)
    } else {
      throw new Error('Tải lên thất bại')
    }
  } catch (error) {
    console.error('Upload handler error:', error)
    toast.error(error instanceof Error ? error.message : 'Tải lên thất bại')
    onError()
  } finally {
    setUploading(false)
  }
}

export const deleteFileFromCloudinary = async (publicId: string, type: 'video' | 'image' | 'audio') => {
  const resourceType = type === 'video' || type === 'audio' ? 'video' : 'image'
  const deleteUrl = `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/resources/${resourceType}/upload/${publicId}`

  try {
    const response = await fetch(deleteUrl, {
      method: 'DELETE',
      headers: {
        Authorization: `Basic ${btoa(`${cloudinaryConfig.apiKey}:${cloudinaryConfig.apiSecret}`)}`,
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error('Delete failed:', errorData)
      toast.error(`Xóa ${type === 'video' ? 'video' : type === 'audio' ? 'âm thanh' : 'ảnh'} thất bại: ${errorData.error?.message || 'Lỗi không xác định'}`)
      return false
    }

    toast.error(`${type === 'video' ? 'Video' : type === 'audio' ? 'Âm thanh' : 'Ảnh'} đã được xóa thành công`)
    return true
  } catch (error) {
    console.error('Delete error:', error)
    toast.error(`Xóa ${type === 'video' ? 'video' : type === 'audio' ? 'âm thanh' : 'ảnh'} thất bại. Vui lòng thử lại.`)
    return false
  }
}
