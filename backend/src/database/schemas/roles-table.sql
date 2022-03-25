USE [luxury_restaurant]
GO

/****** Object:  Table [dbo].[luxury_user]    Script Date: 3/26/2022 9:59:01 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[luxury_roles](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY,
	[Name] [varchar](50) NOT NULL
);

GO


