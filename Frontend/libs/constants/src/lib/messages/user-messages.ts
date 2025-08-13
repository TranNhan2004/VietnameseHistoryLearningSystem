export const userMessages = {
  USER_NAME__REQUIRED: 'Tên đăng nhập không được để trống',
  EMAIL__REQUIRED: 'Email không được để trống',
  PASSWORD__REQUIRED: 'Mật khẩu không được để trống',
  EMAIL_OR_USER_NAME__REQUIRED: 'Email/Tên đăng nhập được để trống',
  FIRST_NAME__REQUIRED: 'Tên không được bỏ trống',
  LAST_NAME__REQUIRED: 'Họ không được bỏ trống',
  OLD_PASSWORD__REQUIRED: 'Mật khẩu cũ không được bỏ trống',
  NEW_PASSWORD__REQUIRED: 'Mật khẩu mới không được bỏ trống',
  CONFIRM_PASSWORD__REQUIRED: 'Mật khẩu nhập lại không được bỏ trống',
  CONFIRM_NEW_PASSWORD__REQUIRED: 'Mật khẩu nhập lại không được bỏ trống',
  USER_NAME__ALREADY_EXISTS: 'Tên đăng nhập đã tồn tại',
  EMAIL__ALREADY_EXISTS: 'Email đã tồn tại',

  EMAIL__INVALID: 'Email không hợp lệ',
  USER_NAME__INVALID: 'Tên đăng nhập không hợp lệ',
  PASSWORD__INVALID:
    'Mật khẩu phải chứa ít nhất 1 chữ thường (a-z), 1 chữ hoa (A-Z), 1 chữ số (0-9) và 1 ký tự đặc biệt',
  OLD_PASSWORD__INVALID:
    'Mật khẩu cũ phải chứa ít nhất 1 chữ thường (a-z), 1 chữ hoa (A-Z), 1 chữ số (0-9) và 1 ký tự đặc biệt',
  NEW_PASSWORD__INVALID:
    'Mật khẩu mới phải chứa ít nhất 1 chữ thường (a-z), 1 chữ hoa (A-Z), 1 chữ số (0-9) và 1 ký tự đặc biệt',
  CONFIRM_NEW_PASSWORD__INVALID: 'Mật khẩu nhập lại phải trùng với mật khẩu',
  CONFIRM_PASSWORD__INVALID: 'Mật khẩu nhập lại phải trùng với mật khẩu',
  EMAIL_OR_USER_NAME__INVALID: 'Email/Tên đăng nhập không hợp lệ',

  FIRST_NAME__TOO_LONG: 'Tên quá dài, tối đa 100 ký tự',
  LAST_NAME__TOO_LONG: 'Họ quá dài, tối đa 50 ký tự',

  OLD_PASSWORD__NOT_CORRECT: 'Mật khẩu cũ không đúng',

  NEW_PASSWORD__DUPLICATE: 'Mật khẩu mới không được giống mật khẩu cũ',

  CONFIRM_NEW_PASSWORD__NOT_MATCH:
    'Mật khẩu nhập lại phải khớp với mật khẩu mới',

  USER__NOT_FOUND: 'Không tìm thấy thông tin người dùng',

  AVATAR__UPLOAD_FAILED: 'Đã xảy ra lỗi khi upload avatar.',
  AVATAR__DELETE_FAILED: 'Đã xảy ra lỗi khi xóa avatar.',

  INFO__UPDATE_SUCCESS: 'Cập nhật thông tin tài khoản thành công',
  PASSWORD__UPDATE_SUCCESS: 'Đổi mật khẩu thành công',
  AVATAR__UPLOAD_SUCCESS: 'Upload avatar thành công',
  AVATAR__DELETE_SUCCESS: 'Xoá avatar thành công',
  PASSWORD__RESET_SUCCESS:
    'Đặt lại mật khẩu thành công. Vui lòng đăng nhập lại.',

  CREATE_NEW_ADMIN__SUCCESS: 'Tạo tài khoản quản trị viên mới thành công',
  LOCK__SUCCESS: 'Khóa tài khoản thành công',
  UNLOCK__SUCCESS: 'Mở khóa tài khoản thành công',
};

export const learnerMessages = {
  POINT__REQUIRED: 'Điểm là bắt buộc.',

  POINT__NOT_NEGATIVE: 'Điểm không được âm.',
  BEST_SCORE__NOT_NEGATIVE: 'Điểm cao nhất không được âm.',
  WORST_SCORE__NOT_NEGATIVE: 'Điểm thấp nhất không được âm.',

  LEARNER__NOT_FOUND: 'Không tìm thấy người học với ID tương ứng.',
};

export const adminMessages = {
  UPDATE_ADMIN_LEVEL__SUCCESS: 'Cập nhật cấp bậc quản trị viên thành công',
  ADMIN__NOT_FOUND: 'Không tìm thấy quản trị viên với ID tương ứng.',
};
