﻿/*
Deployment script for PCPartsDB

This code was generated by a tool.
Changes to this file may cause incorrect behavior and will be lost if
the code is regenerated.
*/

GO
SET ANSI_NULLS, ANSI_PADDING, ANSI_WARNINGS, ARITHABORT, CONCAT_NULL_YIELDS_NULL, QUOTED_IDENTIFIER ON;

SET NUMERIC_ROUNDABORT OFF;


GO
:setvar DatabaseName "PCPartsDB"
:setvar DefaultFilePrefix "PCPartsDB"
:setvar DefaultDataPath "C:\Users\dawor\AppData\Local\Microsoft\Microsoft SQL Server Local DB\Instances\MSSQLLocalDB\"
:setvar DefaultLogPath "C:\Users\dawor\AppData\Local\Microsoft\Microsoft SQL Server Local DB\Instances\MSSQLLocalDB\"

GO
:on error exit
GO
/*
Detect SQLCMD mode and disable script execution if SQLCMD mode is not supported.
To re-enable the script after enabling SQLCMD mode, execute the following:
SET NOEXEC OFF; 
*/
:setvar __IsSqlCmdEnabled "True"
GO
IF N'$(__IsSqlCmdEnabled)' NOT LIKE N'True'
    BEGIN
        PRINT N'SQLCMD mode must be enabled to successfully execute this script.';
        SET NOEXEC ON;
    END


GO
USE [$(DatabaseName)];


GO
PRINT N'Altering Procedure [dbo].[spParts_Build]...';


GO
ALTER PROCEDURE [dbo].[spParts_Build]
  @PCParts NVARCHAR(MAX),
  @Ids NVARCHAR(MAX)
AS
BEGIN
  SET NOCOUNT ON;

  DECLARE @PartTable TABLE ([Name] NVARCHAR(MAX), [UnitPrice] DECIMAL(10, 2));

  DECLARE @PartCount INT;
  DECLARE @CurrentIndex INT;
  DECLARE @CurrentPart NVARCHAR(MAX);
  DECLARE @CurrentId INT;
  DECLARE @TotalPrice DECIMAL(10, 2);

  SET @TotalPrice = 0;
  SET @PartCount = LEN(@PCParts) - LEN(REPLACE(@PCParts, ',', '')) + 1;
  SET @CurrentIndex = 1;

  WHILE @CurrentIndex <= @PartCount
  BEGIN
    SET @CurrentPart = SUBSTRING(@PCParts, CHARINDEX(',', @PCParts + ',',
      CHARINDEX(',', @PCParts + ',', CHARINDEX(',', @PCParts + ',',
      CHARINDEX(',', @PCParts + ',', CHARINDEX(',', @PCParts + ',',
      CHARINDEX(',', @PCParts + ',', 0) + 1) + 1) + 1) + 1) + 1),
      CHARINDEX(',', @PCParts + ',', CHARINDEX(',', @PCParts + ',', CHARINDEX(',', @PCParts + ',',
      CHARINDEX(',', @PCParts + ',', CHARINDEX(',', @PCParts + ',',
      CHARINDEX(',', @PCParts + ',', 0) + 1) + 1) + 1) + 1) + 1) -
      CHARINDEX(',', @PCParts + ',', CHARINDEX(',', @PCParts + ',', CHARINDEX(',', @PCParts + ',',
      CHARINDEX(',', @PCParts + ',', CHARINDEX(',', @PCParts + ',',
      CHARINDEX(',', @PCParts + ',', 0) + 1) + 1) + 1) + 1) + 1));
    SET @CurrentId = CAST(SUBSTRING(@Ids, CHARINDEX(',', @Ids + ',',
      CHARINDEX(',', @Ids + ',', CHARINDEX(',', @Ids + ',', CHARINDEX(',', @Ids + ',',
      CHARINDEX(',', @Ids + ',', CHARINDEX(',', @Ids + ',', 0) + 1) + 1) + 1) + 1) + 1),
      CHARINDEX(',', @Ids + ',', CHARINDEX(',', @Ids + ',', CHARINDEX(',', @Ids + ',',
      CHARINDEX(',', @Ids + ',', CHARINDEX(',', @Ids + ',', 0) + 1) + 1) + 1) + 1) -
      CHARINDEX(',', @Ids + ',', CHARINDEX(',', @Ids + ',', CHARINDEX(',', @Ids + ',',
      CHARINDEX(',', @Ids + ',', CHARINDEX(',', @Ids + ',', 0) + 1) + 1) + 1) + 1) + 1) AS INT);

IF @CurrentPart = 'CASES'
BEGIN
INSERT INTO @PartTable ([Name], [UnitPrice])
SELECT [Name], [UnitPrice] FROM [dbo].[CASES] WHERE [Id] = @CurrentId;
END
ELSE IF @CurrentPart = 'CPU'
BEGIN
INSERT INTO @PartTable ([Name], [UnitPrice])
SELECT [Name], [UnitPrice] FROM [dbo].[CPU] WHERE [Id] = @CurrentId;
END
ELSE IF @CurrentPart = 'FANS'
BEGIN
INSERT INTO @PartTable ([Name], [UnitPrice])
SELECT [Name], [UnitPrice] FROM [dbo].[FANS] WHERE [Id] = @CurrentId;
END
ELSE IF @CurrentPart = 'GPU'
BEGIN
INSERT INTO @PartTable ([Name], [UnitPrice])
SELECT [Name], [UnitPrice] FROM [dbo].[GPU] WHERE [Id] = @CurrentId;
END
ELSE IF @CurrentPart = 'RAM'
BEGIN
INSERT INTO @PartTable ([Name], [UnitPrice])
SELECT [Name], [UnitPrice] FROM [dbo].[RAM] WHERE [Id] = @CurrentId;
END
ELSE IF @CurrentPart = 'MOBO'
BEGIN
INSERT INTO @PartTable ([Name], [UnitPrice])
SELECT [Name], [UnitPrice] FROM [dbo].[MOBO] WHERE [Id] = @CurrentId;
END
ELSE IF @CurrentPart = 'PSU'
BEGIN
INSERT INTO @PartTable ([Name], [UnitPrice])
SELECT [Name], [UnitPrice] FROM [dbo].[PSU] WHERE [Id] = @CurrentId;
END
ELSE IF @CurrentPart = 'SSD'
BEGIN
INSERT INTO @PartTable ([Name], [UnitPrice])
SELECT [Name], [UnitPrice] FROM [dbo].[SSD] WHERE [Id] = @CurrentId;
END
SET @CurrentIndex = @CurrentIndex + 1;
END
SELECT * FROM @PartTable;

SELECT @TotalPrice = SUM([UnitPrice]) FROM @PartTable;
PRINT 'Total price: ' + CONVERT(NVARCHAR(20), @TotalPrice);
END
GO
PRINT N'Update complete.';


GO
