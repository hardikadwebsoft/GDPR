using Microsoft.Extensions.Options;
using MongoDB.Driver;
using NewAngular.Server.Model;
using testwebangular.Data;

public class MongoDbService
{
    private readonly IMongoDatabase _database;


    public MongoDbService(IMongoClient mongoClient, IOptions<MongoDbSettings> settings)
    {
        _database = mongoClient.GetDatabase(settings.Value.DatabaseName);
    }

    public IMongoCollection<T> GetCollection<T>(string name)
    {
        return _database.GetCollection<T>(name);
    }
}
