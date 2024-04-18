using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using MongoDB.Bson;
using MongoDB.Driver;
using System.IO;

var builder = WebApplication.CreateBuilder(args);

// ������������ ��� ������� � appsettings.json
var configuration = new ConfigurationBuilder()
    .SetBasePath(Directory.GetCurrentDirectory())
    .AddJsonFile("appsettings.json")
    .Build();

// ����������� � MongoDB
builder.Services.AddSingleton<IMongoClient>(provider =>
{
    var connectionString = configuration.GetConnectionString("MongoDB");
    return new MongoClient(connectionString);
});

// ����������� � ���� ������ MongoDB
builder.Services.AddScoped(provider =>
{
    var client = provider.GetRequiredService<IMongoClient>();
    var databaseName = configuration.GetValue<string>("DatabaseSettings:DatabaseName");
    return client.GetDatabase(databaseName);
});

// ���������� �����������
builder.Services.AddControllers();

var app = builder.Build();

// ���������� �������� ��� ��������� ����
app.MapGet("/", () => "Hello World!");

// ���������� �������� ��� �����������
app.MapControllers();

app.Run();
