function toAdd(){
	$("#shezhi" ).css("display", "none"); 
	// 重置表单
	$("#mainForm").form('clear');
	$("input[name='status'][value='1']").prop("checked","checked");
	// 弹出窗口
	$('#toAddDialog').dialog({
	    title: '增加模块组',
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
	        		   var id="0";
		        	   var name=$("#name").val();
		       			var code=$("#code").val();
		       			$.ajax({
		       				type: "post",
		       				url: "/shuck/web/group/doJiaoYanByCode",
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
	         		$('#toAddDialog').dialog('close');  
	           }  
	      }]
	});
}
function toUpdate(){
	var rows = $('#groupGridList').datagrid('getChecked');
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
	var row = rows[0];
	$('#groupId').val(row.id);
	$('#name').val(row.name);
	$('#code').val(row.code);
	$('#appType').combobox('setValue',row.appType); 
	$('#icon').val(row.icon);
	$(":radio[name='status'][value='" + row.status + "']").prop("checked", "checked");
	$('#sort').numberbox('setValue', row.sort);
	$('#urlNew').val(row.urlNew);
	$('#url').val(row.url);
	$('#remark').val(row.remark);
	$('#toAddDialog').dialog({
	    title: '修改模块组',
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
		       				url: "/shuck/web/group/doJiaoYanByCode",
		       				data: {"code":$("#code").val(),"name":$("#name").val(),"id":$("#groupId").val()},
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
	         		$('#toAddDialog').dialog('close');  
	           }  
	      }]
	});
}

function doAddOrUpdate(){
	if($("#mainForm").form('validate')){
		$.ajax({
	        type: "post",
	        url: "/shuck/web/group/doSaveOrUpdateEntity",
	        data: $("#mainForm").serialize(),
	        success: function(result) {
	        	if(result.status == 'success'){
	        		$.messager.alert('提示','保存成功');
	        		//$("#mainForm").form('clear');
	        		$('#toAddDialog').dialog('close');
	        		//$('#groupGridList').datagrid('reload');
	        		 searchData(1,10);
	        	}
	        	else {
	        		$.messager.alert('提示','保存失败,请联系系统管理员');
	        	}
	        	console.log(result);
	        }
	    });
	}
}
function doShezhi(){
	$("#shezhi" ).css("display", "block"); 
	var rows = $('#groupGridList').datagrid('getChecked');
	if(rows == '') {
		$.messager.alert('提示','未选择任何数据');
		return;
	}
	if(rows.length > 1) {
		$.messager.alert('提示','不能同时设置多条数据');
		return;
	}
	var groupId=rows[0].id; 
	 $.ajax({
	       type : "POST",
	       url : "/shuck/web/group/searchGroupRelation",
	       dataType : "json",
	       data : {
	    	   'groupId' : groupId
	       },
	       success : function(data) {
	    	   for(var i=0 ;i<data.length;i++){ //几个人有几个checkboxdata[i].name
                  if(data[i].status=='0'){
                	  $("#att").append("<input style='margin-bottom:10px' type='checkbox'  id='mn' checked='checked'   value='"+data[i].moduleId+"' name='header'/><label for='western'>"+data[i].name+"</label>")
                	  /*.append(i%2!=0?("<br / >"):"");*/
                	  .append("<br / >");
                  } else{
                	  $("#att").append("<input type='checkbox' style='margin-bottom:10px'  id='mn'    value='"+data[i].moduleId+"' name='header'/><label for='western'>"+data[i].name+"</label>")
                	  /*.append(i%2!=0?("<br / >"):"")*/
                	  .append("<br / >");
                  }
	           }
	       },
	       error : function(err) {
	    	   console.info(err);
	           $.messager.alert('错误');
	       }
	   }); 
	 $('#shezhi').dialog({
	    title: '设置',
	    width: 500,
	    height: 400,
	    closed: false,
	    cache: false,
	    modal: true ,
	    buttons:[{ //设置下方按钮数组  
	           text:'保存',  
	           iconCls:'icon-ok',  
	           handler:function(){  
	               var arr = new Array();
	                $('input[name="header"]:checked').each(function(i){
	                    arr[i] = $(this).val();
	                });
	                var vals = arr.join(",");  //选中的要绑定的模块
	                doAddShezhi(vals,groupId)
	                $('#shezhi').dialog('close');
	                $("#att").empty();
	           }  
	      },{  
	           text:'关闭',
	           iconCls:'icon-cancel',  
	           handler:function(){  
	         		$('#shezhi').dialog('close');  
	         		$("#att").empty();
	           },
	      
	      }] 
	});
	 $('#shezhi').dialog({  
		    onClose:function(){  
		    	$("#att").empty();  
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
function doAddShezhi(vals,code){
	 $.ajax({
       type: "post",
       url: "/shuck/web/group/doSaveRealation",
       data: {modelId:vals,groupId:code},
       success: function(result) {
       	if(result.status == 'success'){
       		$.messager.alert('提示','保存成功');
       		$('#groupGridList').datagrid('reload');
       	} else {
       		$.messager.alert('提示','保存失败,请联系系统管理员');
       	}
       }
   });  
}

function doDeleteEntity(){
	var rows = $('#groupGridList').datagrid('getChecked');
	if(rows == '') {
		$.messager.alert('提示','未选择任何数据');
		return;
	}
	var ids = [];
	$.each(rows,function(index, value, array){
		ids[index] = value.id;
	});
	//alert(ids);
	var row = rows[0];
	if(row.status=='0'){
		$.messager.alert('提示',' 该模块组已禁用');
		return;
	}
	$.messager.confirm('提示','您确定禁用这'+rows.length+'条数据?',function(r){
	    if (r){
	    	$.ajax({
	            type: "post",
	            url: "/shuck/web/group/doDeleteEntity",
	            data: {ids:ids.join()},
	            success: function(result) {
	            	if(result.status == 'success'){
	            		$('#groupGridList').datagrid('reload');
	            		$('#groupGridList').datagrid('clearChecked');
	            		searchSta(1,10);
	            	} else {
	            		$.messager.alert('提示','禁用失败,请联系系统管理员');
	            		$('#groupGridList').datagrid('reload');
	            		$('#groupGridList').datagrid('clearChecked');
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
	var appName = $('#appNameSearch').val();
	$('#groupGridList').datagrid({  
		url : "/shuck/web/group/searchAppModelGroup",
		method : "post",
		queryParams : {'name':appName,'status':$('#status').combobox('getValue').trim()},
		title:'模块组管理',
		width : 'auto',
		height : 'auto',
		fit:true,
	    view: detailview,
	    checkOnSelect: true,
		SelectOnCheck: false,
		remoteSort : false,
		idField : 'id',
	    singleSelect : true,//是否单选
	    detailFormatter:function(index,row){  
	        return '<div style="padding:2px"><table id="ddv-' + index + '"></table></div>';  
	    },  
	    onExpandRow: function(index,row){  
	        $('#ddv-'+index).datagrid({  
	            url:'/shuck/web/group/searchZiModel?groupId='+row.id,  
	            fitColumns:true,  
	            singleSelect:true,  
	            rownumbers:true,  
	            loadMsg:'',  
	            height:'auto',  
	            columns:[[  
	                {field:'id',title:'id',width:100, hidden:'true'},  
	                {field:'name',title:'模块名称',width:100},
	                {field:'code',title:'模块编码',width:100},  
	                {field:'status',title:'状态(1有效，0无效)',width:100,hidden:'true'},
	                {field:'remark',title:'模块介绍',width:100},
	                {field:'sort',title:'排序',width:100,hidden:'true'},
	                {field:'icon',title:'图标',width:100,hidden:'true'},
	                {field:'url',title:'路径',width:100,hidden:'true'},
	                {field:'urlNew',title:'新路径',width:100,hidden:'true'}, 
	            ]],  
	            onResize:function(){  
	                $('#groupGridList').datagrid('fixDetailRowHeight',index);  
	            },  
	            onLoadSuccess:function(){  
	                setTimeout(function(){  
	                    $('#groupGridList').datagrid('fixDetailRowHeight',index);  
	                },0);  
	            }  
	        });  
	        $('#groupGridList').datagrid('fixDetailRowHeight',index);  
	    }  
	}); 
	//设置分页控件 
	var p = $('#groupGridList').datagrid('getPager');
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
});
function searchData(pageNumber, pageSize){
	   var appName = $('#appNameSearch').val();
	   var appCode	 = $('#appCode').val();
	   $("#groupGridList").datagrid('getPager').pagination({pageSize : pageSize, pageNumber : pageNumber});//重置
	   $("#groupGridList").datagrid("loading"); //加屏蔽
	   $.ajax({
	       type : "POST",
	       dataType : "json",
	       url : "/shuck/web/group/searchAppModelGroup",
	       data : {
	    	   'name' : appName,
	    	   'code':appCode,
	    	   'status':$('#status').combobox('getValue').trim(),
	    	   'page': pageNumber,
			   'rows': pageSize
	       },
	       success : function(data) {
	           $("#groupGridList").datagrid('loadData',data);
	           $("#groupGridList").datagrid("loaded"); //移除屏蔽
	           $('#groupGridList').datagrid('clearChecked');
	       },
	       error : function(err) {
	           $.messager.alert('操作提示', '获取信息失败...请联系管理员!', 'error');
	           $("groupGridList").datagrid("loaded"); //移除屏蔽
	           $('#groupGridList').datagrid('clearChecked');
	       }
	   });
	}



