FROM openjdk:25-slim-bullseye
WORKDIR /app
COPY ./pom.xml .
COPY ./src ./src
RUN apt-get update && apt-get install -y --no-install-recommends maven \
    && mvn clean package -DskipTests \
    && apt-get remove -y maven \
    && apt-get autoremove -y \
    && rm -rf /var/lib/apt/lists/* /root/.m2
EXPOSE 9000
CMD ["java", "-jar", "target/WebAPI-0.0.1-SNAPSHOT.jar"]