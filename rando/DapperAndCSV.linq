<Query Kind="Program">
  <Connection>
    <ID>54bf9502-9daf-4093-88e8-7177c129999f</ID>
    <NamingServiceVersion>2</NamingServiceVersion>
    <Provider>System.Data.SqlServerCe.4.0</Provider>
    <AttachFileName>&lt;ApplicationData&gt;\LINQPad\DemoDB.sdf</AttachFileName>
    <Persist>true</Persist>
  </Connection>
  <NuGetReference>CsvHelper</NuGetReference>
  <NuGetReference>Dapper</NuGetReference>
  <NuGetReference>Mapster</NuGetReference>
  <Namespace>CsvHelper</Namespace>
  <Namespace>CsvHelper.Configuration</Namespace>
  <Namespace>Dapper</Namespace>
  <Namespace>System.Globalization</Namespace>
  <Namespace>System.Threading.Tasks</Namespace>
  <Namespace>Mapster</Namespace>
  <RuntimeVersion>5.0</RuntimeVersion>
</Query>

async Task Main()
{
	// https://docs.microsoft.com/en-us/sql/samples/adventureworks-install-configure?view=sql-server-ver15&tabs=ssms
	// Streaming CSV: https://stackoverflow.com/q/58829430/1542187
	// TODO: performance monitor

	var fileToCreate = @"F:\samplecsv.csv";

	var connectionString = @"Server=localhost\SQLEXPRESS;Database=master;Trusted_Connection=True;";

	var config = new CsvConfiguration(CultureInfo.InvariantCulture)
	{
		ShouldQuote = (args) => 
		{
			return args.FieldType == typeof(string);
		}
	};
	
	// I don't really like this, but this is how one commonly uses Dapper
	var query = @"SELECT [BusinessEntityID]
      ,[PersonType]      
      ,[Title]
      ,[FirstName]
      ,[MiddleName]
      ,[LastName]
      ,[Suffix]
      ,[EmailPromotion]
      ,[AdditionalContactInfo]
      ,[Demographics]
  FROM [AdventureWorks2019].[Person].[Person]";

	using (var connection = new SqlConnection(connectionString))
	using (var writer = new StreamWriter(fileToCreate))
	using (var csv = new CsvWriter(writer, config))
	{
		var allEvents = connection.Query<PersonDto>(query).Select(pd => pd.Adapt<PersonTo>());	
		await csv.WriteRecordsAsync(allEvents);
	}	
	
}

// You can define other methods, fields, classes and namespaces here
record PersonDto(int BusinessEntityID, string PersonType, string Title, string FirstName, string MiddleName, string LastName, string Suffix, int EmailPromotion, string AdditionalContactInfo, string Demographics);
record PersonTo(int Id, string PersonType, string Title, string FirstName, string MiddleName, string LastName, string Suffix, int EmailPromotion, string AdditionalContactInfo, string Demographics);