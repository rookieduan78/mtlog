/*******************************************************************************
 * 批量导入用户
 */

function importUser() {
	var group_row = $('#mainGrid').datagrid('getSelected');
	/*if (group_row == null) {
		$.messager.alert('提示', '未选择任何数据');
		return;
	}*/
	//var groupId = group_row.id;
	//$("#impory_groupId").val(groupId);
	$('#importUser')
			.dialog({
					title : '导入',
					width : 510,
					height : 300,
					modal : true,
					buttons : [
						{ // 设置下方按钮数组
						text : '确定',
						iconCls : 'icon-ok',
						handler : function() {
							// 获取上传文件控件内容
							var file = document.getElementById('file').files[0];
							// 判断控件中是否存在文件内容，如果不存在，弹出提示信息，阻止进一步操作
							if (file == null) {
								alert('提示:请选择文件!');
								return;
							}
							// 获取文件名称
							var fileName = file.name;
							var file_typename = fileName.substring(
									fileName.lastIndexOf('.'),
									fileName.length);
							if (file_typename != '.xlsx') {
								alert("提示:文件类型错误！");
								return;
							}
							//点击确定之后，这里做提交表单，验证表单处理start
							$("#impory_groupId").val($('#classType').combobox('getValue'));
							//校验表单是否可以通过，如果通过则提交，并且出现进度条，如果不通过，则return false禁止提交。
							var isValid = $("#importForm").form('validate');
							if (!isValid) {
								$.messager.alert('提示', '未选择模块组！');
								return ;
							}
							//不能用表单提交，用ajax发送
							var formData = new FormData($('#importForm')[0]);
							$.ajax({
								type : "POST",
								dataType : "json",
								// 此路径不可删除，在搜索模块组中查询使用
								url : "/shuck/web/authority/analysisExcel",
								data :formData ,
								success : function(result) {
									//主要就根据后台返回的数据进行判断，方便显示导入失败的datagrid
									if(result.resultCode==1){//成功
										$('#importUser').dialog('close');
										$.messager.alert('提示', result.resultMsg);
									}else if(result.resultCode==2){//excel为空
										$('#importUser').dialog('close');
										$.messager.alert('提示', result.resultMsg);
									}else if(result.resultCode==0){//显示失败数据
										//初始化一个导入失败的datagrid,将错误数据显示出来
										var data=result.responseBody;
										$("#message").show();
										$('#datagrid_faillist').datagrid({
											// title : '应用程序管理',
											width : 'auto',
											height : 300,
											closed : false,
											fitColumns : true,
											scrollbarSize : 0,
											cache : false,
											modal : true,
											url : '',
											data:data,
											columns : [ [ {
												field : 'name',
												title : '姓名',
												width : 30
											}, {
												field : 'code',
												title : '工号',
												width : 30
											}, {
												field : 'unitCode',
												title : '分公司编码',
												width : 30,
												align : 'right'
											}, {
												field : 'p13Code',
												title : 'p13账号',
												width : 30,
												align : 'right'
											}, {
												field : 'msg',
												title : '失败原因',
												width : 50,
												align : 'right'
											},] ],
											//method : "post",
											nowrap : false,
											striped : true,
											border : true,
											//collapsible : false,// 是否可折叠的
											fit : true,// 自动大小
											//toolbar : "#searchButton",
											remoteSort : false,
											//idField : 'empID',
											singleSelect : true,// 是否单选
											//checkOnSelect : true,
											//pagination : true,// 分页控件
											rownumbers : true,//行号

										});
										
									}
								},
								error : function(err) {
									$.messager.alert('操作提示', '获取信息失败...请联系管理员!', 'error');
									//$("mainGrid").datagrid("loaded"); // 移除屏蔽
								},
								contentType : false,
								processData : false
								
								
							});
							/*$('#importForm').form({
								url : '/shuck/web/authority/analysisExcel',
								onSubmit : function() {
									//提交之前，将combox的值获取到，然后复制给表单里面的隐藏框，然后将groupId送过去
									$("#impory_groupId").val($('#classType').combobox('getValue'));
									//校验表单是否可以通过，如果通过则提交，并且出现进度条，如果不通过，则return false禁止提交。
									var isValid = $("#importForm").form('validate');
									if (!isValid) {
										$.messager.alert('提示', '未选择模块组！');
									}
									return isValid;
								},
								success : function(result) {
									result = $.parseJSON(result);
									//主要就根据后台返回的数据进行判断，方便显示导入失败的datagrid
									if(result.resultCode==1){
										$('#importUser').dialog('close');
										$.messager.alert('提示', result.resultMsg);
									}else{
										//初始化一个导入失败的datagrid,将错误数据显示出来
										var data=result.responseBody;
										$("#message").show();
										$('#datagrid_faillist').datagrid({
											// title : '应用程序管理',
											width : 'auto',
											height : 300,
											closed : false,
											fitColumns : true,
											scrollbarSize : 0,
											cache : false,
											modal : true,
											url : '',
											data:data,
											columns : [ [ {
												field : 'name',
												title : '姓名',
												width : 30
											}, {
												field : 'code',
												title : '工号',
												width : 30
											}, {
												field : 'unitCode',
												title : '分公司编码',
												width : 30,
												align : 'right'
											}, {
												field : 'p13Code',
												title : 'p13账号',
												width : 30,
												align : 'right'
											}, {
												field : 'msg',
												title : '失败原因',
												width : 50,
												align : 'right'
											},] ],
											//method : "post",
											nowrap : false,
											striped : true,
											border : true,
											//collapsible : false,// 是否可折叠的
											fit : true,// 自动大小
											//toolbar : "#searchButton",
											remoteSort : false,
											//idField : 'empID',
											singleSelect : true,// 是否单选
											//checkOnSelect : true,
											//pagination : true,// 分页控件
											rownumbers : true,//行号

										});
										
									}
								}
							});
							//点击确定验证之后，这里做提交表单，操作end
							$("#importForm").submit();*/
							
						}
					},
					{
						text : '取消',
						iconCls : 'icon-cancel',
						handler : function() {
							$('#importUser').dialog('close');
							window.location.href='/shuck/web/authority/listView';
						}
						} 
				      ],
				      onOpen:function(){
				    	  $('#classType').combobox({
				              url: '/shuck/web/group/findGroupByStatus',
				              width:100,
				              method: 'post',
				              valueField: 'id',
				              textField: 'name',
				              editable: false,
				              panelHeight: 'auto',
				              required:true
				          });
				      }
					});
	
	
}
