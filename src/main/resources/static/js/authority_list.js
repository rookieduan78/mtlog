// ====================下面为授权管理页面调后台内容=============================

/* 前端展示授权管理页面，通过查询emp表，展示User数据 */
$(function() {
	$('#mainGrid')
			.datagrid(
					{
						title : '用户应用授权',
						width : 'auto',
						height : 'auto',
						fitColumns : true,// 使列自动展开/收缩列的宽度以适应网格的宽度，防止水平滚动
						fit : true,
						// rownumbers : true,// 行号
						singleSelect : true,// 是否单选
						checkOnSelect : true,
						SelectOnCheck : false,
						remoteSort : false,
						idField : 'userId',
						// 展示出来的字段及属性
						columns : [ [
								{
									field : 'userId',
									title : 'userId',
									width : 150,
									hidden : true
								// 隐藏
								},
								{
									field : 'name',
									title : '用户名',
									width : 150,
									align : 'center'
								},
								{
									field : 'code',
									title : '工号',
									width : 150,
									align : 'center'
								},
								{
									field : 'unitCode',
									title : '分公司编码',
									width : 150,
									align : 'center'
								},
								{
									field : 'unitName',
									title : '分公司名称',
									width : 150,
									align : 'center'
								},
								{
									field : 'cpicuid',
									title : 'P13账号',
									width : 150,
									align : 'center'
								},
								{
									field : 'status',
									title : '是否有效',
									width : 150,
									align : 'center',
									formatter : formatterData
								},
								{
									field : 'set',
									title : '操作',
									width : 150,
									align : 'center',
									// '设置'功能
									formatter : function(value, row, index) {
										var str = '&nbsp;';
										str += $
												.formatString(
														'<a href="javascript:void(0)" style="color:blue" name="set" class="easyui-linkbutton"  onclick="doSet(\'{0}\');" >设置</a>',
														row.userId);
										return str;
									}
								} ] ],
						// 设置按钮的属性
						onLoadSuccess : function(data) {
							$("a[name='set']").linkbutton({
								text : '设置',
								plain : true,
								iconCls : 'icon-item'
							});
						},
					});
	var p = $('#mainGrid').datagrid('getPager');
	$(p).pagination({
		pageSize : 10,// 每页显示的记录条数，默认为10
		pageList : [ 10, 20, 30 ],// 可以设置每页记录条数的列表
		beforePageText : '第',// 页数文本框前显示的汉字
		afterPageText : '页    共 {pages} 页',
		displayMsg : '当前显示 {from} - {to} 条记录   共 {total} 条记录',
		onSelectPage : function(pageNumber, pageSize) {
//			if (($('#userCodeSearch').val() == "" || $('#userCodeSearch').val() == "") && $('#cpicuidSearch').val() == "" && $('#uerNameSearch').val() == "") {
//				searchDataAll(pageNumber, pageSize);
//			}else{
//				searchData(pageNumber, pageSize);
//			}
			searchData(pageNumber, pageSize);
		}
	});
});

$.formatString = function(str) {
	for (var i = 0; i < arguments.length - 1; i++) {
		str = str.replace("{" + i + "}", arguments[i + 1]);// 后面的替换前面的
	}
	return str;
};

// 处理状态格式化，user表 1 有效，emp表 0 有效
function formatterData(val) {
	if (val == 1) {
		return "是";
	} else if (val == 0) {
		return "否";
	}
}
/* 通过传参与后台交互获得数据 ,搜索功能 */
function searchData(pageNumber, pageSize) {
	$("#mainGrid").datagrid('getPager').pagination({
		pageSize : pageSize,
		pageNumber : pageNumber
	});// 重置
	$("#mainGrid").datagrid("loading"); // 加屏蔽
	var unitCode = $('#userUintCodeSearch').val();// 获得分公司编码
	var code = $('#userCodeSearch').val();// 获得员工号
	var name = $('#uerNameSearch').val();// 获得用户名
//	var cpicuid = $('#cpicuidSearch').val();// 获得用户名
	var status = $('#userStatusSearch').combobox('getValue').trim();// 获得状态，是否有效

	/*if ((code == "" || unitCode == "") && cpicuid == "" && name == "") {
		$.messager.alert('操作提示', '请输入工号和分公司编码或p13账号!');
		$("#mainGrid").datagrid("loaded"); // 移除屏蔽
	} else {*/
	$.ajax({
				type : "POST",
				dataType : "json",
				// 此路径不可删除，在搜索模块组中查询使用
				url : "/shuck/web/authority/searchByNameAndCodeAndUnitCodeAndState",
				data : {
					'unitCode' : unitCode,
					'code' : code,
					'name' : name,
//					'cpicuid' : cpicuid,
					'status' : status,
					'page' : pageNumber,
					'rows' : pageSize
				},
				success : function(data) {
					$("#mainGrid").datagrid('loadData', data);// loadData:加载本地数据，旧的行将被移除。
					$("#mainGrid").datagrid("loaded"); // 移除屏蔽
				},
				error : function(err) {
					$.messager.alert('操作提示', '获取信息失败...请联系管理员!', 'error');
					$("mainGrid").datagrid("loaded"); // 移除屏蔽
				}
			});
}
/* 点击用户权限授权，可以查询书所有数据 并 实现分页*/
//function searchDataAll(pageNumber, pageSize) {
//	$("#mainGrid").datagrid('getPager').pagination({
//		pageSize : pageSize,
//		pageNumber : pageNumber
//	});// 重置
//	$("#mainGrid").datagrid("loading"); // 加屏蔽
//	var unitCode = $('#userUintCodeSearch').val();// 获得分公司编码
//	var code = $('#userCodeSearch').val();// 获得员工号
//	var name = $('#uerNameSearch').val();// 获得用户名
//	var cpicuid = $('#cpicuidSearch').val();// 获得用户名
//	var status = $('#userStatusSearch').combobox('getValue').trim();// 获得状态，是否有效
//	$.ajax({
//					type : "POST",
//					dataType : "json",
//					// 此路径不可删除，在搜索模块组中查询使用
//					url : "/shuck/web/authority/searchByNameAndCodeAndUnitCodeAndState",
//					data : {
//						'unitCode' : unitCode,
//						'code' : code,
//						'name' : name,
//						'cpicuid' : cpicuid,
//						'status' : status,
//						'page' : pageNumber,
//						'rows' : pageSize
//					},
//					success : function(data) {
//						$("#mainGrid").datagrid('loadData', data);// loadData:加载本地数据，旧的行将被移除。
//						$("#mainGrid").datagrid("loaded"); // 移除屏蔽
//					},
//					error : function(err) {
//						$.messager.alert('操作提示', '获取信息失败...请联系管理员!', 'error');
//						$("mainGrid").datagrid("loaded"); // 移除屏蔽
//					}
//				});
//}

// ===========================处理设置，包括增 删 查====================================
function doSet(id) {
	$("#doSet").css("display", "block"); // 不为被隐藏的对象保留其物理空间，即该对象在页面上彻底消失。
	var userId = id;
	$
			.ajax({
				type : "POST",
				url : "/shuck/web/authority/searchGroupNames",
				dataType : "json",
				data : {
					'userId' : id
				},
				success : function(data) {
					for (var i = 0; i < data.length; i++) { // 几个人有几个checkboxdata[i].name
						if (data[i].status == '0') {
							$("#att")
									.append(
											"<input style='margin-bottom:10px;margin-left:30px ' type='checkbox'  id='mn' checked='checked'   value='"
													+ data[i].id
													+ "' name='header'/><label for='western'>"
													+ data[i].name + "</label>")
									.append("<br / >");
						} else {
							$("#att")
									.append(
											"<input type='checkbox' style='margin-bottom:10px;margin-left:30px'  id='mn'    value='"
													+ data[i].id
													+ "' name='header'/><label for='western'>"
													+ data[i].name + "</label>")
									.append("<br / >");
						}
					}
					
				},
				error : function(err) {
					console.info(err);
					$.messager.alert('错误');
				}
			});
	// 点击设置后，弹框的属性
	$('#doSet').dialog({
		title : '设置',
		width : 400,
		height : 350,
		closed : false,
		cache : false,
		modal : true,// 定义是否将窗体显示为模式化窗口
		buttons : [ { // 设置下方按钮数组
			text : '保存',
			iconCls : 'icon-ok',
			handler : function() {
				var arr = new Array();
				$('input[name="header"]:checked').each(function(i) {
					arr[i] = $(this).val();
				});
				var vals = arr.join(","); // 选中的要绑定的模块
				doAddSet(vals, userId)
				$('#doSet').dialog('close');
				$("#att").empty();
				//如果有条件重新查询下
				searchData(1,10);
			}
		}, {
			text : '关闭',
			iconCls : 'icon-cancel',
			handler : function() {
				$('#doSet').dialog('close');
				$("#att").empty();
			}
		} ]
	});
	$('#doSet').dialog({
		onClose : function() {
			$("#att").empty();
		}
	});
}

function doAddSet(vals, userId) {
	$.ajax({
		type : "post",
		url : "/shuck/web/authority/doSaveRealation",
		data : {
			groupId : vals,
			userId : userId
		},
		success : function(result) {
			if (result.status == 'success') {
				$.messager.alert('提示', '保存成功');
				//$('#mainGrid').datagrid('reload');
			} else {
				$.messager.alert('提示', '保存失败,请联系系统管理员');
			}
		}
	});
}
