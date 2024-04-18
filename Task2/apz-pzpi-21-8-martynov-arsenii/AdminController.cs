using MongoDB.Driver;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using Microsoft.AspNetCore.Authorization;

//[Authorize(Roles = "admin")]
[Route("api/admin")]
[ApiController]
public class AdminController : ControllerBase
{
    private readonly IMongoCollection<AdminUser> _usersCollection;

    public AdminController(IMongoClient client)
    {
        var database = client.GetDatabase("ChildClimaCare");
        _usersCollection = database.GetCollection<AdminUser>("User");
    }

    [HttpGet("Users")]
    public async Task<ActionResult<List<AdminUser>>> GetAllUsers()
    {
        var users = await _usersCollection.Find(_ => true).ToListAsync();
        return users;
    }

    [HttpDelete("Users/{id:length(24)}")]
    public async Task<IActionResult> DeleteUser(string id)
    {
        var filter = Builders<AdminUser>.Filter.Eq(u => u.Id, id);
        var result = await _usersCollection.DeleteOneAsync(filter);

        if (result.DeletedCount == 0)
        {
            return NotFound("Користувача з таким ID не знайдено.");
        }

        return Ok("Користувача успішно видалено.");
    }

    [HttpPut("Users/{id:length(24)}")]
    public async Task<IActionResult> UpdateUser(string id, [FromBody] AdminUserUpdateModel adminUserUpdateModel)
    {
        var filter = Builders<AdminUser>.Filter.Eq(u => u.Id, id);
        var update = Builders<AdminUser>.Update
            .Set(u => u.Username, adminUserUpdateModel.Username)
            .Set(u => u.FirstName, adminUserUpdateModel.FirstName)
            .Set(u => u.LastName, adminUserUpdateModel.LastName)
            .Set(u => u.Email, adminUserUpdateModel.Email)
            .Set(u => u.Phone, adminUserUpdateModel.Phone)
            .Set(u => u.Role, adminUserUpdateModel.Role)
            .Set(u => u.Status, adminUserUpdateModel.Status);

        var result = await _usersCollection.UpdateOneAsync(filter, update);

        if (result.ModifiedCount == 0)
        {
            return NotFound("Користувача з таким ID не знайдено.");
        }

        return Ok("Інформація про користувача оновлена успішно.");
    }

    // Додайте тут інші методи API...
}

public class AdminUser
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; }

    public string Username { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }
    // Пароль не повинен бути відображений у відповіді API
    public string Password { get; set; }
    public string Phone { get; set; }
    public string Role { get; set; }
    public string Status { get; set; }
}

public class AdminUserUpdateModel
{
    public string Username { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }
    public string Phone { get; set; }
    public string Role { get; set; }
    public string Status { get; set; }
}