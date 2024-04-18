using MongoDB.Driver;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

[Route("api/[controller]")]
[ApiController]
public class EquipmentController : ControllerBase
{
    private readonly IMongoCollection<Equipment> _equipmentCollection;

    public EquipmentController(IMongoClient client)
    {
        var database = client.GetDatabase("ChildClimaCare");
        _equipmentCollection = database.GetCollection<Equipment>("Equipment");
    }

    [HttpGet]
    public async Task<ActionResult<List<Equipment>>> GetAllEquipment()
    {
        var equipment = await _equipmentCollection.Find(_ => true).ToListAsync();
        return equipment;
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Equipment>> GetEquipmentById(string id)
    {
        var equipment = await _equipmentCollection.Find(e => e.Id == id).FirstOrDefaultAsync();
        if (equipment == null)
        {
            return NotFound("Обладнання з таким ID не знайдено.");
        }
        return equipment;
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteEquipment(string id)
    {
        var filter = Builders<Equipment>.Filter.Eq(e => e.Id, id);
        var result = await _equipmentCollection.DeleteOneAsync(filter);

        if (result.DeletedCount == 0)
        {
            return NotFound("Обладнання з таким ID не знайдено.");
        }

        return Ok("Обладнання видалено успішно.");
    }

    [HttpPost]
    public async Task<IActionResult> CreateEquipment([FromBody] EquipmentCreateModel equipmentCreateModel)
    {
        var equipment = new Equipment
        {
            RoomId = equipmentCreateModel.RoomId,
            Name = equipmentCreateModel.Name,
            Status = equipmentCreateModel.Status
        };

        await _equipmentCollection.InsertOneAsync(equipment);
        return CreatedAtAction(nameof(GetEquipmentById), new { id = equipment.Id }, equipment);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateEquipment(string id, [FromBody] EquipmentUpdateModel equipmentUpdateModel)
    {
        var filter = Builders<Equipment>.Filter.Eq(e => e.Id, id);
        var update = Builders<Equipment>.Update
            .Set(e => e.RoomId, equipmentUpdateModel.RoomId)
            .Set(e => e.Name, equipmentUpdateModel.Name)
            .Set(e => e.Status, equipmentUpdateModel.Status);

        var result = await _equipmentCollection.UpdateOneAsync(filter, update);

        if (result.ModifiedCount == 0)
        {
            return NotFound("Обладнання з таким ID не знайдено.");
        }

        return Ok("Інформація про обладнання оновлена успішно.");
    }

    public class EquipmentUpdateModel
    {
        public string RoomId { get; set; }
        public string Name { get; set; }
        public string Status { get; set; }
    }
}

public class Equipment
{
    [BsonId] // Вказує, що це поле є ідентифікатором документа
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; }
    public string RoomId { get; set; }
    public string Name { get; set; }
    public string Status { get; set; }
}

public class EquipmentCreateModel
{
    public string RoomId { get; set; }
    public string Name { get; set; }
    public string Status { get; set; }
}
