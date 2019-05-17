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
	/*$("input[name='status'][value='1']").prop("checked","checked");
	$("input[name='isDisplay'][value='1']").prop("checked","checked");
	$("input[name='isOffLine'][value='0']").prop("checked","checked");
	$("input[name='isForce'][value='0']").prop("checked","checked");
	$('#appType').combobox('setValue','0'); */
	// 弹出窗口
	$('#menuDialog').dialog({
	    title: '新增菜单',
	    width: 500,
	    height: 400,
	    closed: false,
	    cache: false,
	    modal: true,
	    singleSelect:false,
	    onClose: function () {
	    	$('#name').val("1");
    	    $('#code').val("1");
	   },
	    buttons:[{ //设置下方按钮数组  
	           text:'保存',  
	           iconCls:'icon-ok',  
	           handler:function(){ 
	        	   if($('#remark').val().length>200){
	        		   alert("备注请输入200字以内")
	        	   }else if($('#parentId').combobox('getValue')==""){
	        		   alert("父菜单不能为空")
	        	   }else{
	        		   var id="0";
	        			var name=$("#name").val();
	        			var code=$("#code").val();
	        			$.ajax({
	        				type: "post",
	        				url: "/shuck/web/menu/doJiaoYanByCode",
	        				 data: {"code":code,"name":name,"id":id},
	        				success: function(result){
	        					if(result.status == 'name'){
	        						$.messager.alert('提示','名称已存在，请重新输入');
	        						$("#name").val("");
	        			       	} 
	        					if(result.status == 'code'){
	        						$.messager.alert('提示','编码已存在，请重新输入');
	        						$("#code").val("");
	        			       	} 
	        					if(result.status == 'success'){
	        						 doAddOrUpdate();
	        			       	} 
	        				}
	        			});
	        	   }
	        	        
	           }  
	      },{  
	           text:'关闭',
	           iconCls:'icon-cancel',  
	           handler:function(){ 
	        		$('#name').val("1");
	        	    $('#code').val("1");
	         		$('#menuDialog').dialog('close');  
	           }  
	      }]
	});
	 initCombobox4();
	 initCombobox5();
	 initCombobox6();
}
var arrayList=[];
function initCombobox(){
	 var rows = $('#mainGrid').datagrid('getChecked');
	 var row = rows[0];
	//加载下拉框复选框
	$("#parentId").combobox({
        url:'/shuck/web/menu/searchFuMenu', //后台获取下拉框数据的url
        method:'post',
        panelHeight:200,//设置为固定高度，combobox出现竖直滚动条
        valueField:'id',
        textField:'name',
        multiple:false,
        onLoadSuccess: function (data) {
        	if(rows.length > 0){
        		$("#parentId3").val(row.parentId2);
         	    $("#parentId").combobox('setValue',row.parentId);
         	}
        },
    	 onSelect: function (row) { //选中一个选项时调用
    		 $("#parentId3").val("");
    		 var id=$('#parentId').combobox('getValue');
    	   		$.ajax({
    					type: "post",
    					url: "/shuck/web/menu/findParentName",
    					 data: {"id":id},
    					success: function(result){
    						   if(result== '0'){
    							    $("#apptr19").hide();
    				       	      }
    						   if(result== '1'){
    							    $("#apptr19").show();
    				       	      }
    				       }
    				   });
    		 
         }	
    });
}

function initCombobox2(){
	var rows = $('#mainGrid').datagrid('getChecked');
	 var row = rows[0];
	//加载下拉框复选框
	$("#rootId").combobox({
        url:'/shuck/web/menu/searchGenMenu', //后台获取下拉框数据的url
        method:'post',
        panelHeight:200,//设置为固定高度，combobox出现竖直滚动条
        valueField:'id',
        textField:'name',
        multiple:false,
        onLoadSuccess: function (data) {
        	if(rows.length > 0){
        		$("#rootId").combobox('setValue',row.rootId);
        	}
     	}
    });
}
function initCombobox3(){
	var rows = $('#mainGrid').datagrid('getChecked');
	 var row = rows[0];
	//加载下拉框复选框
	$("#resourceId").combobox({
        url:'/shuck/web/menu/searchEditResource', //后台获取下拉框数据的url
        method:'post',
        panelHeight:200,//设置为固定高度，combobox出现竖直滚动条
        valueField:'resourceId',
        textField:'name',
        multiple:false,
        onLoadSuccess: function (data) {
        	if(rows.length > 0){
        		$("#recId").val(row.recId2);
        		$("#resourceId").combobox('setValue',row.resourceId);
        	}
     	},
     	onSelect: function (row) { //选中一个选项时调用
     		$("#recId").val("");
        }	
    });
}
function initCombobox4(){
	 var rows = $('#mainGrid').datagrid('getChecked');
	 var row = rows[0];
	//加载下拉框复选框
	$("#parentId").combobox({
       url:'/shuck/web/menu/searchFuMenu', //后台获取下拉框数据的url
       method:'post',
       panelHeight:200,//设置为固定高度，combobox出现竖直滚动条
       valueField:'id',
       textField:'name',
       multiple:false,
       onLoadSuccess: function (data) {
       	if(rows.length > 0){
       		$("#parentId3").val(row.parentId2);
        	}
       },
   	 onSelect: function (row) { //选中一个选项时调用
   		 $("#parentId3").val("");
   		 var id=$('#parentId').combobox('getValue');
   		$.ajax({
				type: "post",
				url: "/shuck/web/menu/findParentName",
				 data: {"id":id},
				success: function(result){
					   if(result== '0'){
						    $("#apptr19").hide();
			       	      }
					   if(result== '1'){
						    $("#apptr19").show();
			       	      }
			       }
			   });
        }	
   });
}
function initCombobox5(){
	var rows = $('#mainGrid').datagrid('getChecked');
	 var row = rows[0];
	//加载下拉框复选框
	$("#rootId").combobox({
        url:'/shuck/web/menu/searchGenMenu', //后台获取下拉框数据的url
        method:'post',
        panelHeight:200,//设置为固定高度，combobox出现竖直滚动条
        valueField:'id',
        textField:'name',
        multiple:false,
        onLoadSuccess: function (data) {
        	if(rows.length > 0){
        	}
     	}
    });
}
function initCombobox6(){
	var rows = $('#mainGrid').datagrid('getChecked');
	 var row = rows[0];
	//加载下拉框复选框
	$("#resourceId").combobox({
        url:'/shuck/web/menu/searchAddResource', //后台获取下拉框数据的url
        method:'post',
        panelHeight:200,//设置为固定高度，combobox出现竖直滚动条
        valueField:'resourceId',
        textField:'name',
        multiple:false,
        onLoadSuccess: function (data) {
        	if(rows.length > 0){
        		$("#recId").val(row.recId2);
        	}
     	},
     	onSelect: function (row) { //选中一个选项时调用
     		$("#recId").val("");
        }	
    });
}
function page_init(){
	var appName = $('#appNameSearch').val();
	$('#mainGrid').datagrid({
		title : '菜单管理',
		width : 'auto',
		height : 'auto',
		url : "/shuck/web/menu/searchMenuInfo",
		method : "post",
		queryParams : {'name':appName},
		nowrap : false,
		striped : true,
		border : true,
		collapsible : false,//是否可折叠的 
		fit : true,//自动大小 
		//sortName: 'code', 
		//sortOrder: 'desc', 
		remoteSort : false,
		idField : 'id',
		singleSelect : true,//是否单选 
		checkOnSelect: true,
		SelectOnCheck: true,
		pagination : true,//分页控件 
		rownumbers : false,//行号 
		onBeforeLoad:function(prm){
			  prm.appNameSearch = $('#appNameSearch').val()
			  $('#mainGrid').datagrid('clearChecked');
			  $('#parentName').combobox({
			         url: '/shuck/web/menu/findMenuParentName',
			         width:100,
			         method: 'post',
			         valueField: 'id',
			         textField: 'name',
			         editable: false,
			         panelHeight: 'auto',
			         onLoadSuccess: function (data) {
			        	 $("#parentName").combobox('setValue',"请选择");
			        	// $("#parentName").val('请选择');
			         },
			         onSelect:  function (record){
			        	 //当选择下拉框时，将你选择的这条记录的code复制给combox，提交时将此值传给后台，根据parentid去查
			        	 var parentName=record.id;
			        	 var name=$('#parentName').combobox('getValue');
			        	 $("#parentName").val(parentName);
			         }
			     });
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
			searchData(pageNumber,pageSize)
		}
  });
}

function searchData(pageNumber, pageSize){
   var appName = $('#appNameSearch').val();
   var parentName =$('#parentName').combobox('getValue');
   if(parentName=='请选择'){
	   parentName="";
   }
   $("#mainGrid").datagrid('getPager').pagination({pageSize : pageSize, pageNumber : pageNumber});//重置
   $("#mainGrid").datagrid("loading"); //加屏蔽
   $.ajax({
       type : "POST",
       dataType : "json",
       url : "/shuck/web/menu/searchMenuInfo",
       data : {
    	   'name' : appName,
    	   'parentName':parentName,
    	   'page' : pageNumber,
    	   'rows' : pageSize
       },
       success : function(data) {
           $("#mainGrid").datagrid('loadData',data);
           $("#mainGrid").datagrid("loaded"); //移除屏蔽
           $('#mainGrid').datagrid('clearChecked');
       },
       error : function(err) {
           $.messager.alert('操作提示', '获取信息失败...请联系管理员!', 'error');
           $("mainGrid").datagrid("loaded"); //移除屏蔽
           $('#mainGrid').datagrid('clearChecked');
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
	var id=row.parentId2;
	$.ajax({
				type: "post",
				url: "/shuck/web/menu/findParentName",
				 data: {"id":id},
				success: function(result){
					   if(result== '0'){
						    $("#apptr19").hide();
			       	      }
					   if(result== '1'){
						    $("#apptr19").show();
			       	      }
			       }
			   });
	$('#id').val(row.id);
	$('#name').val(row.name);
	$('#code').val(row.code);
	$('#rootId').combobox('setValue',row.code); 
	$('#resourceId').combobox('setValue',row.resourceId); 
	$('#sort').numberbox('setValue', row.sort);
	$('#parentId').combobox('setValue',row.code);
	$('#parentId3').val(row.parentId3);
	$('#remark').val(row.remark);
	$('#menuDialog').dialog({
	    title: '修改菜单',
	    width: 500,
	    height: 400,
	    closed: false,
	    cache: false,
	    modal: true,
	    onClose: function () {
	    	$('#name').val("1");
    	    $('#code').val("1");
	   },
	    buttons:[{ //设置下方按钮数组  
	           text:'保存',  
	           iconCls:'icon-ok',  
	           handler:function(){ 
	        	   if($('#remark').val().length>200){
	        		   alert("备注请输入200字以内")
	        	   }else if($('#parentId').combobox('getValue')==""){
	        		   alert("父菜单不能为空")
	        	   }else{
	        		   var name=$("#name").val();
	          			var code=$("#code").val();
	          			var id=$("#id").val();
	          			$.ajax({
	          				type: "post",
	          				url: "/shuck/web/menu/doJiaoYanByCode",
	          				 data: {"code":code,"name":name,"id":id},
	          				success: function(result){
	          					if(result.status == 'name'){
	          						$.messager.alert('提示','名称已存在，请重新输入');
	          						$("#name").val("");
	          			       	} 
	          					if(result.status == 'code'){
	          						$.messager.alert('提示','编码已存在，请重新输入');
	          						$("#code").val("");
	          			       	} 
	          					if(result.status == 'success'){
	          						 doAddOrUpdate();
	          			       	} 
	          				}
	          			});
	        	   }
	        	  
	           }  
	      },{   
	           text:'关闭',
	           iconCls:'icon-cancel',  
	           handler:function(){ 
	        		$('#name').val("1");
	        	    $('#code').val("1");
	         		$('#menuDialog').dialog('close');  
	           }  
	      }]
	});
	 initCombobox();
	 initCombobox2();
	 initCombobox3();
}
function doDeleteEntity(){
	var rows = $('#mainGrid').datagrid('getChecked');
	if(rows == '') {
		$.messager.alert('提示','未选择任何数据');
		return;
	}
	var id = rows[0].id;
	$.messager.confirm('提示','您确定删除这'+rows.length+'条数据?',function(r){
	    if (r){
	    	$.ajax({
	            type: "post",
	            url: "/shuck/web/menu/doDeleteEntity",
	            data: {'id' : id},
	            success: function(result) {
	            	if(result.status == 'success'){
	            		$('#mainGrid').datagrid('reload');
	            		$('#mainGrid').datagrid('clearChecked');
	            	} else if(result.status == 'havaChildren'){
	            		$.messager.alert('提示','删除失败, 该菜单存在子菜单');
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

function doAddOrUpdate(){
	if($("#mainForm").form('validate')){
		$.ajax({
	        type: "post",
	        url: "/shuck/web/menu/doSaveOrUpdateEntity",
	        data: $("#mainForm").serialize(),
	        success: function(result) {
	        	if(result.status == 'success'){
	        		$.messager.alert('提示','保存成功');
//	        		$("#mainForm").form('clear');
	        		$('#menuDialog').dialog('close');
	        		//$('#mainGrid').datagrid('reload');
	        		 searchData(1,10);
	        	} else {
	        		$.messager.alert('提示','保存失败,请联系系统管理员');
	        	}
	        	console.log(result);
	        }
	    });
	}
}
function addTr(){
	$("#apptr16").hide();
	$("#apptr19").show();
	$("#apptrRelease").show();
	for(var i = 1; i < 16; i++){
		if( $("#apptr"+i)){
			$("#apptr"+i).show();  
		}
	} 
}
function updateTr(){
	$("#apptr16").hide();
	$("#apptr2").hide();
}
