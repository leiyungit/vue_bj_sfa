const getTypes = function(instence){
   return Object.prototype.toString.call(instence).slice(8,-1);
}
export default{
    getTypes,
}