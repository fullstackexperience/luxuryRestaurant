USE [luxury_restaurant]
GO

/****** Object:  Table [dbo].[luxury_user]    Script Date: 3/26/2022 9:59:01 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[luxury_user_roles](
	[Id] [uniqueidentifier] NOT NULL,
	[UserId] [uniqueidentifier],
	[RoleId] [int]
	FOREIGN KEY ([UserId]) REFERENCES luxury_user(Id),
	FOREIGN KEY ([RoleId]) REFERENCES luxury_roles(Id),
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[luxury_user_roles] ADD  DEFAULT (newid()) FOR [Id]
GO
