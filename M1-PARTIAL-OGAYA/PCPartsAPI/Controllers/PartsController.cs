using Microsoft.AspNetCore.Mvc;
using PCPartsLibrary.Data;
using PCPartsLibrary.Models;
using System.Data;
using System.Data.SqlClient;

namespace PCPartsWebApp.Controllers
{

    public class PartsController : Controller
    {
        private ISqlData _sql;
        private readonly IConfiguration _configuration;

        public PartsController(ISqlData sql, IConfiguration configuration)
        {
            _sql = sql;
            _configuration = configuration;
        }

        public IActionResult Index()
        {
            return View();
        }


        [HttpPost]
        [Route("/api/[controller]/CreateData")]
        public ActionResult AddParts([FromBody] items parts)
        {
            if (parts == null)
            {
                return BadRequest();
            }
            _sql.CreateData(parts.tableName, parts.Name, parts.Code, parts.Brand, parts.UnitPrice);
            return Ok(new
            {
                Message = "Parts registered!"
            });
        }

        /*[HttpGet]
        [Route("/api/[controller]/ReadData")]
        public ActionResult<IEnumerable<dynamic>> GetParts(string tableName = null, string search = null, string brand = null, decimal? minPrice = null, decimal? maxPrice = null)
        {
            var parts = _sql.ReadData(tableName, search, brand, minPrice, maxPrice);
            return Ok(parts);
        }*/




        [HttpGet]
        [Route("/api/[controller]/ReadData")]
        public JsonResult SearchParts(string search = null, 
            string category = null, 
            string brand = null, decimal? 
            minPrice = null, decimal? 
            maxPrice = null)
        {
            string sqlDataSource = _configuration.GetConnectionString("SqlDb");
            using (SqlConnection conn = new SqlConnection(sqlDataSource))
            {
                conn.Open();
                using (SqlCommand cmd = new SqlCommand("dbo.spParts_ReadData", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@SearchString", string.IsNullOrEmpty(search) ? (object)DBNull.Value : search.ToLower());
                    cmd.Parameters.AddWithValue("@Category", string.IsNullOrEmpty(category) ? (object)DBNull.Value : category.ToLower());
                    cmd.Parameters.AddWithValue("@Brand", string.IsNullOrEmpty(brand) ? (object)DBNull.Value : brand.ToLower());
                    cmd.Parameters.AddWithValue("@MinPrice", minPrice.HasValue ? minPrice.Value : (object)DBNull.Value);
                    cmd.Parameters.AddWithValue("@MaxPrice", maxPrice.HasValue ? maxPrice.Value : (object)DBNull.Value);
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        DataTable dataTable = new DataTable();
                        dataTable.Load(reader);
                        return new JsonResult(dataTable);
                    }
                }
            }
        }


        [HttpPut]
        [Route("/api/[controller]/UpdateData")]
        public ActionResult UpdateParts([FromBody] items parts)
        {
            if (parts == null)
            {
                return BadRequest();
            }
            try
            {
                _sql.UpdateData(parts.tableName, parts.Id, parts.Name, parts.Code, parts.Brand, parts.UnitPrice);
                return Ok(new
                {
                    Message = "Parts updated!"
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    Message = $"Error updating parts: {ex.Message}"
                });
            }
        }

        [HttpDelete]
        [Route("/api/[controller]/DeleteData")]
        public ActionResult DeleteParts([FromBody] items parts)
        {
            if (parts == null)
            {
                return BadRequest();
            }
            _sql.DeleteData(parts.tableName, parts.Id);
            return Ok(new
            {
                Message = "Parts deleted!"
            });
        }


        //newly added code
        [HttpGet]
        [Route("/api/[controller]/BuildPrice")]
        public JsonResult Build(int? caseId, int? fanId, int? cpuId, int? gpuId, int? ramId, int? moboId, int? psuId, int? ssdId)
        {
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("SqlDb");
            string[] tableNames = { "CASES", "FANS", "CPU", "GPU", "RAM", "MOBO", "PSU", "SSD" };
            using (SqlConnection mycon = new SqlConnection(sqlDataSource))
            {
                mycon.Open();
                using (SqlCommand myCommand = new SqlCommand("dbo.spParts_Build", mycon))
                {
                    myCommand.CommandType = CommandType.StoredProcedure;
                    myCommand.Parameters.AddWithValue("@CaseId", caseId);
                    myCommand.Parameters.AddWithValue("@FanId", fanId);
                    myCommand.Parameters.AddWithValue("@CpuId", cpuId);
                    myCommand.Parameters.AddWithValue("@GpuId", gpuId);
                    myCommand.Parameters.AddWithValue("@RamId", ramId);
                    myCommand.Parameters.AddWithValue("@MoboId", moboId);
                    myCommand.Parameters.AddWithValue("@PsuId", psuId);
                    myCommand.Parameters.AddWithValue("@SsdId", ssdId);

                    SqlParameter totalParam = new SqlParameter("@TotalPrice", SqlDbType.Decimal);
                    totalParam.Direction = ParameterDirection.Output;
                    totalParam.Precision = 10;
                    totalParam.Scale = 2;
                    myCommand.Parameters.Add(totalParam);

                    SqlDataReader myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();

                    decimal totalPrice = (decimal)totalParam.Value;

                    using (SqlCommand saveCommand = new SqlCommand("INSERT INTO PC ([PC Part], [Name], [UnitPrice]) VALUES (@PCPart, @Name, @UnitPrice)", mycon))
                    {
                        for (int i = 0; i < table.Rows.Count; i++)
                        {
                            DataRow row = table.Rows[i];
                            string tableName = tableNames[i];
                            saveCommand.Parameters.AddWithValue("@PCPart", $"{tableName}");
                            saveCommand.Parameters.AddWithValue("@Name", row["Name"].ToString());
                            saveCommand.Parameters.AddWithValue("@UnitPrice", row["UnitPrice"].ToString());
                            saveCommand.ExecuteNonQuery();
                            saveCommand.Parameters.Clear();
                        }

                        saveCommand.Parameters.AddWithValue("@PCPart", "COMPLETE BUILD");
                        saveCommand.Parameters.AddWithValue("@Name", "Total Price");
                        saveCommand.Parameters.AddWithValue("@UnitPrice", totalPrice.ToString());
                        saveCommand.ExecuteNonQuery();
                    }

                    mycon.Close();

                    return Json(new { Parts = table, TotalPrice = totalPrice });
                }
            }
        }//

    }
}