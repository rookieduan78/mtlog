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
	    modal: true,
	    onClose: function () {
	    	$('#appName').val("1");
    	    $('#appCode').val("1");
	   },
	    buttons:[{ //设置下方按钮数组  
	           text:'保存',  
	           iconCls:'icon-ok',  
	           handler:function(){  
	        	   var name=$("#appName").val();
       			var code="";
       			if($("#appCode").val()==""){
       				alert("安装包不能为空");
       			}else{
       				$.ajax({
           				type: "post",
           				url: "/shuck/web/app/doJiaoYanByCode",
           				 data: {"code":code,"name":name},
           				success: function(result){
           					if(result.status == 'name'){
           						$.messager.alert('提示','名称已存在，请重新输入');
           						$("#appName").val("");
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
	        	   $('#appName').val("1");
	       	    $('#appCode').val("1");
	         		$('#dd').dialog('close');  
	           }  
	      }]
	});
}

function page_init(){
	var appName = $('#appNameSearch').val();
	$('#mainGrid').datagrid({
		title : '应用版本管理',
		width : 'auto',
		height : 'auto',
		url : "/shuck/web/app/searchApk",
		method : "post",
		queryParams : {'appName':appName},
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
		SelectOnCheck: false,
		pagination : true,//分页控件 
		rownumbers : false,//行号 
		onBeforeLoad:function(prm){
			  prm.appNameSearch = $('#appNameSearch').val()
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
   $("#mainGrid").datagrid('getPager').pagination({pageSize : pageSize, pageNumber : pageNumber});//重置
   $("#mainGrid").datagrid("loading"); //加屏蔽
   $.ajax({
       type : "POST",
       dataType : "json",
       url : "/shuck/web/app/searchApk",
       data : {
    	   'appName' : appName,
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

function uploadFile(id,type){
	var fileNm = $('#'+id).val();
	if(fileNm == '') {
		$.messager.alert('提示',"请选择一个文件.");
		return;
	}
	var fileUrl = '';
	var uploadUrl = "/shuck/web/app/uploadFile";
	if(type == 'image'){
		if(!isImage(fileNm)) {
			var AllImgExt=".jpg|.jpeg|.gif|.bmp|.png|"//全部图片格式类型 
			$.messager.alert('提示',"该文件类型不允许上传.请上传"+AllImgExt+"类型的文件.");
			return;
		}
		fileUrl = $('#iconUrl').val();
		uploadUrl = "/shuck/web/app/uploadIcon";
	} else {
		fileUrl = $('#appUrl').val();
	}
	
	$("#mainForm").ajaxSubmit({
        url : uploadUrl,
        type : 'post',
        data: {
        	"fileNm": fileNm,
        	"appName":$('#appName').val(),
        	"apkUploadPath" : fileUrl
        },
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
        		if(type == 'noimage'){
        			$('#appUrl').val(data.appUrl);
        			$('#lookUrl').val(data.appDownLoadUrl);
        			$('#appCode').val(data.appCode);
        			$('#vsVersion').val(data.versionCode);
        			$('#vsName').val(data.versionName);
        			$('#appMd5').val(data.appMd5);
        		} else if (type == 'image') {
        			$('#iconUrl').val(data.iconUrl);
        		}
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
	$("#mainForm").form('clear');
	updateTr();
	var row = rows[0];
	$('#id').val(row.id);
	$('#appName').val(row.appName);
	$('#appMd5').val(row.appMd5);
	$('#appType').combobox('setValue',row.appType); 
	$('#iconUrl').val(row.iconUrl);
	$(":radio[name='status'][value='" + row.status + "']").prop("checked", "checked");
	$(":radio[name='isDisplay'][value='" + row.isDisplay + "']").prop("checked", "checked");
	$(":radio[name='isOffLine'][value='" + row.isOffLine + "']").prop("checked", "checked");
	$(":radio[name='isForce'][value='" + row.isForce + "']").prop("checked", "checked");
	$('#seq').numberbox('setValue', row.seq);
	$('#isSure').val(row.isSure);
	$('#remark').val(row.remark);
	$('#title').val(row.title);
	$('#dd').dialog({
	    title: '修改原生应用',
	    width: 500,
	    height: 400,
	    closed: false,
	    cache: false,
	    modal: true,
	    onClose: function () {
	    	$('#appName').val("1");
    	    $('#appCode').val("1");
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
	        	   $('#appName').val("1");
	        	    $('#appCode').val("1");
	         		$('#dd').dialog('close');  
	           }  
	      }]
	});
}

function toUpgrade(){
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
	shengjiTr();
	var row = rows[0];
	$('#id').val(row.id);
	$('#appName').val(row.appName);
	$('#appCode').val(row.appCode);
	$('#lookUrl').val(row.lookUrl);
	$('#appType').val(row.appType);
	$('#appMd5').val(row.appMd5);
	$('#appType').combobox('setValue',row.appType); 
	$('#iconUrl').val(row.iconUrl);
	$(":radio[name='status'][value='" + row.status + "']").prop("checked", "checked");
	$(":radio[name='isDisplay'][value='" + row.isDisplay + "']").prop("checked", "checked");
	$(":radio[name='isOffLine'][value='" + row.isOffLine + "']").prop("checked", "checked");
	$(":radio[name='isForce'][value='" + row.isForce + "']").prop("checked", "checked");
	$('#seq').numberbox('setValue', row.seq);
	$('#vsName').val(row.vsName);
	$('#vsVersion').val(row.vsVersion);
	$('#isSure').val(row.isSure);
	$('#remark').val(row.remark);
	$('#title').val(row.title);
	$('#dd').dialog({
	    title: '升级原生应用',
	    width: 500,
	    height: 400,
	    closed: false,
	    cache: false,
	    modal: true,
	    onClose: function () {
	    	$('#appName').val("1");
    	    $('#appCode').val("1");
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
	        	   $('#appName').val("1");
	       	    $('#appCode').val("1");
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
		ids[index] = value.id;
	});
	//alert(ids);
	$.messager.confirm('提示','您确定删除这'+rows.length+'条数据?',function(r){
	    if (r){
	    	$.ajax({
	            type: "post",
	            url: "/shuck/web/app/doDeleteEntity",
	            data: {ids:ids.join()},
	            success: function(result) {
	            	if(result.status == 'success'){
	            		searchData(1,10);
	            		$('#mainGrid').datagrid('clearChecked');
	            	} else {
	            		$.messager.alert('提示','删除失败,请联系系统管理员');
	            		searchData(1,10);
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
	        url: "/shuck/web/app/doSaveOrUpdateEntity",
	        data: $("#mainForm").serialize(),
	        success: function(result) {
	        	if(result.status == 'success'){
	        		//$.messager.alert('提示','保存成功');
	        		$("#mainForm").form('clear');
	        		$('#dd').dialog('close');
	        		searchData(1,10);
	        	} else {
	        		$.messager.alert('提示','保存失败,请联系系统管理员');
	        	}
	        	console.log(result);
	        }
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
	$("#apptr1").hide();
	$("#apptr2").hide();
	$("#apptr3").hide();
	$("#apptr4").hide();
	$("#apptr5").hide();
	$("#apptr12").hide();
	$("#apptr13").hide();
	$("#apptr14").hide();
	$("#apptr11").hide();
	$("#apptrRelease").hide();
	
	$("#apptr6").show();
	$("#apptr7").show();
	$("#apptr8").show();
	$("#apptr9").show();
	$("#apptr15").show();
}

function addTr(){
	$("#apptrRelease").show();
	for(var i = 1; i < 16; i++){
		if( $("#apptr"+i)){
			$("#apptr"+i).show();  
		}
	} 
}

function shengjiTr(){
	$("#apptrRelease").show();
	$("#apptr1").show();
	$("#apptr2").show();
	$("#apptr3").show();
	$("#apptr4").show();
	$("#apptr12").show();
	$("#apptr13").show();
	$("#apptr14").show();
	$("#apptr5").hide();
	$("#apptr6").hide();
	$("#apptr7").hide();
	$("#apptr8").hide();
	$("#apptr9").hide();
	$("#apptr11").hide();
	$("#apptr15").hide();
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

function downLoadFile(index){
	$('#mainGrid').datagrid('selectRow',index);
	var row = $('#mainGrid').datagrid('getSelected');
	var appCode = row.appCode;
	var fileName = row.filePath;
	if ((!!fileName) && fileName != "") {
        var names;
        if(fileName.indexOf("\\")>0){
        	names = fileName.split("\\");
        }else{
        	names = fileName.split("/");
        }
        fileName =  names[names.length - 1];
    }
	window.location.href='/acmp/app/downLoad?fileName='+fileName +'&appCode='+ appCode;
}

function showDownPath(index){
	$('#mainGrid').datagrid('selectRow',index);
	var row = $('#mainGrid').datagrid('getSelected');
	var appDownLoadUrl = row.lookUrl;
	$('#downLoadPathText').html(appDownLoadUrl);
	$('#downPath').dialog({
	    title: '下载地址',
	    width: 600,
	    height: 200,
	    closed: false,
	    cache: false,
	    modal: true,
	    buttons:[{  
	           text:'关闭',
	           iconCls:'icon-cancel',  
	           handler:function(){  
	         		$('#downPath').dialog('close');  
	           }  
	      }]
	});
}

function formatterDownLoad(val,row,index){
	//return '<a id="showMsg" href="javascript:void(0);" onclick="downLoadFile('+index+');">'+val+'</a>';
	return '<a id="showMsg" href="javascript:void(0);" onclick="showDownPath('+index+');">'+'查看'+'</a>';
}