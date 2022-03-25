USE [luxury_restaurant]
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[luxury_state](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY,
	[Name] [varchar](150) NOT NULL
);

GO