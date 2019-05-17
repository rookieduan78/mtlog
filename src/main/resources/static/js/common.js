function ajaxSend(url, argData, datagridId) {
	$.ajax({
		type : "POST",
		dataType : "json",
		url : url,
		data : argData,
		success : function(data) {
			$("#" + datagridId).datagrid('loadData', data);
			$("#" + datagridId).datagrid("loaded"); // 移除屏蔽
		},
		error : function(err) {
			$.messager.alert('操作提示', '获取信息失败...请联系管理员!', 'error');
			$("#" + datagridId).datagrid("loaded"); // 移除屏蔽
		}
	});
}

function ajaxSendReload(url, argData, datagridId, messager) {
	$.ajax({
		type : "POST",
		dataType : "json",
		url : url,
		data : argData,
		success : function(data) {
			$.messager.alert('操作提示', messager);
			$("#" + datagridId).datagrid("reload");
		},
		error : function(err) {
			$.messager.alert('操作提示', '操作失败...请联系管理员!', 'error');
		}
	});
}
function ajaxSendReSearch(url, argData, datagridId, messager) {
	$.ajax({
		type : "POST",
		dataType : "json",
		url : url,
		data : argData,
		success : function(data) {
			$.messager.alert('操作提示', messager);
			searchData(1,10);
		},
		error : function(err) {
			$.messager.alert('操作提示', '操作失败...请联系管理员!', 'error');
		}
	});
}