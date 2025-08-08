export const chatHistoryMessages = {
  // Errors
  TITLE__REQUIRED: 'Tiêu đề là bắt buộc.',
  LEARNER_ID__REQUIRED: 'ID người học là bắt buộc.',
  TITLE__TOO_LONG: 'Tiêu đề quá dài.',

  // Success
  DELETE__SUCCESS: 'Xóa lịch sử trò chuyện thành công.',

  CHAT_HISTORY__NOT_FOUND: 'Không tìm thấy lịch sử chat với ID tương ứng.',
};

export const chatQAMessages = {
  QUESTION__REQUIRED: 'Câu hỏi là bắt buộc.',
  CHAT_QA__NOT_FOUND:
    'Không tìm thấy câu hỏi và câu trả lời trong chat với ID tương ứng.',
};

export const chatBotConfigMessages = {
  ICR_TOP_K__REQUIRED: 'Top-k ngữ cảnh trong không được bỏ trống',
  ICR_TOP_K__IS_INTEGER: 'Top-k ngữ cảnh trong phải là số nguyên',
  ICR_TOP_K__MIN_1: 'Top-k ngữ cảnh trong phải lớn hơn hoặc bằng 1',

  OCR_TOP_K__REQUIRED: 'Top-k ngữ cảnh ngoài không được bỏ trống',
  OCR_TOP_K__IS_INTEGER: 'Top-k ngữ cảnh ngoài phải là số nguyên',
  OCR_TOP_K__MIN_1: 'Top-k ngữ cảnh ngoài phải lớn hơn hoặc bằng 1',

  MAX_PDF_WORDS__REQUIRED: 'Số từ tối đa PDF không được bỏ trống',
  MAX_PDF_WORDS__IS_INTEGER: 'Số từ tối đa PDF phải là số nguyên',
  MAX_PDF_WORDS__MIN_1: 'Số từ tối đa PDF phải lớn hơn hoặc bằng 1',

  FC_ALPHA__REQUIRED: 'Alpha không được bỏ trống',
  FC_ALPHA__ZERO_ONE: 'Alpha phải nằm trong khoảng 0 đến 1',

  FC_TOP_K__REQUIRED: 'Top-k ngữ cảnh sau lọc không được bỏ trống',
  FC_TOP_K__IS_INTEGER: 'Top-k ngữ cảnh sau lọc phải là số nguyên',
  FC_TOP_K__MIN_1: 'Top-k ngữ cảnh sau lọc phải lớn hơn hoặc bằng 1',

  FC_MIN_THRESHOLD__REQUIRED: 'Ngưỡng tối thiểu sau lọc không được bỏ trống',
  FC_MIN_THRESHOLD__ZERO_ONE:
    'Ngưỡng tối thiểu sau lọc phải nằm trong khoảng 0 đến 1',

  AG_MAX_TOKENS__REQUIRED: 'Số token tối đa không được bỏ trống',
  AG_MAX_TOKENS__IS_INTEGER: 'Số token tối đa phải là số nguyên',
  AG_MAX_TOKENS__MIN_1: 'Số token tối đa phải lớn hơn hoặc bằng 1',

  AG_TEMPERATURE__REQUIRED: 'Temperature không được bỏ trống',

  AG_TOP_P__REQUIRED: 'Top-p không được bỏ trống',
  AG_TOP_P__MIN_0: 'Top-p phải lớn hơn hoặc bằng 0.1',

  AG_REPEAT_PENALTY__REQUIRED: 'Hệ số phạt lặp lại không được bỏ trống',

  SET_CONFIG__FAILED: 'Đã xảy ra lỗi khi thiết lập cấu hình cho chatbot',

  SET_CONFIG__SUCCESS: 'Thiết lập cấu hình cho chatbot thành công',
};
