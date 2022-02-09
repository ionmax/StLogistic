using System;
using Terrasoft.Core;
using Terrasoft.Core.Entities;
using Terrasoft.Core.Entities.Events;
using Terrasoft.Core.DB;
using Terrasoft.Common;

[EntityEventListener(SchemaName = "StVoyage")]
public class StVoyageEntityEventListener : BaseEntityEventListener
{
	private Guid oldTransportId;
	private decimal oldDistance;

	public override void OnSaving(object sender, EntityBeforeEventArgs e)
	{
		base.OnSaving(sender, e);

		var entity = (Entity)sender;
		oldTransportId = entity.GetTypedOldColumnValue<Guid>("StTransportId");
		oldDistance = entity.GetTypedOldColumnValue<decimal>("StDistance");
	}

	private void RunProcedure(Guid transportId, UserConnection userConnection)
	{
		var storedProcedure = new StoredProcedure(userConnection, "tsp_SetMileageToTransportByVoyageDistance");
		storedProcedure.WithParameter(transportId);
		using (var dbExecutor = userConnection.EnsureDBConnection())
		{
			try
			{
				dbExecutor.CommandTimeout = 0;
				dbExecutor.StartTransaction();
				storedProcedure.Execute(dbExecutor);
				dbExecutor.CommitTransaction();
			}
			catch
			{
				dbExecutor.RollbackTransaction();
			}
		}
	}

	private decimal GetVoyageMileageSum(Guid transportId, UserConnection userConnection)
    {
		var esq = new EntitySchemaQuery(userConnection.EntitySchemaManager, "StVoyage");

		esq.Filters.Add(esq.CreateFilterWithParameters(FilterComparisonType.Equal, "StTransport", transportId));
		string colName = esq.AddColumn(esq.CreateAggregationFunction(AggregationTypeStrict.Sum, "StDistance")).Name;

		var entity = esq.GetEntityCollection(userConnection)[0];

		return entity.GetTypedColumnValue<decimal>(colName);
    }

    private void UpdateTransportMileage(Guid transportId, UserConnection userConnection)
    {
        var esqVoyage = new EntitySchemaQuery(userConnection.EntitySchemaManager, "StTransport");
		esqVoyage.AddAllSchemaColumns();

		decimal sum = GetVoyageMileageSum(transportId, userConnection);
		var entity = esqVoyage.GetEntity(userConnection, transportId);

		entity.SetColumnValue("StMileage", sum);
		entity.Save();
    }

	public override void OnSaved(object sender, EntityAfterEventArgs e)
	{
		base.OnSaved(sender, e);

		var entity = (Entity)sender;
		var userConnection = entity.UserConnection;

		var newTransportId = entity.GetTypedColumnValue<Guid>("StTransportId");
		var newDistance = entity.GetTypedColumnValue<decimal>("StDistance");

		if (oldTransportId != newTransportId)
		{
			UpdateTransportMileage(newTransportId, userConnection);
			UpdateTransportMileage(oldTransportId, userConnection);
		}
		else if (oldDistance != newDistance)
		{
			UpdateTransportMileage(newTransportId, userConnection);
		}
	}
}