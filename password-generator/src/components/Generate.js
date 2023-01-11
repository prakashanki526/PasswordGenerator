
export default async function generatePassword(length,lower,upper,number,symbol){

    const uc = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lc = "abcdefghijklmnopqrstuvwxyz";
    const num = "1234567890";
    const sym = "!@#$%^&*";
    let ran = "";

    lower ? ran+=lc : ran+="";
    upper ? ran+=uc : ran+="";
    number ? ran+=num : ran+="";
    symbol ? ran+=sym : ran+="";

    !ran ? ran+=lc : ran+="";

    let result = "";

        if(lower){
            for ( var i = 0; i < 1; i++ ) {
                result += lc.charAt(Math.floor(Math.random() * 26));
            }
        }

        if(upper){
            for ( i = 0; i < 1; i++ ) {
                result += uc.charAt(Math.floor(Math.random() * 26));
            }
        }

        if(number){
            for ( i = 0; i < 1; i++ ) {
                result += num.charAt(Math.floor(Math.random() * 10));
            }
        }

        if(symbol){
            for ( i = 0; i < 1; i++ ) {
                result += sym.charAt(Math.floor(Math.random() * 8));
            }
        }

        let currLen = result.length;

        for ( i = 0; i < length-currLen; i++ ) {
            result += ran.charAt(Math.floor(Math.random() * ran.length));
        }
        
        return result;

}