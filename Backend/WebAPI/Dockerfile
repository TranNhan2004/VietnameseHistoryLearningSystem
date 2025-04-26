FROM openjdk:25-slim-bullseye
RUN apt-get update && apt-get install -y --no-install-recommends \
    apt-utils \
    && apt-get install -y maven \
    && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY ./pom.xml .
COPY ./src ./src
RUN mvn clean package -DskipTests
EXPOSE 9000
CMD ["java", "-jar", "target/WebAPI-0.0.1-SNAPSHOT.jar"]