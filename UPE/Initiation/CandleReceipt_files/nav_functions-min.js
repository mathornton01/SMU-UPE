
function checkCats(url)
{$.post("/nav/checkCats",{url:url},function(value)
{var obj=jQuery.parseJSON(value);if(obj.parent_id)
{getNavSubCategories(obj.parent_id,url,false);}else{getNavSubCategories(obj.category_id,url,false);}});}
function getNavSubCategories(ID,url,refresh)
{$.post("/nav/getNavSubCategoryList",{ID:ID},function(value)
{if(refresh!=false)
{$("#BodyRight").empty().load('/category/'+url,{view:'ajax'});}
$(".nav-cat-ajax").slideUp();$("#cat_"+ID).html(value).slideToggle();});}
function getNavSubCategoriesSub(ID,url,parentID,refresh)
{$.post("/nav/getNavSubCategoryListSub",{ID:ID,url:url},function(value)
{if(value==url)
{if(refresh!=false)
{window.location='/category/'+value;}}else{if(refresh!=false)
{$("#BodyRight").empty().load('/category/'+url,{view:'ajax'});}
$("#sub_cat_"+parentID).html(value).slideToggle();}});}