$(function(){
    $(document).ready(function(){
        resizeGrid();
    });
    $(window).resize(function(){
    	resizeGrid();
    });
})

function resizeGrid(){
    $('.easyui-datagrid').datagrid({
        fitColumns:true
    });
}