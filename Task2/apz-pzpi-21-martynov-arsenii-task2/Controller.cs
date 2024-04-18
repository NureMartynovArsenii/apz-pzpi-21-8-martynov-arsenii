using MongoDB.Driver;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

[Route("api/[controller]")]
[ApiController]
public class GardensController : ControllerBase
{
    private readonly IMongoCollection<Garden> _gardensCollection;
    private readonly IMongoCollection<User> _usersCollection;

    public GardensController(IMongoClient client)
    {
        var database = client.GetDatabase("ChildClimaCare");
        _gardensCollection = database.GetCollection<Garden>("Gardens");
        _usersCollection = database.GetCollection<User>("User");
    }

    // Оновлений маршрут згідно вашого запиту https://localhost:7077/api/Gardens/Users/661c31820df48587b98e0d6d
    [HttpGet("Users/{gardenId}")]
    public async Task<ActionResult<List<User>>> GetUsersByGarden(string gardenId)
    {
        var garden = await _gardensCollection.Find(g => g.Id == gardenId).FirstOrDefaultAsync();
        if (garden == null)
        {
            return NotFound("Садок не знайдено.");
        }

        var usersIds = garden.Users.Select(u => u.Id).ToList(); // Зверніть увагу на регістр
        var users = await _usersCollection.Find(u => usersIds.Contains(u.Id)).ToListAsync();

        return users;
    }


    [HttpPost]
    public async Task<IActionResult> CreateGarden([FromBody] GardenCreateModel gardenCreateModel)
    {
        var garden = new Garden
        {
            Name = gardenCreateModel.Name,
            Location = gardenCreateModel.Location,
            Director = gardenCreateModel.Director,
            Email = gardenCreateModel.Email,
            Phone = gardenCreateModel.Phone,
            Users = gardenCreateModel.Users
        };

        await _gardensCollection.InsertOneAsync(garden);
        return CreatedAtAction(nameof(GetGarden), new { id = garden.Id }, garden);
    }

    [HttpGet]
    public async Task<ActionResult<List<Garden>>> GetAllGardens()
    {
        var gardens = await _gardensCollection.Find(_ => true).ToListAsync();
        return gardens;
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Garden>> GetGarden(string id)
    {
        var garden = await _gardensCollection.Find(g => g.Id == id).FirstOrDefaultAsync();
        if (garden == null)
        {
            return NotFound();
        }
        return garden;
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateGarden(string id, [FromBody] GardenUpdateModel gardenUpdateModel)
    {
        var filter = Builders<Garden>.Filter.Eq(g => g.Id, id);
        var update = Builders<Garden>.Update
            .Set(g => g.Name, gardenUpdateModel.Name)
            .Set(g => g.Location, gardenUpdateModel.Location)
            .Set(g => g.Director, gardenUpdateModel.Director)
            .Set(g => g.Email, gardenUpdateModel.Email)
            .Set(g => g.Phone, gardenUpdateModel.Phone)
            // Оновлення списку користувачів, якщо він наданий
            .Set(g => g.Users, gardenUpdateModel.Users ?? new List<UserReference>());

        var result = await _gardensCollection.UpdateOneAsync(filter, update);

        if (result.ModifiedCount == 0)
        {
            return NotFound("Садок з таким ID не знайдено.");
        }

        return Ok("Інформація про садок оновлена успішно.");
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteGarden(string id)
    {
        var filter = Builders<Garden>.Filter.Eq(g => g.Id, id);
        var result = await _gardensCollection.DeleteOneAsync(filter);

        if (result.DeletedCount == 0)
        {
            return NotFound("Садок з таким ID не знайдено.");
        }

        return Ok("Садок видалено успішно.");
    }

    
}

public class GardenUpdateModel
{
    public string Name { get; set; }
    public string Location { get; set; }
    public string Director { get; set; }
    public string Email { get; set; }
    public string Phone { get; set; }
    // Список користувачів може бути необов'язковим
    public List<UserReference> Users { get; set; } = new List<UserReference>();
}

public class GardenCreateModel
{
    public string Name { get; set; }
    public string Location { get; set; }
    public string Director { get; set; }
    public string Email { get; set; }
    public string Phone { get; set; }
    // Зробіть список користувачів необов'язковим
    public List<UserReference> Users { get; set; } = new List<UserReference>();
}

public class Garden
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; }
    public string Name { get; set; }
    public string Location { get; set; }
    public string Director { get; set; }
    public string Email { get; set; }
    public string Phone { get; set; }
    public List<UserReference> Users { get; set; }
}

public class UserReference
{
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; }
}

public class User
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; }
    public string Username { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public string Phone { get; set; }
    public string Role { get; set; }
    public string Status { get; set; }
}
