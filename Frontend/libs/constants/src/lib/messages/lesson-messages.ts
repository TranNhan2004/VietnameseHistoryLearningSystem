export const historicalPeriodMessages = {
  // Errors
  NAME__REQUIRED: 'Tên thời kỳ là bắt buộc.',
  START_YEAR__REQUIRED: 'Năm bắt đầu là bắt buộc.',
  END_YEAR__REQUIRED: 'Năm kết thúc là bắt buộc.',
  END_YEAR__INVALID: 'Năm kết thúc không hợp lệ.',
  NAME__TOO_LONG: 'Tên thời kỳ quá dài',

  // Success
  CREATE__SUCCESS: 'Tạo thời kỳ lịch sử thành công.',
  UPDATE__SUCCESS: 'Cập nhật thời kỳ lịch sử thành công.',
  DELETE__SUCCESS: 'Xóa thời kỳ lịch sử thành công.',

  HISTORICAL_PERIOD__NOT_FOUND:
    'Không tìm thấy thời kỳ lịch sử với ID tương ứng.',
};

export const lessonMessages = {
  // Errors
  TITLE__REQUIRED: 'Tiêu đề là bắt buộc.',
  LIKES__REQUIRED: 'Số lượt thích là bắt buộc.',
  VIEWS__REQUIRED: 'Số lượt xem là bắt buộc.',
  DESCRIPTION__REQUIRED: 'Mô tả là bắt buộc',
  HISTORIAL_PERIOD_ID__REQUIRED: 'ID thời kỳ lịch sử là bắt buộc.',

  LIKES__INVALID: 'Số lượt thích không hợp lệ.',
  VIEWS__INVALID: 'Số lượt xem không hợp lệ.',

  TITLE__TOO_LONG: 'Tiêu đề quá dài.',
  DESCRIPTION__TOO_LONG: 'Mô tả quá dài.',

  VIDEO_FILE__TOO_BIG: 'File quá lớn! Vui lòng chọn file nhỏ hơn 200MB.',

  VIDEO__UPLOAD_FAILED: 'Đã xảy ra lỗi khi upload video về bài học.',
  VIDEO__DELETE_FAILED: 'Đã xảy ra lỗi khi xóa video về bài học.',

  // Success
  CREATE__SUCCESS: 'Tạo bài học thành công.',
  UPDATE__SUCCESS: 'Cập nhật bài học thành công.',
  DELETE__SUCCESS: 'Xóa bài học thành công.',

  LESSON__NOT_FOUND: 'Không tìm thấy bài học với ID tương ứng.',
};

export const imageMessages = {
  // Errors
  ORDINAL_NUMBER__REQUIRED: 'Số thứ tự là bắt buộc.',
  LESSON_ID__REQUIRED: 'ID bài học là bắt buộc.',

  ORDINAL_NUMBER__INVALID: 'Số thứ tự không hợp lệ.',
  IMAGE__UPLOAD_FAILED: 'Đã xảy ra lỗi khi upload ảnh về bài học.',
  IMAGE__DELETE_FAILED: 'Đã xảy ra lỗi khi xóa ảnh về bài học.',

  // Success
  UPLOAD_IMAGE__SUCCESS: 'Tải ảnh lên thành công.',
  DELETE_IMAGE__SUCCESS: 'Xóa ảnh thành công.',

  IMAGE__NOT_FOUND: 'Không tìm thấy ảnh của bài học với ID tương ứng.',
};

export const paragraphMessages = {
  // Errors
  CONTENT__REQUIRED: 'Nội dung đoạn văn là bắt buộc.',
  ORDINAL_NUMBER__REQUIRED: 'Số thứ tự là bắt buộc.',
  LESSON_ID__REQUIRED: 'ID bài học là bắt buộc.',

  ORDINAL_NUMBER__INVALID: 'Số thứ tự không hợp lệ.',

  // Success
  CREATE__SUCCESS: 'Tạo đoạn văn thành công.',
  UPDATE__SUCCESS: 'Cập nhật đoạn văn thành công.',
  DELETE__SUCCESS: 'Xóa đoạn văn thành công.',

  PARAGRAPH__NOT_FOUND: 'Không tìm thấy đoạn văn của bài học với ID tương ứng.',
};

export const studyProgressMessages = {
  LEARNER_ID__REQUIRED: 'ID người học là bắt buộc.',
  LESSON_ID__REQUIRED: 'ID bài học là bắt buộc.',

  STUDY_PROGRESS__NOT_FOUND: 'Không tìm thấy tiến độ bài học với ID tương ứng.',
};

export const favoriteLessonMessages = {
  // Errors
  LEARNER_ID__REQUIRED: 'ID người học là bắt buộc.',
  LESSON_ID__REQUIRED: 'ID bài học là bắt buộc.',

  // Success
  CREATE__SUCCESS: 'Thêm bài học yêu thích thành công.',
  DELETE__SUCCESS: 'Xóa bài học yêu thích thành công.',

  FAVORITE_LESSON__NOT_FOUND:
    'Không tìm thấy bài học yêu thích với ID tương ứng.',
};

export const learnerLessonAnswerMessages = {
  LEARNER_ID__REQUIRED: 'ID người học là bắt buộc.',
  LESSON_ID__REQUIRED: 'ID bài học là bắt buộc.',
  ANSWER_OPTION_ID__REQUIRED: 'ID đáp án là bắt buộc.',

  LEARNER__LESSON_ANSWER:
    'Không tìm thấy câu trả lời của người dùng cho bài học với ID tương ứng.',
};
