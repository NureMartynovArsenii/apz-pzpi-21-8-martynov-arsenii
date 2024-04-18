using MongoDB.Driver;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using Microsoft.AspNetCore.Authorization;
using MongoDB.Bson.IO;

[Route("api/[controller]")]
[ApiController]
public class BackupController : ControllerBase
{
    private readonly IMongoClient _mongoClient;
    private readonly string _backupDirectory = "D:\\Жители\\Арсений\\Универ\\3 курс\\АПЗ\\WebApplication2\\WebApplication2\\Backup";

    public BackupController(IMongoClient mongoClient)
    {
        _mongoClient = mongoClient;
    }


    [HttpPost("CreateBackup")]
    public async Task<IActionResult> CreateBackup()
    {
        var timestamp = DateTime.UtcNow.ToString("yyyyMMddHHmmss");
        var backupFolder = Path.Combine(_backupDirectory, $"Backup_{timestamp}");

        if (!Directory.Exists(backupFolder))
        {
            Directory.CreateDirectory(backupFolder);
        }

        try
        {
            // Створення дампу тільки для бази даних ChildClimaCare
            var db = _mongoClient.GetDatabase("ChildClimaCare");
            var collections = await db.ListCollectionNamesAsync();
            await collections.ForEachAsync(async collectionName =>
            {
                var collection = db.GetCollection<BsonDocument>(collectionName);
                var documents = await collection.Find(new BsonDocument()).ToListAsync();
                var backupFilePath = Path.Combine(backupFolder, $"ChildClimaCare_{collectionName}.json");

                // Збереження документів у файл JSON
                await System.IO.File.WriteAllTextAsync(backupFilePath, documents.ToJson(new JsonWriterSettings { Indent = true }));
            });

            return Ok($"Резервне копіювання бази даних ChildClimaCare створено в {backupFolder}");
        }
        catch (Exception ex)
        {
            // У випадку помилки повертаємо повідомлення з описом помилки
            return StatusCode(500, $"Помилка при створенні резервної копії: {ex.Message}");
        }
    }


}
