using PCPartsLibrary.Database;
using PCPartsDataLibrary.Models;

namespace PCPartsLibrary.Data
{
    public class SqlData : ISqlData
    {
        private ISqlDataAccess _db;
        private const string connectionStringName = "SqlDb";
        public SqlData(ISqlDataAccess db)
        {
            _db = db;
        }
        //newly added code
        public UserModel Authenticate(string username, string password)
        {
            UserModel result = _db.LoadData<UserModel, dynamic>("dbo.spUsers_Authenticate", 
            new { username, password }, connectionStringName, true).FirstOrDefault();
            return result;
        }
        public void Register(string username, string firstName, string lastName, string password)
        {
            _db.SaveData<dynamic>(
                    "dbo.spUsers_Register",
                    new { username, firstName, lastName, password },
                    connectionStringName,
                    true);
        }//
        public void CreateData(string tableName, string name, string code, string brand, decimal unitPrice)
        {
            _db.SaveData<dynamic>(
                "dbo.spParts_CreateData",
                new { tableName, name, code, brand, unitPrice },
                connectionStringName,
                true);
        }
        public IEnumerable<dynamic> ReadData(string tableName, 
            string search = null, 
            string brand = null, 
            decimal? minPrice = null, 
            decimal? maxPrice = null)
        {
            var parameters = new
            {
                TableName = tableName,
                SearchString = string.IsNullOrEmpty(search) ? (object)DBNull.Value : search.ToLower(),
                Brand = string.IsNullOrEmpty(brand) ? (object)DBNull.Value : brand.ToLower(),
                MinPrice = minPrice.HasValue ? minPrice.Value : (object)DBNull.Value,
                MaxPrice = maxPrice.HasValue ? maxPrice.Value : (object)DBNull.Value
            };

            var result = _db.LoadData<dynamic, dynamic>(
                "dbo.spParts_ReadData",
                parameters,
                connectionStringName,
                true
            );
            return result;
        }
        public void UpdateData(string tableName, 
            int id, string name, 
            string code, 
            string brand, 
            decimal unitPrice)
        {
            _db.SaveData(
                "dbo.spParts_UpdateData",
                new { tableName, id, name, code, brand, unitPrice },
                connectionStringName,
                true);
        }
        public void DeleteData(string tableName, int id)
        {
            _db.SaveData(
                "dbo.spParts_DeleteData",
                new { tableName, id },
                connectionStringName,
                true);
        }
        //newly added code
        public void Build(string tableName)
        {
            _db.SaveData<dynamic>(
                "dbo.spParts_Build",
                new { tableName },
                connectionStringName,
                true);
        }//
    }
}