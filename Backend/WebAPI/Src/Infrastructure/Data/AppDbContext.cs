using Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Admin> Admins { get; set; }
    public DbSet<AnswerOption> AnswerOptions { get; set; }
    public DbSet<BaseUser> BaseUsers { get; set; }
    public DbSet<ChatHistory> ChatHistories { get; set; }
    public DbSet<ChatQA> ChatQAs { get; set; }
    public DbSet<Comment> Comments { get; set; }
    public DbSet<Contest> Contests { get; set; }
    public DbSet<ContestQuestion> ContestQuestions { get; set; }
    public DbSet<FavoriteLesson> FavoriteLessons { get; set; }
    public DbSet<HasStudied> HasStudieds { get; set; }
    public DbSet<HistoricalPeriod> HistoricalPeriods { get; set; }
    public DbSet<Learner> Learners { get; set; }
    public DbSet<LearnerContestAnswer> LearnerContestAnswers { get; set; }
    public DbSet<LearnerLessonAnswer> LearnerLessonsAnswers { get; set; }
    public DbSet<Lesson> Lessons { get; set; }
    public DbSet<Question> Questions { get; set; }
    public DbSet<Response> Responses { get; set; }
    public DbSet<Result> Results { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);
        base.OnModelCreating(modelBuilder);
    }
}