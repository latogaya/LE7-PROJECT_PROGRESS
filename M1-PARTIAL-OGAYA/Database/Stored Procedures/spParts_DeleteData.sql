CREATE PROCEDURE [dbo].[spParts_DeleteData]
    @tableName NVARCHAR(50),
    @id INT
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @sql NVARCHAR(MAX);

    SET @sql = N'DELETE FROM ' + QUOTENAME(@tableName) + N' WHERE Id = @id';

    EXEC sp_executesql @sql, 
                       N'@id INT', 
                       @id;
END