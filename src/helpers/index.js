

export const generateResetToken = function ()
{
    return Math.floor( Math.random() * 1000000 );
}

export const isEmail = function ( email )
{
    return ( /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test( email ) ) ? true : false;
}