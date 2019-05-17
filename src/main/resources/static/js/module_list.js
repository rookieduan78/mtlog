function toAdd(){
	// 重置表单
	$("#moduleForm").form('clear');
	$("input[name='status'][value='1']").prop("checked","checked");
	// 弹出窗口
	$('#moduleDialog').dialog({
	    title: '修改密码',
	    width: 550,
	    height: 400,
	    closed: false,
	    cache: false,
	    modal: true,
	    onClose: function () {
	    	$('#name').val("1");
    	    $('#code').val("1");
	   },
	    buttons:[{ //设置下方按钮数组  
	           text:'确认',
	           iconCls:'icon-ok',  
	           handler:function(){
	        	   if($('#name').val().length>200){
	        		   alert("备注请输入200字以内")
	        	   }else{
	          			$.ajax({
	          				type: "post",
	          				url: "/updatePosword",
	          				data: {"storeCode":$("#code").val(),"storePosword":$("#name").val(),"storeNewPosword":$("#icon").val()},
	          				success: function(result){
								if(result.result=='2'){
									$('#moduleDialog').dialog('close');
									alert("密码修改成功");
								}
								if(result.result=='0'){
									alert("门店号或密码错误，请重新输入");
								}
	          				}
	          			});
	        		   
	        	   }
	           }  
	      },{  
	           text:'取消',
	           iconCls:'icon-cancel',  
	           handler:function(){ 
	        		$('#name').val("1");
	        	    $('#code').val("1");
	         		$('#moduleDialog').dialog('close');  
	           }  
	      }]
	});
}

function doAddOrUpdate(){
	if($("#moduleForm").form('validate')){
		$.ajax({
	        type: "post",
	        url: "/shuck/web/module/doSaveOrUpdateEntity",
	        data: $("#moduleForm").serialize(),
	        success: function(result) {
	        	if(result.status == 'success'){
	        		//$("#moduleForm").form('clear');
	        		$('#moduleDialog').dialog('close');
	        		//$('#mainGrid').datagrid('reload');
	        		 searchData(1,10);
	        	} else {
	        		$.messager.alert('提示','保存失败,请联系系统管理员');
	        	}
	        }
	    });
	}
}
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
function page_init(){
	var orderNo = $('#appNameSearch').val();
	var status	 = $('#status').combobox('getValue').trim();
	var dateKey = $('#dd').datebox('getValue');
	$('#mainGrid').datagrid({
		title : '订单管理模块',
		width : 'auto',
		height : 'auto',
		url : "/getRecord",
		method : "post",
		queryParams : {'orderNo':orderNo,'dateKey':dateKey,'status':status},
		nowrap : false,
		striped : true,
		border : true,
		collapsible : false,//是否可折叠的 
		fit : true,//自动大小 
		//sortName: 'code', 
		//sortOrder: 'desc', 
		remoteSort : false,
		idField : 'orderNo',
		singleSelect : false,//是否单选
		checkOnSelect: true,
		SelectOnCheck: true,
		pagination : true,//分页控件 
		rownumbers : true,//行号
		onBeforeLoad:function(prm){
			  prm.appNameSearch = $('#appNameSearch').val()
			  prm.code= $('#appCode').val()
			  $('#mainGrid').datagrid('clearChecked');
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
	var orderNo = $('#appNameSearch').val();
	var status	 = $('#status').combobox('getValue').trim();
	var dateKey = $('#dd').datebox('getValue');
   $("#mainGrid").datagrid('getPager').pagination({pageSize : pageSize, pageNumber : pageNumber});//重置
   $("#mainGrid").datagrid("loading"); //加屏蔽
   $.ajax({
       type : "POST",
       dataType : "json",
       url : "/getRecord",
       data : {
    	   'orderNo' : orderNo,
		   'dateKey' : dateKey,
    	   'status':$('#status').combobox('getValue').trim(),
    	   'page' : pageNumber,
    	   'rows' : pageSize
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

function uploadFile(id){
	var fileNm = $('#'+id).val();
	if(fileNm == '') {
		$.messager.alert('提示',"请选择一个文件.");
		return;
	}
	if(!isImage(fileNm)) {
		var AllImgExt=".jpg|.jpeg|.gif|.bmp|.png|"//全部图片格式类型 
		$.messager.alert('提示',"该文件类型不允许上传.请上传"+AllImgExt+"类型的文件.");
		return;
	}
	$("#moduleForm").ajaxSubmit({
        url : '/shuck/web/app/uploadIcon',
        type : 'post',
        beforeSend: function () {
            $.messager.progress({
                title: '提示',
                msg: '文件上传中，请稍候……',
                text: ''
            });
        },
        complete: function () {
            $.messager.progress('close');
        },
        success:function(data){
        	if(data.status == 'success'){
        		$.messager.alert('提示','文件上传成功');
       			$('#icon').val(data.iconUrl);
        	} else {
        		$.messager.alert('提示','文件上传失败');
        	}
        },
        error:function(XmlHttpRequest,textStatus,errorThrown){
          console.log(XmlHttpRequest);
          console.log(textStatus);
          console.log(errorThrown);
          $.messager.alert('提示','系统错误,请联系系统管理员');
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
	$("#moduleForm").form('clear');
	var row = rows[0];
	$('#id').val(row.id);
	$('#name').val(row.name);
	$('#code').val(row.code);
	$('#appType').combobox('setValue',row.appType); 
	$('#icon').val(row.icon);
	$(":radio[name='status'][value='" + row.status + "']").prop("checked", "checked");
	$('#sort').numberbox('setValue', row.sort);
	$('#urlNew').val(row.urlNew);
	$('#url').val(row.url);
	$('#remark').val(row.remark);
	$('#moduleDialog').dialog({
	    title: '修改模块',
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
	        	   }else{
	        		   $.ajax({
		       				type: "post",
		       				url: "/shuck/web/module/doJiaoYanByCode",
		       				data: {"code":$("#code").val(),"name":$("#name").val(),"id":$("#id").val()},
		       				success: function(result){
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
	         		$('#moduleDialog').dialog('close');  
	           }  
	      }]
	});
}


function doDeleteEntity(){
	var rows = $('#mainGrid').datagrid('getChecked' );
	if(rows == '') {
		$.messager.alert('提示','未选择任何数据');
		return;
	}
	var ids = [];
	$.each(rows,function(index, value, array){
		//ids[index] = value.orderNo;
		ids[index] = value;
	});
	var row = rows[0];
	if(row.status=='1'){
		$.messager.alert('提示',' 该订单已推送');
		return;
	}
	$.messager.confirm('提示','您确定推送这'+rows.length+'条订单?',function(r){
	    if (r){
	    	$.ajax({
	            type: "post",
	            url: "/sendRecord",
	           // data: {ids:ids.join()},
				data:{"params":JSON.stringify(ids)},
				dataType : 'json',
	            success: function(result) {
	            	if(result.status == 'success'){
						$.messager.alert('提示','推送成功');
	            		$('#mainGrid').datagrid('reload');
	            		$('#mainGrid').datagrid('clearChecked');
	            		 searchData(1,10);
	            	} else {
	            		$.messager.alert('提示','推送失败,请联系系统管理员');
	            		$('#mainGrid').datagrid('reload');
	            		$('#mainGrid').datagrid('clearChecked');
	            	}
	            	console.log(result);
	            }
	        });
	    }
	});
}
function signout(){
	window.location.href= "index.html" ;
}


function formatterData(val,row) {
	if(val == 0){
		return "否";
	} else if (val == 1) {
		return "是";
	}
}
//datagrid的列换行
function  formatterData1(value,row,index) {
	if(value==null){
		return '';
	}
    return '<div style="width=100px;word-break:break-all; word-wrap:break-word;white-space:pre-wrap;">'+value+'</div>';
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


function isImage(str){
	 //判断是否是图片 - strFilter必须是小写列举
    var strFilter=".jpeg|.gif|.jpg|.png|.bmp|.pic|"
    if(str.indexOf(".")>-1)
    {
        var p = str.lastIndexOf(".");
        var strPostfix=str.substring(p,str.length) + '|';        
        strPostfix = strPostfix.toLowerCase();
        if(strFilter.indexOf(strPostfix)>-1)
        {
            return true;
        }
    }        
    return false;      
}


