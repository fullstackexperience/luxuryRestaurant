USE [luxury_restaurant]
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[luxury_restaurant](
	[Id] [uniqueidentifier] NOT NULL,
	[UserId] [uniqueidentifier] NOT NULL,
	[SocialReason] [varchar](100) NOT NULL,
	[FantasyName] [varchar](100) NOT NULL,
	[Cnpj] [varchar](100) NOT NULL,
	[Address1] [varchar](150),
	[Address2] [varchar](150),
	[Address3] [varchar](150),
	[AddressNumber] [varchar](20),
	[City] [varchar](150),
	[StateId] [int],
	FOREIGN KEY ([StateId]) REFERENCES [dbo].[luxury_state](Id),
	FOREIGN KEY ([UserId]) REFERENCES [dbo].[luxury_user](Id),
 CONSTRAINT [PK_Restaurant_Id] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
