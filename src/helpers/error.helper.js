export class ApplicationError extends Error
{
    constructor( message, code )
    {
        super( message );
        
        this.statuscode = code;
    }
}