# Sử dụng image OpenJDK 24 làm base image
FROM openjdk:24-jdk

# Thiết lập thư mục làm việc trong container
WORKDIR /app

# Sao chép file build (jar) từ project vào container
COPY target/*.jar app.jar

# Mở port mà ứng dụng Spring Boot sử dụng (mặc định 8080)
EXPOSE 8080

# Lệnh chạy ứng dụng Spring Boot
ENTRYPOINT ["java", "-jar", "app.jar"]