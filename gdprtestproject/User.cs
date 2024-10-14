using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using System.ComponentModel.DataAnnotations;

namespace NewAngular.Server.Model
{
    public class User
    {
        [Key]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        [BsonElement("FirstName"), BsonRepresentation(BsonType.String)]
        public string? FirstName { get; set; }

        [BsonElement("LastName"), BsonRepresentation(BsonType.String)]
        public string? LastName { get; set; }

        [BsonElement("Email"), BsonRepresentation(BsonType.String)]
        public string? Email { get; set; }

        [BsonElement("Password"),BsonRepresentation(BsonType.String)]
        public string? Password { get; set; }

        [BsonElement("IsConsent")]
        [BsonRepresentation(BsonType.Boolean)]
        public bool IsConsent { get; set; }


    }


}
