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
	    title: '增加原生应用',
	    width: 500,
	    height: 400,
	    closed: false,
	    cache: false,
	    nowrap: false,
	    modal: true,
	    onClose: function () {
	    	$('#name').val("1");
    	    $('#code').val("1");
	    },
	    buttons:[{ //设置下方按钮数组  
	           text:'保存',  
	           iconCls:'icon-ok',  
	           handler:function(){  
	           	  doAddOrUpdate();
	           }  
	      },{  
	           text:'关闭',
	           iconCls:'icon-cancel',  
	           handler:function(){  
	        	    $('#name').val("1");
	        	    $('#code').val("1");
	         		$('#dd').dialog('close');  
	           }  
	      }]
	});
}

function page_init(){
	var appName = $('#appNameSearch').val();
	$('#mainGrid').datagrid({
			title : '角色管理',
			width : 'auto',
			height : 'auto',
			fit : true,
			view : detailview,
			checkOnSelect : true,
			SelectOnCheck : true,
			nowrap : false,
			striped : true,
			remoteSort : false,
			fitColumns:true,
			idField : 'roleId',
			singleSelect : true,// 是否单选
			detailFormatter : function(index, row) {
				return '<div style="padding:2px"><table id="ddv-' + index
						+ '"></table></div>';
			},
			//点击"+"展开数据的时候触发此事件
			onExpandRow : function(index, row) {
				$('#ddv-' + index).datagrid(
						{
							//查询子列表的url
							url : '/shuck/web/resource/searchResource?groupId='
									+ row.roleId,   //'ZXZXS'
							fitColumns : true,
							singleSelect : true,
							rownumbers : true,
							loadMsg : '',
							height : 'auto',
							//子列表展示的字段
							columns : [ [ {
								field : 'id',
								title : 'id',
								width : 100,
								align : 'center',
								hidden:'true'
							},{
								field : 'code',
								title : '编码',
								width : 100,
								align : 'center'
							}, {
								field : 'name',
								title : '名称',
								width : 100,
								align : 'center'
							}, {
								field : 'URL',
								title : '访问链接',
								width : 100,
								align : 'center'
							}, {
//								field : 'status',
//								title : '状态',
//								width : 100,
//								align : 'center',
//								formatter : function(value,row,index){
//									if(value == 1){
//										return "是";
//									} else  {
//										return "否";
//									}
//					            }
//							}, {
								field : 'remark',
								title : '备注',
								width : 100,
								align : 'center'
							} ] ],
							
							onResize:function(){  
				                $('#mainGrid').datagrid('fixDetailRowHeight',index);  
				            },  
				            //在数据加载成功的时候触发。
				            onLoadSuccess:function(){  
				                setTimeout(function(){  
				                	//fixDetailRowHeight：修复明细行高度。
				                    $('#mainGrid').datagrid('fixDetailRowHeight',index);  
				                },0);  
				            } 
						});
				$('#mainGrid').datagrid('fixDetailRowHeight', index);
			}
		});
	//设置分页控件 
	var p = $('#mainGrid').datagrid('getPager');
	$(p).pagination({
		pageSize : 10,//每页显示的记录条数，默认为10 
		pageList : [ 5, 10, 15 ],//可以设置每页记录条数的列表 
		beforePageText : '第',//页数文本框前显示的汉字 
		afterPageText : '页    共 {pages} 页',
		displayMsg : '当前显示 {from} - {to} 条记录   共 {total} 条记录',
		onSelectPage:function(pageNumber, pageSize){
			$('#mainGrid').datagrid('clearChecked');
			searchData(pageNumber,pageSize)
		}	 
  });
}

function searchData(pageNumber, pageSize){
   var appName = $('#appNameSearch').val();
   $("#mainGrid").datagrid('getPager').pagination({pageSize : pageSize, pageNumber : pageNumber});//重置
   $("#mainGrid").datagrid("loading"); //加屏蔽
   var argData = {'name' : appName, 'page' : pageNumber, 'rows' : pageSize};
   ajaxSend("/shuck/web/role/searchRoleInfo", argData, "mainGrid");
   $('#mainGrid').datagrid('clearChecked');
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
	
	var flag=true;
	var row = rows[0];
	if('0000'==row.roleId){
		$.messager.alert('提示','超级管理员禁止修改角色！');
		flag=false;
	}
	if(flag){
		// 重置表单
		$("#mainForm").form('clear');
		
		$('#roleId').val(row.roleId);
		$('#code').val(row.code);
		$('#name').val(row.name);
		$('#sort').val(row.sort);
		$('#descript').val(row.descript);
		$(":radio[name='status'][value='" + row.status + "']").prop("checked", "checked");
		$('#dd').dialog({
		    title: '修改角色',
		    width: 500,
		    height: 400,
		    closed: false,
		    cache: false,
		    nowrap: false,
		    modal: true,
		    onClose: function () {
		    	$('#name').val("1");
	    	    $('#code').val("1");
		   },
		    buttons:[{ //设置下方按钮数组  
		           text:'保存',  
		           iconCls:'icon-ok',  
		           handler:function(){  
		           	  doAddOrUpdate();
		           }  
		      },{  
		           text:'关闭',
		           iconCls:'icon-cancel',  
		           handler:function(){  
		        	    $('#name').val("1");
		        	    $('#code').val("1");
		         		$('#dd').dialog('close');  
		           }  
		      }]
		});
	}
}
function formatterData(val,row) {
	if(val == 0){
		return "否";
	} else if (val == 1) {
		return "是";
	}
}

function doDeleteEntity(){
	var rows = $('#mainGrid').datagrid('getChecked');
	if(rows == '') {
		$.messager.alert('提示','未选择任何数据');
		return;
	}
	var ids = [];
	var status = [];
	$.each(rows,function(index, value, array){
		ids[index] = value.roleId;
		status[index] = value.status;
	});
	//原多选改为单选
	if(status[0] == '0') {
		$.messager.alert('提示',' 该角色已禁用');
		return;
	}
	$.messager.confirm('提示','您确定禁用这'+rows.length+'条数据?',function(r){
	    if (r){
    	   var argData = {ids:ids.join()};
    	   ajaxSendReSearch("/shuck/web/role/doDeleteEntity", argData, "mainGrid","禁用成功");
	       $('#mainGrid').datagrid('clearChecked');	
	    }
	});
}

function doAddOrUpdate(){
	if($("#mainForm").form('validate')){
		if ($('#descript').val().length>250) {
			$.messager.alert('提示','保存失败,描述超出字数限制');
		}else {
			$.ajax({
		        type: "post",
		        url: "/shuck/web/role/doSaveOrUpdateEntity",
		        data: $("#mainForm").serialize(),
		        success: function(result) {
		        	if(result.status == 'success'){
		        		$.messager.alert('提示','保存成功');
		        		$('#dd').dialog('close');
		        		searchData(1,10);
		        		$('#mainGrid').datagrid('clearChecked');
		        	} else if(result.status == 'exists'){
		        		$.messager.alert('提示','保存失败,角色编码重复');
		        	} else {
		        		$.messager.alert('提示','保存失败,请联系系统管理员');
		        	}
//		        	console.log(result);
		        }
		    });
		}
	}
}
function addTr(){
	$("#apptrRelease").show();
	for(var i = 1; i < 16; i++){
		if( $("#apptr"+i)){
			$("#apptr"+i).show();  
		}
	} 
}

function setResource(){
	var rows = $('#mainGrid').datagrid('getChecked');
	if(rows == '') {
		$.messager.alert('提示','未选择任何数据');
		return;
	}
	if(rows.length > 1) {
		$.messager.alert('提示','不能同时设置多条数据');
		return;
	}
	var roleId = rows[0].roleId;
	$('#adg').dialog({
	title : '设置资源',
	width : 800, 
	height : 500, 
	modal : true, 
	buttons:[{ //设置下方按钮数组  
           text:'设置',  
           iconCls:'icon-ok',  
           handler:function(){  
        	    doSetResource(roleId);
        		$('#adg').dialog('close');  
        		$('#addDataGrid').datagrid('clearChecked');
           }  
      },{  
           text:'取消',
           iconCls:'icon-cancel',  
           handler:function(){  
         		$('#adg').dialog('close');  
         		$('#addDataGrid').datagrid('clearChecked');
           }  
      }]
	});
$('#addDataGrid').datagrid({
	// title : '应用程序管理',
	width : 'auto',
	height: 450,
	 closed: false,
	 fitColumns: true,
	 cache: false,
	 modal: true,
	 url:'/shuck/web/resource/searchResValided?roleId='+roleId+'&state=1', 
	  columns:[[   
	        {checkbox: true} ,   
	        {
				field : 'id',
				title : 'id',
				width : 100,
				align : 'center',
				hidden:'true'
			},{
				field : 'code',
				title : '编码',
				width : 100,
				align : 'center'
			}, {
				field : 'name',
				title : '名称',
				width : 100,
				align : 'center'
			}, {
				field : 'URL',
				title : '访问链接',
				width : 250,
				align : 'center'
			}, {
				field : 'remark',
				title : '备注',
				width : 200,
				align : 'center'
			},
	      	]] , 
	method : "post",
	nowrap : false,
	striped : true,
	border : true,
	collapsible : false,//是否可折叠的 
	fit : true,//自动大小 
	toolbar:"#searchButton",
	remoteSort : false,
	idField : 'id',
	singleSelect : false,//是否单选 
	checkOnSelect: true,
	pagination : true,//分页控件 
	//rownumbers : true,//行号 
});
//设置分页控件 
var p = $('#addDataGrid').datagrid('getPager');
$(p).pagination({
	pageSize : 10,//每页显示的记录条数，默认为10 
	pageList : [ 5, 10, 15 ],//可以设置每页记录条数的列表 
	beforePageText : '第',//页数文本框前显示的汉字 
	afterPageText : '页    共 {pages} 页',
	displayMsg : '当前显示 {from} - {to} 条记录   共 {total} 条记录',
	onSelectPage:function(pageNumber, pageSize){
		searchSourceData(pageNumber,pageSize)
	}
});
}

function searchSourceData(pageNumber,pageSize){
//  var name = $('#nameSearch').val();
	var rows = $('#mainGrid').datagrid('getChecked');
	var roleId = rows[0].roleId;
    var code=$('#codeSearch').val();
    var name=$('#nameSearch').val();
  
    $("#addDataGrid").datagrid('getPager').pagination({pageSize : pageSize, pageNumber : pageNumber});//重置
    $("#addDataGrid").datagrid("loading"); //加屏蔽
  
    var argData = {'roleId' : roleId,'state' : 1, 'code' : code, 'name' : name, 'page' : pageNumber, 'rows' : pageSize};
    ajaxSend("/shuck/web/resource/searchResValided", argData, "addDataGrid");
	$('#addDataGrid').datagrid('clearChecked');
}

function searchSourceDataDelete(pageNumber,pageSize){
//  var name = $('#nameSearch').val();
	var rows = $('#mainGrid').datagrid('getChecked');
	var roleId = rows[0].roleId;
    var code=$('#codeSearchDelete').val();
    var name=$('#nameSearchDelete').val();
  
    $("#deleteDataGrid").datagrid('getPager').pagination({pageSize : pageSize, pageNumber : pageNumber});//重置
    $("#deleteDataGrid").datagrid("loading"); //加屏蔽
  
    var argData = {'roleId': roleId, 'code' : code, 'name' : name, 'page' : pageNumber, 'rows' : pageSize};
    ajaxSend("/shuck/web/resource/searchResValided", argData, "deleteDataGrid");
    $('#mainGrid').datagrid('clearChecked');
	$('#deleteDataGrid').datagrid('clearChecked');
}



function doSetResource(roleId){
	var rows = $('#addDataGrid').datagrid('getChecked');
	if(rows == '') {
		$.messager.alert('提示','未选择任何资源');
		return;
	}
	var ids = [];
	$.each(rows,function(index, element){
		ids[index] = element.id;
	});
	//alert(ids);
	$.messager.confirm('提示','您确定设置这'+rows.length+'条资源?',function(r){
	    if (r){
	        var argData = {'roleId': roleId, 'resourceIds':ids.join()};
	        ajaxSendReSearch("/shuck/web/role/setResource", argData, "mainGrid","设置成功");
    		$('#mainGrid').datagrid('clearChecked');
	    }
	});
}



function deleteResource(){
	var rows = $('#mainGrid').datagrid('getChecked');
	if(rows == '') {
		$.messager.alert('提示','未选择任何数据');
		return;
	}
	if(rows.length > 1) {
		$.messager.alert('提示','不能同时删除多条角色的资源');
		return;
	}
	var roleId = rows[0].roleId;
	$('#ddg').dialog({
	title : '删除资源',
	width : 800, 
	height : 500, 
	modal : true, 
	buttons:[{ //设置下方按钮数组  
           text:'删除',  
           iconCls:'icon-ok',  
           handler:function(){  
        	    doDeleteResource(roleId);
        		$('#ddg').dialog('close');  
        		$('#deleteDataGrid').datagrid('clearChecked');
           }  
      },{  
           text:'取消',
           iconCls:'icon-cancel',  
           handler:function(){  
         		$('#ddg').dialog('close');  
         		$('#deleteDataGrid').datagrid('clearChecked');
           }  
      }]
	});
$('#deleteDataGrid').datagrid({
	// title : '应用程序管理',
	width : 'auto',
	height: 450,
	 fitColumns: true,
	 closed: false,
	 cache: false,
	 modal: true,
	 url:'/shuck/web/resource/searchResValided?roleId='+roleId, 
	  columns:[[   
	        {checkbox: true} ,   {
				field : 'id',
				title : 'id',
				width : 100,
				align : 'center',
				hidden:'true'
			}, {
				field : 'code',
				title : '编码',
				width : 100,
				align : 'center'
			}, {
				field : 'name',
				title : '名称',
				width : 100,
				align : 'center'
			}, {
				field : 'URL',
				title : '访问链接',
				width : 250,
				align : 'center'
			}, {

				field : 'remark',
				title : '备注',
				width : 200,
				align : 'center'
			},
	      	]] , 
	method : "post",
	nowrap : false,
	striped : true,
	border : true,
	collapsible : false,//是否可折叠的 
	fit : true,//自动大小 
	toolbar:"#searchButtonDelete",
	remoteSort : false,
	idField : 'code',
	singleSelect : false,//是否单选 
	checkOnSelect: true,
	pagination : true,//分页控件 
	//rownumbers : true,//行号 
});
//设置分页控件 
var p = $('#deleteDataGrid').datagrid('getPager');
$(p).pagination({
	pageSize : 10,//每页显示的记录条数，默认为10 
	pageList : [ 5, 10, 15 ],//可以设置每页记录条数的列表 
	beforePageText : '第',//页数文本框前显示的汉字 
	afterPageText : '页    共 {pages} 页',
	displayMsg : '当前显示 {from} - {to} 条记录   共 {total} 条记录',
	onSelectPage:function(pageNumber, pageSize){
		searchSourceDataDelete(pageNumber,pageSize)
	}
});
}


function doDeleteResource(roleId){
	var rows = $('#deleteDataGrid').datagrid('getChecked');
	if(rows == '') {
		$.messager.alert('提示','未选择任何资源');
		return;
	}
	var ids = [];
	$.each(rows,function(index, element){
		ids[index] = element.id;
	});
	$.messager.confirm('提示','您确定删除这'+rows.length+'条资源?',function(r){
	    if (r){
    	   var argData = {'roleId':roleId,'resourceIds':ids.join()};
    	   ajaxSendReSearch("/shuck/web/role/doDeleteResource", argData, "mainGrid", "删除成功");
    	   $('#mainGrid').datagrid('clearChecked');
	    }
	});
}