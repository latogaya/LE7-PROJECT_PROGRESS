CREATE PROCEDURE [dbo].[spParts_UpdateData]
    @tableName NVARCHAR(50),
    @id INT,
    @name NVARCHAR(MAX),
    @code NVARCHAR(MAX),
    @brand NVARCHAR(MAX),
    @unitPrice DECIMAL(10, 2)
AS
BEGIN
    SET NOCOUNT ON;
    DECLARE @sql NVARCHAR(MAX);

    SET @sql = N'UPDATE ' + QUOTENAME(@tableName) + N' SET Name = @name, Code = @code, Brand = @brand, UnitPrice = @unitPrice ' +
               N'WHERE Id = @id';

    EXEC sp_executesql @sql, 
                       N'@id INT, @name NVARCHAR(MAX), @code NVARCHAR(MAX), @brand NVARCHAR(MAX), @unitPrice DECIMAL(10, 2)', 
                       @id, @name, @code, @brand, @unitPrice;
END