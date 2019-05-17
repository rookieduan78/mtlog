$(document).ready(function() {
	$.extend($.fn.validatebox.defaults.rules, {
		number: { 
		   validator: function (value, param) { 
		   return /^[0-9]+.?[0-9]*$/.test(value); 
		   }, 
		   message: '请输入数字'
		}
	});
	
    page_init();
});

function toAdd(){
	// 重置表单
	$("#mainForm").form('clear');
	addTr();
	$("input[name='status'][value='1']").prop("checked","checked");
	$("input[name='isDisplay'][value='1']").prop("checked","checked");
	$("input[name='isOffLine'][value='0']").prop("checked","checked");
	$("input[name='isForce'][value='0']").prop("checked","checked");
	$('#appType').combobox('setValue','0'); 
	// 弹出窗口
	$('#dd').dialog({
	    title: '增加资源',
	    width: 510,
	    height: 310,
	    closed: false,
	    cache: false,
	    modal: true,
	    buttons:[{ //设置下方按钮数组  
	           text:'保存',  
	           iconCls:'icon-ok',  
	           handler:function(){ 
	        	   var  ok=true;
	           	  doAddOrUpdate(ok);
	           }  
	      },{  
	           text:'关闭',
	           iconCls:'icon-cancel',  
	           handler:function(){  
	         		$('#dd').dialog('close');  
	           }  
	      }]
	});
	$('#dd').dialog('open'); //打开添加对话框
	$('#dd').window('center');//使Dialog居中显示
}

function page_init(){
	var resourceName = $('#resourceSearch').val();
	$('#mainGrid').datagrid({
		title : '资源管理',
		width : 'auto',
		height : 'auto',
		url : "/shuck/web/resource/searchRes",
		method : "post",
		queryParams : {'resourceName':resourceName},
		nowrap : false,
		fitColumns:true,
		scrollbarSize:0,
		striped : true,
		border : true,
		collapsible : false,//是否可折叠的 
		fit : true,//自动大小 
		//sortName: 'code', 
		//sortOrder: 'desc', 
		remoteSort : false,
		idField : 'resourceId',
		singleSelect : true,//是否单选 
		checkOnSelect: true,
		SelectOnCheck: false,
		pagination : true,//分页控件 
		rownumbers : true,//行号 
		onBeforeLoad:function(prm){
			  prm.resourceSearch = $('#resourceSearch').val()
		}
	});
	//设置分页控件 
	var p = $('#mainGrid').datagrid('getPager');
	$(p).pagination({
		pageSize : 10,//每页显示的记录条数，默认为10 
		pageList : [ 10, 20, 30 ],//可以设置每页记录条数的列表 
		beforePageText : '第',//页数文本框前显示的汉字 
		afterPageText : '页    共 {pages} 页',
		displayMsg : '当前显示 {from} - {to} 条记录   共 {total} 条记录',
  });
}

function searchData(pageNumber, pageSize){
   var resourceName = $('#resourceSearch').val();
   //var select_Status=$('#select_Status').val();
   var select_Status	 = $('#select_Status').combobox('getValue').trim();
   $("#mainGrid").datagrid('getPager').pagination({pageSize : pageSize, pageNumber : pageNumber});//重置
   $("#mainGrid").datagrid("loading"); //加屏蔽
   $.ajax({
       type : "POST",
       dataType : "json",
       url : "/shuck/web/resource/searchRes",
       data : {
    	   'name' : resourceName,
    	   'status' : select_Status
       },
       success : function(data) {
           $("#mainGrid").datagrid('loadData',data);
           $("#mainGrid").datagrid("loaded"); //移除屏蔽
       },
       error : function(err) {
           $.messager.alert('操作提示', '获取信息失败...请联系管理员!', 'error');
           $("mainGrid").datagrid("loaded"); //移除屏蔽
       }
   });
}


function toUpdate(){
	var rows = $('#mainGrid').datagrid('getChecked');
	if(rows == '') {
		$.messager.alert('提示','未选择任何数据');
		return;
	}
	if(rows.length > 1) {
		$.messager.alert('提示','不能同时修改多条数据');
		return;
	}
	// 重置表单
	$("#mainForm").form('clear');
	
	updateTr();
	var row = rows[0];
	$("#code").attr("readOnly","readOnly");
	$('#resourceId').val(row.resourceId);
	$('#name').val(row.name);
	$('#code').val(row.code);
	$('#status').combobox('setValue',row.status); 
	$('#remark').val(row.remark);
	$('#URL').val(row.url);
	/* $(":radio[name='status'][value='" + row.status + "']").prop("checked", "checked");
	$(":radio[name='isDisplay'][value='" + row.isDisplay + "']").prop("checked", "checked");
	$(":radio[name='isOffLine'][value='" + row.isOffLine + "']").prop("checked", "checked");
	$(":radio[name='isForce'][value='" + row.isForce + "']").prop("checked", "checked");
	$('#seq').numberbox('setValue', row.seq);
	$('#isSure').val(row.isSure);
	$('#remark').val(row.remark); */
	$('#dd').dialog({
	    title: '修改资源',
	    width: 510,
	    height: 310,
	    closed: false,
	    cache: false,
	    modal: true,
	    buttons:[{ //设置下方按钮数组  
	           text:'保存',  
	           iconCls:'icon-ok',  
	           handler:function(){  
	        	   var ok=false;
	           	  doAddOrUpdate(ok);
	           }  
	      },{  
	           text:'关闭',
	           iconCls:'icon-cancel',  
	           handler:function(){  
	         		$('#dd').dialog('close');  
	           }  
	      }]
	});
}


function doDeleteEntity(){
	var rows = $('#mainGrid').datagrid('getChecked');
	if(rows == '') {
		$.messager.alert('提示','未选择任何数据');
		return;
	}
	var ids = [];
	$.each(rows,function(index, value, array){
		ids[index] = value.resourceId;
	});
	//alert(ids);
	console.log(ids);
	$.messager.confirm('提示','您确定删除这'+rows.length+'条数据?',function(r){
	    if (r){
	    	$.ajax({
	            type: "post",
	            url: "/shuck/web/resource/doDeleteEntity",
	            data: {ids:ids.join()},
	            success: function(result) {
	            	if(result.status == 'success'){
	            		$.messager.alert('提示','删除成功,该资源已失效');
	            		$('#mainGrid').datagrid('reload');
	            		$('#mainGrid').datagrid('clearChecked');
	            	} else {
	            		$.messager.alert('提示','删除失败,请联系系统管理员');
	            		$('#mainGrid').datagrid('reload');
	            		$('#mainGrid').datagrid('clearChecked');
	            	}
	            	console.log(result);
	            }
	        });
	    }
	});
}
function doAddOrUpdate(ok){
	//alert($("#mainForm").form('validate'));
	
	if($("#mainForm").form('validate')){
		if(ok){
			$.ajax({
		        type: "post",
		        url: "/shuck/web/resource/validResourceCode",
		        data: $("#mainForm").serialize(),
		        success: function(result) {
		        	if(result.status=='success'){
		        		addResource();
		        	}else{
		        		$.messager.alert('提示','资源已存在!');
		        	}
		        }
		    });
		}else{
			addResource();
		}
	}
}

function addResource(){
	 $.ajax({
        type: "post",
        url: "/shuck/web/resource/doSaveOrUpdateEntity",
        data: $("#mainForm").serialize(),
        success: function(result) {
        	if(result.status == 'success'){
        		$.messager.alert('提示','保存成功');
        		$("#mainForm").form('clear');
        		$('#dd').dialog('close');
        		$('#mainGrid').datagrid('reload');
        	} else {
        		$.messager.alert('提示','保存失败,请联系系统管理员');
        	}
        	//console.log(result);
	        }
	 });
}

function formatterData(val,row) {
	if(val == 0){
		return "否";
	} else if (val == 1) {
		return "是";
	}
}

function formatterDataForType(val,row) {
	if(val == 0){
		return "Android";
	} else if (val == 1) {
		return "IOS";
	}
}

function p(s) {
    return s < 10 ? '0' + s: s;
}

function formatterDate(val,row){
	if (val != null) {
		var date = new Date(val);
		return date.getFullYear() + '-' 
			   + p((date.getMonth() + 1)) + '-'
			   + p(date.getDate()) + ' ' 
			   + p(date.getHours()) + ':' 
			   + p(date.getMinutes()) + ':' 
			   + p(date.getSeconds());
	}
}

function updateTr(){
	//$("#code").hide();
	//$("#textMessage").hide();
	$("#apptr3").show();
	$("#apptr4").show();
	$("#apptr5").show();
	/* $("#apptr12").hide();
	$("#apptr13").hide();
	$("#apptr14").hide();
	$("#apptr11").hide();
	$("#apptrRelease").hide();
	
	$("#apptr6").show();
	$("#apptr7").show();
	$("#apptr8").show();
	$("#apptr9").show();
	$("#apptr15").show(); */
}

function addTr(){
	$("#apptrRelease").show();
	for(var i = 1; i < 16; i++){
		if( $("#apptr"+i)){
			$("#apptr"+i).show();  
		}
	} 
	$("#apptr1").hide();  
	
}

function formatterDownLoad(val,row,index){
	return '<a id="showMsg" href="javascript:void(0);" onclick="showDownPath('+index+');">'+'查看'+'</a>';
}