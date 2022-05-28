USE [luxury_restaurant]
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[luxury_product](
	[Id] [uniqueidentifier] NOT NULL,
	[Name] [varchar](100) NOT NULL,
	[BrandId] [int] NOT NULL,
	[RestaurantId] [uniqueidentifier] NOT NULL,
	[CategoryId] [int] NOT NULL,
	[ExpirationDate] DATE,
	[Price] DECIMAL(10,2) NOT NULL,
	[Amount] int,
	FOREIGN KEY ([BrandId]) REFERENCES [dbo].[luxury_brands](Id),
	FOREIGN KEY ([CategoryId]) REFERENCES [dbo].[luxury_category](Id),
	FOREIGN KEY ([RestaurantId]) REFERENCES [dbo].[luxury_restaurant](Id),
 CONSTRAINT [PK_Product_Id] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO