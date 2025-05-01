FROM openjdk:25-slim-bullseye
WORKDIR /app
COPY target/WebAPI-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 9000
CMD ["java", "-jar", "app.jar"]