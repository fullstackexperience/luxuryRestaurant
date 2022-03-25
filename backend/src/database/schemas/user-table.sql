USE [luxury_restaurant]
GO

/****** Object:  Table [dbo].[luxury_user]    Script Date: 3/26/2022 9:59:01 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[luxury_user](
	[Id] [uniqueidentifier] NOT NULL,
	[FirstName] [varchar](100) NOT NULL,
	[LastName] [varchar](100) NOT NULL,
	[DisplayName] [varchar](100) NOT NULL,
	[Email] [varchar](100) NOT NULL,
	[Password] [varchar](300) NOT NULL,
	CONSTRAINT PK_User_Id PRIMARY KEY (Id)
)
GO

