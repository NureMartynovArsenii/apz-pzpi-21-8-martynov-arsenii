using MongoDB.Driver;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

[Route("api/[controller]")]
[ApiController]
public class RoomsController : ControllerBase
{
    private readonly IMongoCollection<Room> _roomsCollection;

    public RoomsController(IMongoClient client)
    {
        var database = client.GetDatabase("ChildClimaCare");
        _roomsCollection = database.GetCollection<Room>("Rooms");
    }

    [HttpGet]
    public async Task<ActionResult<List<Room>>> GetAllRooms()
    {
        var rooms = await _roomsCollection.Find(_ => true).ToListAsync();
        return rooms;
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Room>> GetRoomById(string id)
    {
        var room = await _roomsCollection.Find(r => r.Id == id).FirstOrDefaultAsync();
        if (room == null)
        {
            return NotFound("Кімната з таким ID не знайдена.");
        }
        return room;
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteRoom(string id)
    {
        var filter = Builders<Room>.Filter.Eq(r => r.Id, id);
        var result = await _roomsCollection.DeleteOneAsync(filter);

        if (result.DeletedCount == 0)
        {
            return NotFound("Кімната з таким ID не знайдена.");
        }

        return Ok("Кімната видалена успішно.");
    }

    [HttpPost]
    public async Task<IActionResult> CreateRoom([FromBody] RoomCreateModel roomCreateModel)
    {
        var room = new Room
        {
            RoomNumber = roomCreateModel.RoomNumber,
            Capacity = roomCreateModel.Capacity,
            GardenId = roomCreateModel.GardenId
        };

        await _roomsCollection.InsertOneAsync(room);
        return CreatedAtAction(nameof(GetRoomById), new { id = room.Id }, room);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateRoom(string id, [FromBody] RoomUpdateModel roomUpdateModel)
    {
        var filter = Builders<Room>.Filter.Eq(r => r.Id, id);
        var update = Builders<Room>.Update
            .Set(r => r.RoomNumber, roomUpdateModel.RoomNumber)
            .Set(r => r.Capacity, roomUpdateModel.Capacity)
            .Set(r => r.GardenId, roomUpdateModel.GardenId);

        var result = await _roomsCollection.UpdateOneAsync(filter, update);

        if (result.ModifiedCount == 0)
        {
            return NotFound("Кімната з таким ID не знайдена.");
        }

        return Ok("Інформація про кімнату оновлена успішно.");
    }
}

public class Room
{
    [BsonId] // Вказує, що це поле є ідентифікатором документа
    [BsonRepresentation(BsonType.ObjectId)] // Вказує, що поле має бути представлене як ObjectId
    public string Id { get; set; }
    public string RoomNumber { get; set; }
    public string Capacity { get; set; }
    public string GardenId { get; set; }
}


public class RoomCreateModel
{
    public string RoomNumber { get; set; }
    public string Capacity { get; set; }
    public string GardenId { get; set; }
}

public class RoomUpdateModel
{
    public string RoomNumber { get; set; }
    public string Capacity { get; set; } // Тепер це рядок
    public string GardenId { get; set; }
}