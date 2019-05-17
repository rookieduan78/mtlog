$(document).ready(function() {
			$.extend($.fn.validatebox.defaults.rules, {
				number : {
					validator : function(value, param) {
						return /^[0-9]+.?[0-9]*$/.test(value);
					},
					message : '请输入数字'
				}
			});

			page_init();
		});

		function page_init() {
			var appName = $('#appNameSearch').val();
			$('#mainGrid').datagrid({
				title : '历史记录',
				width : 'auto',
				height : 'auto',
				url : "/shuck/web/app/searchApkHistory",
				method : "post",
				queryParams : {
					'appName' : appName
				},
				nowrap : false,
				striped : true,
				border : true,
				collapsible : false,//是否可折叠的 
				fit : true,//自动大小 
				//sortName: 'code', 
				//sortOrder: 'desc', 
				remoteSort : false,
				idField : 'psk',
				singleSelect : true,//是否单选 
				checkOnSelect : true,
				SelectOnCheck : false,
				pagination : true,//分页控件 
				rownumbers : false
				
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

		function searchData(pageNumber, pageSize) {
			$('#mainGrid').datagrid('clearChecked');
			var appName = $('#appNameSearch').val();
			$("#mainGrid").datagrid('getPager').pagination({
				pageSize : pageSize,
				pageNumber : pageNumber
			});//重置
			$("#mainGrid").datagrid("loading"); //加屏蔽
			$.ajax({
				type : "POST",
				dataType : "json",
				url : "/shuck/web/app/searchApkHistory",
				data : {
					'appName' : appName,
					 'page' : pageNumber,
			    	   'rows' : pageSize
				},
				success : function(data) {
					$("#mainGrid").datagrid('loadData', data);
					$("#mainGrid").datagrid("loaded"); //移除屏蔽
				},
				error : function(err) {
					$.messager.alert('操作提示', '获取信息失败...请联系管理员!', 'error');
					$("mainGrid").datagrid("loaded"); //移除屏蔽
				}
			});
		}

		function formatterDownLoad(val, row, index) {
			var appCode = row.appCode;
			var fileName = val;
			if ((!!fileName) && fileName != "") {
				var names;
				if (fileName.indexOf("\\") > 0) {
					names = fileName.split("\\");
				} else {
					names = fileName.split("/");
				}
				fileName = names[names.length - 1];
			}
			var url = '/shuck/web/appManager/downLoad?fileName=' + fileName + '&appCode='
					+ appCode;
			return '<a id="showMsg" href="' + url + '">' + val + '</a>';
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