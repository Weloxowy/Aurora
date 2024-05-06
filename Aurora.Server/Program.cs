using Aurora.Server.Models.AspNetUsers;
using FluentMigrator.Runner;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;
using System.Reflection;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Adding CORS headers

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins",
        builder =>
        {
            builder.WithOrigins("https://localhost:5173");
            builder.AllowCredentials();
            builder.AllowAnyHeader();
            builder.AllowAnyMethod();
        });
});

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<DataContext>(options =>
    options.UseSqlServer(
        "Server=localhost\\SQLEXPRESS;Database=Aurora;Integrated Security=SSPI;Application Name=Aurora; TrustServerCertificate=true;"));
builder.Services.AddAuthorization();
builder.Services.AddIdentityApiEndpoints<AspNetUsers>()
    .AddEntityFrameworkStores<DataContext>();

builder.Services.AddFluentMigratorCore() // Move FluentMigrator registration here
    .ConfigureRunner(c =>
    {
        c.AddSqlServer2016()
            .WithGlobalConnectionString("Server=localhost\\SQLEXPRESS;Database=Aurora;Integrated Security=SSPI;Application Name=Aurora; TrustServerCertificate=true;")
            .ScanIn(Assembly.GetExecutingAssembly()).For.All();
    })
    .AddLogging(config => config.AddFluentMigratorConsole());

var app = builder.Build();
app.MapIdentityApi<AspNetUsers>();
using var scope = app.Services.CreateScope();
var migrator = scope.ServiceProvider.GetService<IMigrationRunner>();

if (migrator != null)
{
    migrator.ListMigrations();
    migrator.MigrateUp();
}
else
{
    throw new Exception("Migration fault");
}
app.UseCors("AllowAllOrigins");
app.UseDefaultFiles();
app.UseStaticFiles();
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.MapFallbackToFile("/index.html");
OpenBrowser("https://localhost:5173/");
app.Run();


// Method to open default browser
static void OpenBrowser(string url)
{
    try
    {
        Process.Start(new ProcessStartInfo("cmd", $"/c start {url}") { CreateNoWindow = true });
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Failed to open browser: {ex.Message}");
    }
}

class DataContext : IdentityDbContext<AspNetUsers>
{
    public DataContext(DbContextOptions<DataContext> options) : base(options) { }
}

