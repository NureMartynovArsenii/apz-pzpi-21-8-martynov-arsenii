using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using MongoDB.Bson;
using MongoDB.Driver;
using System.IO;

var builder = WebApplication.CreateBuilder(args);

// Конфигурация для доступа к appsettings.json
var configuration = new ConfigurationBuilder()
    .SetBasePath(Directory.GetCurrentDirectory())
    .AddJsonFile("appsettings.json")
    .Build();

// Подключение к MongoDB
builder.Services.AddSingleton<IMongoClient>(provider =>
{
    var connectionString = configuration.GetConnectionString("MongoDB");
    return new MongoClient(connectionString);
});

// Подключение к базе данных MongoDB
builder.Services.AddScoped(provider =>
{
    var client = provider.GetRequiredService<IMongoClient>();
    var databaseName = configuration.GetValue<string>("DatabaseSettings:DatabaseName");
    return client.GetDatabase(databaseName);
});

// Добавление контроллера
builder.Services.AddControllers();

var app = builder.Build();

// Добавление маршрута для корневого пути
app.MapGet("/", () => "Hello World!");

// Добавление маршрута для контроллера
app.MapControllers();

app.Run();
