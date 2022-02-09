IF NOT EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND OBJECT_ID = OBJECT_ID('dbo.tsp_SetMileageToTransportByVoyageDistance'))
   exec('create procedure [dbo].[tsp_SetMileageToTransportByVoyageDistance] @TransportId uniqueidentifier
	as
	update StTransport
	set StMileage = (select SUM(StDistance) from StVoyage
	where StTransportId = @TransportId
	)
	where Id = @TransportId')
GO