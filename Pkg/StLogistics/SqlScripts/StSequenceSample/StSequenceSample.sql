IF NOT EXISTS(SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[StLogisticSequence]') and type = 'SO')
CREATE SEQUENCE dbo.StLogisticSequence
	AS bigint 
	START WITH 1
	INCREMENT BY 1
	NO MINVALUE
	NO MAXVALUE
	NO CYCLE;
GO