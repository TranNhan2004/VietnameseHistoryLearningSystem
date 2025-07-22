export const contestMessages = {
  // Errors
  NAME__REQUIRED: 'Tên cuộc thi là bắt buộc',
  QUESTION_NUMBER__REQUIRED: 'Số câu hỏi là bắt buộc.',
  DURATION_IN_MINUTES__REQUIRED: 'Thời lượng (phút) là bắt buộc.',
  START_TIME__REQUIRED: 'Thời gian bắt đầu là bắt buộc.',
  END_TIME__REQUIRED: 'Thời gian kết thúc là bắt buộc.',

  NAME__TOO_LONG: 'Tên cuộc thi quá dài.',
  NAME__UNIQUE: 'Tên cuộc thi là duy nhất',

  QUESTION_NUMBER__INVALID: 'Số câu hỏi không hợp lệ.',
  DURATION_IN_MINUTES__INVALID: 'Thời lượng (phút) không hợp lệ.',
  END_TIME__INVALID: 'Thời gian kết thúc không hợp lệ.',

  // Success
  CREATE__SUCCESS: 'Tạo kỳ thi thành công.',
  UPDATE__SUCCESS: 'Cập nhật kỳ thi thành công.',
  DELETE__SUCCESS: 'Xóa kỳ thi thành công.',

  CONTEST__NOT_FOUND: 'Không tìm thấy cuộc thi với ID tương ứng.',
};

export const contestQuestionMessages = {
  // Errors
  POINT__REQUIRED: 'Điểm số là bắt buộc.',
  POINT_ALLOCATION_RULE__REQUIRED: 'Quy tắc phân bổ điểm là bắt buộc.',
  CONTEST_ID__REQUIRED: 'ID cuộc thi là bắt buộc.',
  QUESTION_ID__REQUIRED: 'ID câu hỏi là bắt buộc.',

  POINT__INVALID: 'Điểm số không hợp lệ.',
  POINT_ALLOCATION_RULE__INVALID: 'Quy tắc phân bổ điểm không hợp lệ.',

  // Success
  CREATE__SUCCESS: 'Thêm câu hỏi vào cuộc thi thành công.',
  UPDATE__SUCCESS: 'Cập nhật câu hỏi trong cuộc thi thành công.',
  DELETE__SUCCESS: 'Xóa câu hỏi khỏi cuộc thi thành công.',

  CONTEST_QUESTION__NOT_FOUND:
    'Không tìm thấy câu hỏi của cuộc thi với ID tương ứng.',
};

export const resultMessages = {
  // Errors
  START_TIME__REQUIRED: 'Thời gian bắt đầu là bắt buộc.',
  END_TIME__REQUIRED: 'Thời gian kết thúc là bắt buộc.',
  CORRECT_ANSWER_NUMBER__REQUIRED: 'Số câu trả lời đúng là bắt buộc.',
  SCORE__REQUIRED: 'Điểm số là bắt buộc.',
  LEARNER_ID__REQUIRED: 'ID người học là bắt buộc.',
  CONTEST_ID__REQUIRED: 'ID cuộc thi là bắt buộc.',

  END_TIME__INVALID: 'Thời gian kết thúc không hợp lệ.',
  CORRECT_ANSWER_NUMBER__INVALID: 'Số câu trả lời đúng không hợp lệ.',
  SCORE__INVALID: 'Điểm số không hợp lệ.',

  // Success
  DELETE__SUCCESS: 'Xóa kết quả thành công.',

  RESULT__NOT_FOUND: 'Không tìm thấy kết quả của cuộc thi với ID tương ứng.',
};

export const resultAnswerMessages = {
  // Errors
  RESULT_ID__REQUIRED: 'ID kết quả là bắt buộc.',
  ANSWER_OPTION_ID__REQUIRED: 'ID đáp án là bắt buộc.',

  RESULT_ANSWER__NOT_FOUND:
    'Không tìm thấy kết quả câu trả lời của cuộc thi với ID tương ứng.',
};
