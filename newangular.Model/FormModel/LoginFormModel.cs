using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace newangular.Model.FormModel
{
    public class LoginFormModel
    {
        [Key]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        [BsonElement("Email"), BsonRepresentation(BsonType.String)]
        public string? Email { get; set; }

        [BsonElement("Password"), BsonRepresentation(BsonType.String)]
        public string? Password { get; set; }

        [BsonElement("IsConsent")]
        [BsonRepresentation(BsonType.Boolean)]
        public bool IsConsent { get; set; } = true;
    }
}
