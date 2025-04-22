# Stage 0: Base stage cho cả Development và Production
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS base
WORKDIR /app
COPY ["HistoryLearningApi.sln", "."]
COPY ["Src/Presentation/Presentation.csproj", "Src/Presentation/"]
COPY ["Src/Application/", "Src/Application/"]
COPY ["Src/Infrastructure/", "Src/Infrastructure/"]
COPY ["Src/Core/", "Src/Core/"]
COPY ["Src/Shared/", "Src/Shared/"]
RUN dotnet restore "Src/Presentation/Presentation.csproj" --source https://api.nuget.org/v3/index.json
COPY Src/ Src/

# Stage 1: Development stage
FROM base AS development
WORKDIR /app/Src/Presentation
ENTRYPOINT ["dotnet", "run", "--project", "Presentation.csproj"]

# Stage 2: Production build stage
FROM base AS build
WORKDIR /app/Src/Presentation
RUN dotnet build "Presentation.csproj" -c Release -o /app/build

# Stage 3: Production publish stage
FROM build AS publish
RUN dotnet publish "Presentation.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Stage 4: Production final stage
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS production
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Presentation.dll"]