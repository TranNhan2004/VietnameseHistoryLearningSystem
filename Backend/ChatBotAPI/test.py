import secrets

# Tạo secret key 32 ký tự ngẫu nhiên
key = secrets.token_urlsafe(32)
print(key)
