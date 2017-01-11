using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Configuration;
using System.Text;
using System.Data.SqlClient;
using System.Diagnostics;
using System.Data;


namespace autocomplete.Controllers
{
    public class RecordSelectController : ApiController
    {
		private const string OltpDbConnectionStringKey = "OperationalDB";
		private static ConnectionStringSettings _connSetting = null;


		public static ConnectionStringSettings ConnectionSetting
		{
			get
			{
				if (_connSetting == null) {
					_connSetting = ConfigurationManager.ConnectionStrings[OltpDbConnectionStringKey];
					if (_connSetting == null) {
						throw new Exception("The connection string was missing: " + OltpDbConnectionStringKey);
					}
				}
				return _connSetting;
			}
		}

        // GET: api/RecordSelect
        public IEnumerable<string> Get()
        {
			StringBuilder sb = new StringBuilder();
			sb.AppendLine("SELECT LogTypeID, DisplayName, Name, ResTypeID, Description ");
			sb.AppendLine("FROM LogTypes");
			sb.AppendLine("WHERE LogTypes.DisplayName LIKE @PATTERN OR LogTypes.Name LIKE @PATTERN OR LogTypes.Description LIKE @PATTERN");
			sb.AppendLine("ORDER BY LogTypes.DisplayName;");

			try {
				string query = sb.ToString();
				using (SqlConnection connection = new SqlConnection(RecordSelectController.ConnectionSetting.ConnectionString)) {
					connection.Open();
					using (SqlCommand command = new SqlCommand(query, connection)) {
						command.Parameters.Add("@PATTERN", SqlDbType.Text);
						command.Parameters["@PATTERN"].Value = "%host%";
						SqlDataReader reader = command.ExecuteReader();
						if (reader.HasRows) {
							while (reader.Read()) {

							}
						}
					}
				}
			}
			catch (Exception ex) {
				throw new Exception("Error loading context IDs", ex);
			}

            return new string[] { "value1", "value2" };
        }

        // GET: api/RecordSelect/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/RecordSelect
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/RecordSelect/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/RecordSelect/5
        public void Delete(int id)
        {

        }
    }
}
