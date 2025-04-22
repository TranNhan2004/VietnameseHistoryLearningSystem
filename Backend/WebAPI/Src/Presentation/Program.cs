using DotNetEnv;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

Env.Load();

var builder = WebApplication.CreateBuilder(args);

var connectionString = Environment.GetEnvironmentVariable("DefaultConnection");
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(connectionString));

// Add AutoMapper
// builder.Services.AddAutoMapper(typeof(Application.Profiles.MappingProfile));

// Add Dependency Injection for Repositories and Services
// builder.Services.AddScoped<Core.Interfaces.ILearnerRepository, Infrastructure.Repositories.LearnerRepository>();
// builder.Services.AddScoped<Core.Interfaces.ILearnerService, Application.Services.LearnerService>();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddAuthorization();
builder.Services.AddControllers();
builder.Services.AddSwaggerGen();

// Program.cs
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", builder =>
    {
        builder.WithOrigins("http://localhost")
               .WithOrigins("http://localhost:4201", "http://localhost:4202")
               .AllowAnyHeader()
               .AllowAnyMethod();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.UseCors("AllowFrontend");

app.Run();