using System;
using System.ServiceModel;
using System.ServiceModel.Activation;
using System.ServiceModel.Web;
using System.Web;
using System.Runtime.Serialization;
using Terrasoft.Core;
using Terrasoft.Common;
using Terrasoft.Web.Common;
using Terrasoft.Core.DB;
using Terrasoft.Core.Entities;

namespace StLogisticDriverServiceNamespace
{
	[ServiceContract]
	[AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Required)]
	public class StLogisticDriverService : BaseService
	{
		[OperationContract]
		[WebInvoke(Method = "POST", UriTemplate = "CheckIsDriverBusy",
		RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped, ResponseFormat = WebMessageFormat.Json)]
		public string CheckIsDriverBusy(string voyageNumber, Guid driverId, string startDate, string dueDate)
		{

			DateTime start = DateTime.Parse(startDate);
			DateTime due = DateTime.Parse(dueDate);

			var voyageEsq = new EntitySchemaQuery(UserConnection.EntitySchemaManager, "StVoyage");
			voyageEsq.AddColumn("StNumber");
			string driverColumnName = voyageEsq.AddColumn("StDriver.Name").Name;

			var dateFilters = new EntitySchemaQueryFilterCollection(voyageEsq);
			dateFilters.LogicalOperation = LogicalOperationStrict.Or;
			dateFilters.Add(voyageEsq.CreateFilterWithParameters(FilterComparisonType.Between, "StStartDate", start, due));
			dateFilters.Add(voyageEsq.CreateFilterWithParameters(FilterComparisonType.Between, "StDueDate", start, due));

			var driverFilter = voyageEsq.CreateFilterWithParameters(FilterComparisonType.Equal, "StDriver", driverId);
			var numberFilter = voyageEsq.CreateFilterWithParameters(FilterComparisonType.NotEqual, "StNumber", voyageNumber);

			voyageEsq.Filters.Add(dateFilters);
			voyageEsq.Filters.Add(driverFilter);
			voyageEsq.Filters.Add(numberFilter);

			voyageEsq.RowCount = 1;

			var entities = voyageEsq.GetEntityCollection(UserConnection);
			if (entities.Count == 0)
				return null;

			var entity = entities[0];
			string resultString = "Driver " + entity.GetColumnValue(driverColumnName).ToString() +
			" is busy in voyage " + entity.GetColumnValue("StNumber").ToString();

			return resultString;
		}
		/*
		[DataContract]
		public class VoyageDTO{
			[DataMember]
			public string voyageNumber;
			[DataMember]
			public Guid driverId;
			[DataMember]
			public DateTime startDate;
			[DataMember]
			public DateTime dueDate;
		}*/
	}
}