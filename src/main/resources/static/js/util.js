/* ##########################
 * 获取日期之间相隔天数
 * 返回值包含当天
 * ##########################
 */
function dateDiffIncludeToday(startDateString, endDateString, separator){  
	if(!(startDateString || endDateString)) return -1;
    var startDates = startDateString.split(separator);  
    var endDates = endDateString.split(separator);
    var startDate = new Date(startDates[0], startDates[1]-1, startDates[2]);  
    var endDate = new Date(endDates[0], endDates[1]-1, endDates[2]);  
    return parseInt(Math.abs(endDate - startDate ) / 1000 / 60 / 60 /24) + 1;//把相差的毫秒数转换为天数   
};