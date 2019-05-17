function toAdd(){
	// 重置表单
	$("#mainForm").form('clear');
	$("input[name='status2'][value='1']").prop("checked","checked");
	// 弹出窗口
	$('#dd').dialog({
	    title: '新增用戶',
	    width: 500,
	    height: 400,
	    closed: false,
	    cache: false,
	    modal: true,
	    buttons:[{ //设置下方按钮数组  
	           text:'保存',  
	           iconCls:'icon-ok',  
	           handler:function(){  
	        	   if ($("#id2").val()!=null&&$("#id2").val()!="") {
	        		   doAddUser();
	        		   $('#dd').dialog('close');
	        	   }else{
	        		   $.messager.alert('提示', "未选择用户");
	        	   }
	           }  
	      },{  
	           text:'关闭',
	           iconCls:'icon-cancel',  
	           handler:function(){  
	        	   $('#dd').dialog('close');  
	           }  
	      }]
	});
    initCombobox();
}

//点击选择用户，触发弹框
function selectUser(){
//	$('#userDataGrid').datagrid('reload');
	$('#addUserDialog').dialog({
	title : '选择用户',
	width : 600, 
	height : 500, 
	fitColumns : true,
	modal : true, 
	buttons:[{ //设置下方按钮数组  
           text:'添加',  
           iconCls:'icon-ok',  
           handler:function(){  
        		$('#addUserDialog').dialog('close');  
        		setValue();
           		$('#userDataGrid').datagrid('clearChecked');
           }  
      },{  
           text:'取消',
           iconCls:'icon-cancel',  
           handler:function(){  
         		$('#addUserDialog').dialog('close');  
         		$('#userDataGrid').datagrid('clearChecked');
           }  
      }]
	});
$('#userDataGrid').datagrid({
	// title : '应用程序管理',
	width : '300',
	height: '400',
	nowrap: false,
	 closed: false,
	 cache: false,
	 fitColumns: true,
	 modal: true,
//	 url:'/shuck/web/user/searchEmpInfoForUser', 
	  columns:[[   
	        {checkbox: true} ,  
	        {field:'userId',title:'id',width:100, hidden:'true'},  
	        {field:'userName',title:'姓名',width:120} ,   
	        {field:'code',title:'工号',width:120},   
	        {field:'unitCode',title:'分公司编码',width:120},
		    {field:'unitName',title:'分公司名称',width:190} ,  
	      	]] , 
	method : "post",
	nowrap : false,
	striped : true,
	border : true,
	collapsible : false,//是否可折叠的 
	fit : true,//自动大小 
	toolbar:"#searchButton",
	remoteSort : false,
	idField : 'userId',
	singleSelect : true,//是否单选 
	checkOnSelect: true,
	pagination : true,//分页控件 
	//rownumbers : true,//行号 
});
//设置分页控件 
var p = $('#userDataGrid').datagrid('getPager');
$(p).pagination({
	pageSize : 10,//每页显示的记录条数，默认为10 
	pageList : [ 10, 20, 30 ],//可以设置每页记录条数的列表 
	beforePageText : '第',//页数文本框前显示的汉字 
	afterPageText : '页    共 {pages} 页',
	displayMsg : '当前显示 {from} - {to} 条记录   共 {total} 条记录',
	onSelectPage:function(pageNumber, pageSize){
		 searchUserData(pageNumber,pageSize)
	}	 
});
}

//探索emp数据根据code和unitcode
function searchUserData(pageNumber,pageSize){
//   var name = $('#nameSearch').val();
//   var code=$('#codeSearch2').val();
//   var unitCode=$('#unitCodeSearch2').val();
   $("#userDataGrid").datagrid('getPager').pagination({pageSize : pageSize, pageNumber : pageNumber});//重置
   $("#userDataGrid").datagrid("loading"); //加屏蔽
//   if (($('#codeSearch2').val() == ""||$('#unitCodeSearch2').val() == "")) {
//	   $.messager.alert('操作提示', '请同时输入工号和分公司编码');
//	   $("#userDataGrid").datagrid("loaded"); //移除屏蔽
//   }else{
   $("#userDataGrid").datagrid('getPager').pagination({pageSize : pageSize, pageNumber : pageNumber});//重置
   $("#userDataGrid").datagrid("loading"); //加屏蔽
   
   var argData = {'code' : $('#codeSearch2').val(), 'unitCode' : $('#unitCodeSearch2').val(), 'page' : pageNumber, 'rows' : pageSize};
   ajaxSend("/shuck/web/user/searchEmpInfoForUser", argData, "userDataGrid");
//   }

}

function setValue(){
	var group_row = $('#userDataGrid').datagrid('getSelected');
	$("#id2").val(group_row.userId);
	$("#userName2").val(group_row.userName);
	$("#code2").val(group_row.code);
	$("#unitCode2").val(group_row.unitCode);
	$("#name2").val(group_row.unitName);
}


//var arrayList=[];
function initCombobox(){
	var value = "";
	//加载下拉框复选框
	$("#role2").combobox({
        url:'/shuck/web/role/searchRole', //后台获取下拉框数据的url
        method:'post',
        panelHeight:200,//设置为固定高度，combobox出现竖直滚动条
        valueField:'ID',
        textField:'NAME',
        multiple:true,
        formatter: function (row) { //formatter方法就是实现了在每个下拉选项前面增加checkbox框的方法
    		return "<input type='checkbox'  id='"+row.ID+"' value='"+row.ID+"'>"+row.NAME+"</input>";
        },
        onLoadSuccess: function () {  //下拉框数据加载成功调用
        },
        onSelect: function (row) { //选中一个选项时调用
            //获取选中的值的values
            $("#role2").val($(this).combobox('getValues'));
           	oCheckbox = document.getElementById(row.ID);   
            oCheckbox.checked=true;
            
        },
        onUnselect: function (row) {//不选中一个选项时调用
            //获取选中的值的values
            $("#role2").val($(this).combobox('getValues'));
           	oCheckbox = document.getElementById(row.ID);   
            oCheckbox.checked=false;
        }
    });
}

function doAddUser(){
	var roleId = $("#role2").combobox('getValues');
	$.ajax({
		type: "post",
		url: "/shuck/web/user/addUser",
		data: {
			"userId":$("#id2").val(),
			"roleId":roleId.join(),
			"status": $("input[name='status2']").val(),     	
		},
		success: function(result) {
			var group_row = $('#mainGrid').datagrid('getSelected');
			if(result.resultCode == 'success'){
				$.messager.alert('提示','新增用户成功！');
				$('#userDataGrid').datagrid('clearChecked');
//        		$('#mainGrid').datagrid('reload');
				$('#addUserDialog').dialog('close');  
				$('#addUserDialog').datagrid('reload');
				$('#dd').dialog('close');
			} else {
				$.messager.alert('提示', result.resultMsg);
				$('#userDataGrid').datagrid('clearChecked');
				$('#addUserDialog').dialog('close');  
				$('#addUserDialog').datagrid('reload');
			}
		}
	});
}



function initCombobox2(userId){
	var roleList=[];
	var value = "";
	//加载下拉框复选框
	$("#role3").combobox({
        url:'/shuck/web/role/searchRole?userId='+userId, //后台获取下拉框数据的url
        method:'post',
        editable:'true',
        panelHeight:200,//设置为固定高度，combobox出现竖直滚动条
        valueField:'ID',
        textField:'NAME',
        groupField:"STATUS",
        multiple:true,
        formatter: function (row) { //formatter方法就是实现了在每个下拉选项前面增加checkbox框的方法
            var opts = $(this).combobox('options');
            if (row[opts.groupField]==1) {
            	roleList.push(row.ID);
            	return "<input type='checkbox' checked='checked' id='"+row.ID+"2' value='"+row.ID+"'>"+row.NAME+"</input>";
			}else{
				return "<input type='checkbox'  id='"+row.ID+"2' value='"+row.ID+"'>"+row.NAME+"</input>";
			}
        },
        onLoadSuccess: function () {  //下拉框数据加载成功调用
        	  $('#role3').combobox('setValues',roleList);

        },
        onSelect: function (row) { //选中一个选项时调用
            //获取选中的值的values
            $("#role3").val($(this).combobox('getValues'));
           	oCheckbox = document.getElementById(row.ID+'2');   
            oCheckbox.checked=true;
            
        },
        onUnselect: function (row) {//不选中一个选项时调用
            //获取选中的值的values
            $("#role3").val($(this).combobox('getValues'));
           	oCheckbox = document.getElementById(row.ID+'2');   
            oCheckbox.checked=false;
        }
    });
}

function toUpdate(){
	var rows = $('#mainGrid').datagrid('getChecked');
	/*if(rows == '') {
		$.messager.alert('提示','未选择任何数据');
		return;
	}
	if(rows.length > 1) {
		$.messager.alert('提示','不能同时修改多条数据');
		return;
	}*/
	// 重置表单
	$("#updateForm").form('clear');
	var row = rows[0];
	var userId = row.userId;
	var idLocked = row.isLocked;
	if (idLocked == 1) {
		$("#unlock3").show();
	}
	initCombobox2(userId);
	$("#id3").val(row.userId);
//	$(":radio[name='reset3'][value='0']").prop("checked", "checked");
	$(":radio[name='status3'][value='" + row.status + "']").prop("checked", "checked");
	$(":radio[name='unlock3'][value='0']").prop("checked", "checked");
	$('#update').dialog({
	    title: '修改用户',
	    width: 440,
	    height: 300,
	    closed: false,
	    cache: false,
	    modal: true,
	    buttons:[{ //设置下方按钮数组  
	           text:'保存',  
	           iconCls:'icon-ok',  
	           handler:function(){  
	    		  doUpdate();
	    		  $("#unlock3").hide();
	    		  $('#mainGrid').datagrid('clearChecked');
	           }  
	      },{  
	           text:'关闭',
	           iconCls:'icon-cancel',  
	           handler:function(){  
	        	  $('#update').dialog('close');  
	     		  $("#unlock3").hide();
	           }  
	      }]
	});
}
function doUpdate(){
	var roleId = $("#role3").combobox('getValues');
	if($("#updateForm").form('validate')){
		$.ajax({
	        type: "post",
	        url: "/shuck/web/user/updateUser",
	        data: {
	        	"userId":$("#id3").val(),
//	        	"password":$("#password3").val(),
//	        	"newPassword":$("#newPassword3").val(),
	        	"roleId":roleId.join(),
//	        	"reset": $("input[name='reset3']:checked").val(),     	
	        	"status": $("input[name='status3']:checked").val(),    
	        	"unlock": $("input[name='unlock3']:checked").val(),     
	        	},
	        success: function(result) {
	        	var group_row = $('#mainGrid').datagrid('getSelected');
	        	if(result.resultCode == 'success'){
	        		$.messager.alert('提示','修改用户成功！');
	        		$('#update').dialog('close');
//	        		$('#mainGrid').datagrid('reload');
	        		nameSearch(1,10);
	        	} else {
	          		$.messager.alert('提示', result.resultMsg);
	        	}
	        	console.log(result);
        	}
	   });  
	}
}


function toDelete(){
	var rows = $('#mainGrid').datagrid('getChecked');
if(rows == '') {
	$.messager.alert('提示','未选择任何数据');
	return;
}
var ids = [];
$.each(rows,function(index, value, array){
	ids[index] = value.userId;
});
//alert(ids);
$.messager.confirm('提示','您确定禁用这'+rows.length+'条数据?',function(r){
    if (r){
    	$.ajax({
            type: "post",
            url: "/shuck/web/user/deleteUser",
            data: {ids:ids.join()},
            success: function(result) {
            	if(result.resultCode == 'success'){
 //           		$('#mainGrid').datagrid('reload');
            		nameSearch(1,10);
            		$('#mainGrid').datagrid('clearChecked');
            	} else {
            		$.messager.alert('提示','删除失败,请联系系统管理员');
//            		$('#mainGrid').datagrid('reload');
            		nameSearch(1,10);
            		$('#mainGrid').datagrid('clearChecked');
	            	}
	            	console.log(result);
	            }
	        });
	    }
	});
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
$(function(){

	$('#mainGrid').datagrid({  
	title:'用户管理',
	width : 'auto',
	height : 'auto',
	fit:true,
    checkOnSelect: true,
	SelectOnCheck: false,
	remoteSort : false,
	nowrap : false,
	idField : 'userId',
	fitColumns : true,
    singleSelect : false,//是否单选
    checkbox : true,
    detailFormatter:function(index,row){  
        return '<div style="padding:2px"><table id="ddv-' + index + '"></table></div>';  
    },  
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
		nameSearch(pageNumber,pageSize)
	}
  });
}
);
function nameSearch(pageNumber, pageSize){
	   $("#mainGrid").datagrid('getPager').pagination({pageSize : pageSize, pageNumber : pageNumber});//重置
	   $("#mainGrid").datagrid("loading"); //加屏蔽
//	   if ($('#nameSearch').val() == ""&&($('#codeSearch').val() == ""||$('#unitCodeSearch').val() == "")) {
//		   $.messager.alert('操作提示', '请输入姓名或同时输入工号和分公司编码');
//		   $("#mainGrid").datagrid("loaded"); //移除屏蔽
//	   }else {
	   $.ajax({
		   type : "POST",
		   url : "/shuck/web/user/searchUserInfo",
		   data : {
			   'name' : $('#nameSearch').val(),
			   'code' : $('#codeSearch').val(),
			   'unitCode' :  $('#unitCodeSearch').val(),
			   'status' :  $('#statusSearch').combobox('getValue').trim(),
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
//	   }
}


function formatShow(value,row,index){
	if(value==1){
	        return "是";
	    }else{
	        return "否";
	}
	}