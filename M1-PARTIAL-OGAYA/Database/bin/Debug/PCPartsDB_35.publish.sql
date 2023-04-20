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
PRINT N'Creating Procedure [dbo].[spParts_ReadData]...';


GO
CREATE PROCEDURE [dbo].[spParts_ReadData]
    @TableName NVARCHAR(50),
    @SearchString NVARCHAR(50) = NULL,
    @Category NVARCHAR(50) = NULL,
    @Brand NVARCHAR(50) = NULL,
    @MinPrice DECIMAL(10, 2) = NULL,
    @MaxPrice DECIMAL(10, 2) = NULL
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @sql NVARCHAR(MAX);

    SET @sql = N'SELECT @Category AS [Category], [Id], [Name], [Code], [Brand], [UnitPrice]
                 FROM ' + QUOTENAME(@TableName) + N'
                 WHERE (@SearchString IS NULL OR [Name] LIKE ''%'' + @SearchString + ''%'' OR [Code] LIKE ''%'' + @SearchString + ''%'' OR [Brand] LIKE ''%'' + @SearchString + ''%'' OR @TableName = @SearchString)
                 AND (@Category IS NULL OR @Category = @TableName)
                 AND (@Brand IS NULL OR [Brand] = @Brand)
                 AND (@MinPrice IS NULL OR [UnitPrice] >= @MinPrice)
                 AND (@MaxPrice IS NULL OR [UnitPrice] <= @MaxPrice)';

    EXEC sp_executesql @sql, 
                       N'@Category NVARCHAR(50), @SearchString NVARCHAR(50), @Brand NVARCHAR(50), @MinPrice DECIMAL(10, 2), @MaxPrice DECIMAL(10, 2), @TableName NVARCHAR(50)', 
                       @Category,
                       @SearchString,
                       @Brand,
                       @MinPrice,
                       @MaxPrice,
                       @TableName;
END
GO
PRINT N'Update complete.';


GO
