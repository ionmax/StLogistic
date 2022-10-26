DECLARE 
	@contact_id uniqueidentifier, 
    @contact_name VARCHAR(MAX), 
    @contact_age   DECIMAL;

DECLARE cursor_contact CURSOR
FOR SELECT 
		Id,
        Name, 
        Age
    FROM 
        Contact;

OPEN cursor_contact;

FETCH NEXT FROM cursor_contact INTO 
	@contact_id,
    @contact_name, 
    @contact_age;

WHILE @@FETCH_STATUS = 0
    BEGIN
        PRINT @contact_name + ' - ' + CAST(@contact_age AS varchar);
		UPDATE Contact SET Notes = @contact_name + ' - ' + CAST(@contact_age AS varchar) WHERE Id = @contact_id
        FETCH NEXT FROM cursor_contact INTO 
            @contact_id,
			@contact_name, 
            @contact_age;
    END;

CLOSE cursor_contact;
DEALLOCATE cursor_contact;