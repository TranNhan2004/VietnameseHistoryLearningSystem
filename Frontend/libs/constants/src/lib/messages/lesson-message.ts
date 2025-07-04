export const lessonMessage = {
  // Errors
  TITLE__REQUIRED: 'Tiêu đề là bắt buộc.',
  LIKES__REQUIRED: 'Số lượt thích là bắt buộc.',
  VIEWS__REQUIRED: 'Số lượt xem là bắt buộc.',
  HISTORIAL_PERIOD_ID__REQUIRED: 'ID thời kỳ lịch sử là bắt buộc.',

  LIKES__INVALID: 'Số lượt thích không hợp lệ.',
  VIEWS__INVALID: 'Số lượt xem không hợp lệ.',

  TITLE__TOO_LONG: 'Tiêu đề quá dài.',
  VIDEO_URL__TOO_LONG: 'Đường dẫn video quá dài.',
  DESCRIPTION__TOO_LONG: 'Mô tả quá dài.',

  // Success
  CREATE__SUCCESS: 'Tạo bài học thành công.',
  UPDATE__SUCCESS: 'Cập nhật bài học thành công.',
  DELETE__SUCCESS: 'Xóa bài học thành công.',
};

export const imageMessage = {
  // Errors
  ORDINAL_NUMBER__REQUIRED: 'Số thứ tự là bắt buộc.',
  LESSON_ID__REQUIRED: 'ID bài học là bắt buộc.',

  ORDINAL_NUMBER__INVALID: 'Số thứ tự không hợp lệ.',
  UPLOAD_IMAGE__FAILED: 'Tải ảnh lên thất bại.',
  DELETE_IMAGE__FAILED: 'Xóa ảnh thất bại.',

  // Success
  UPLOAD_IMAGE__SUCCESS: 'Tải ảnh lên thành công.',
  DELETE_IMAGE__SUCCESS: 'Xóa ảnh thành công.',
};

export const paragraphMessage = {
  // Errors
  CONTENT__REQUIRED: 'Nội dung đoạn văn là bắt buộc.',
  ORDINAL_NUMBER__REQUIRED: 'Số thứ tự là bắt buộc.',
  LESSON_ID__REQUIRED: 'ID bài học là bắt buộc.',

  ORDINAL_NUMBER__INVALID: 'Số thứ tự không hợp lệ.',

  // Success
  CREATE__SUCCESS: 'Tạo đoạn văn thành công.',
  UPDATE__SUCCESS: 'Cập nhật đoạn văn thành công.',
  DELETE__SUCCESS: 'Xóa đoạn văn thành công.',
};

export const studyProgressMessage = {
  LEARNER_ID__REQUIRED: 'ID người học là bắt buộc.',
  LESSON_ID__REQUIRED: 'ID bài học là bắt buộc.',
};

export const favoriteLessonMessage = {
  // Errors
  LEARNER_ID__REQUIRED: 'ID người học là bắt buộc.',
  LESSON_ID__REQUIRED: 'ID bài học là bắt buộc.',

  // Success
  CREATE__SUCCESS: 'Thêm bài học yêu thích thành công.',
  DELETE__SUCCESS: 'Xóa bài học yêu thích thành công.',
};
