using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PCPartsLibrary.Models
{
    public class items
    {
        public int Id { get; set; }
        public  string tableName { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        public string Brand { get; set; }
        public decimal UnitPrice { get; set; }

    }

}
