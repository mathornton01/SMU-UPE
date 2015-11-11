/*
    roi.js
    This piece of code is responsible for suppplying merchant sale information to mexp by means of an
    html image tag.

    It performs the following:
    1. Checks for the existence of the merchant_account_id variable. If the variable does not exist then
       proceed no further. Don't even bother to output an html image tag as we have nothing we can report on
    2. Check for existence of all other variables. For those ones that don't exist, create them within the scope
       of this javascript code and set them to empty strings
    3. Write out the image tags using all variables

    Variable names are as follows:
     * merchant_account_id
     * m_order_id
     * m_order_value
     * m_category_name
     * m_product_id
     * m_product_name
     * m_quantity
     * m_price
*/
if (typeof merchant_account_id == "undefined") {
    // do nothing.
}
else {
    if ((merchant_account_id!="") && (merchant_account_id!=null)) {
        if(typeof m_order_id == "undefined") {
            var m_order_id='';
        }
        else {
            m_order_id = cleanUp(m_order_id);
        }
        if (typeof m_order_value == "undefined") {
            var m_order_value='';
        }
        else {
            m_order_value = cleanUp(m_order_value);
        }
        if (typeof m_category_name == "undefined") {
            var m_category_name='';
        }
        else {
            m_category_name = cleanUp(m_category_name);
        }
        if (typeof m_product_id == "undefined") {
            var m_product_id='';
        }
        else {
            m_product_id = cleanUp(m_product_id);
        }
        if (typeof m_product_name == "undefined") {
            var m_product_name='';
        }
        else {
            m_product_name = cleanUp(m_product_name);
        }
        if (typeof m_quantity == "undefined") {
            var m_quantity='';
        }
        else {
            m_quantity = cleanUp(m_quantity);
        }
        if (typeof m_price == "undefined") {
            var m_price='';
        }
        else {
            m_price = cleanUp(m_price);
        }
        if (typeof env == "undefined") {
            var env='merchant.pronto.com'
        }
        document.write("<img src=https://"+env+"/index/roi.do?merchantAccountId="+merchant_account_id+"&orderId="+m_order_id+"&orderValue="+m_order_value+"&categoryName="+m_category_name+"&productId="+m_product_id+"&productName="+m_product_name+"&quantity="+m_quantity+"&price="+m_price+">");
    }
}

function cleanUp(parameter) {

    if(typeof parameter == "undefined") {
        return '';
    }

    if(typeof parameter != "string") {
        // Convert to a string object
        parameter += '';
    }

    parameter = parameter.replace(/[^a-zA-Z0-9_,.-]/g," ");
    parameter = trim(parameter);
    parameter = parameter.replace(/ /g,"&nbsp;");

    return parameter;
}


// Removes leading whitespaces
function LTrim( value ) {

    var re = /\s*((\S+\s*)*)/;
    return value.replace(re, "$1");

}

// Removes ending whitespaces
function RTrim( value ) {

    var re = /((\s*\S+)*)\s*/;
    return value.replace(re, "$1");

}

// Removes leading and ending whitespaces
function trim( value ) {

    return LTrim(RTrim(value));

}
