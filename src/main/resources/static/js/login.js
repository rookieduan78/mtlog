//点击登录按钮
function login(){  
	if($("#STORECODE").val()==""){
       	alert("门店号为空，请输入");
        /*$("#STORECODE").focus();*/
	}else if($("#STOREPOSWORD").val()==""){
      	alert("密码为空，请输入");  
      /*  $("#STOREPOSWORD").focus();*/
    }else{  
		$.ajax({
			type: "post",
			url: "/getIndex",
            data: {"storeCode":$("#STORECODE").val(),"storePosword":$("#STOREPOSWORD").val()},
		    /*dataType: 'text',*/
			success:function(result){
				if(result.result=='2'){
				  /*  var remFlag = $("input[type='checkbox']").is(':checked');
				    if(remFlag==true){
				    	setCookie("loginCookie",$("#unitCode").val()+"|"+$("#code").val()+"|"+$("#password").val());
				    }else{
				    	delCookie("loginCookie");
				    }*/
					window.location.href= "index.html" ;
				}
				if(result.result=='0'){
					/*$.messager.alert("系统提示","密码错误！");*/
                    alert("门店号或密码错误，请重新输入");
				}
				/*if(result.result=='0'){
					/!*$.messager.alert("系统提示","账号错误！");*!/
                    alert("门店号为空，请输入");
					return;
				}*/
			}
		});
	}   
}  

//加载页面加载cookie
$(document).ready(function(){
    //记住密码功能
    var str = unescape(getCookie("loginCookie"));
    var unitCode = str.split("|")[0];
    var code = str.split("|")[1];
    var password = str.split("|")[2];
    //自动填充员工号、分公司代码和密码
    $("#unitCode").val(unitCode);
    $("#code").val(code);
    $("#password").val(password);
    if(str!=null && str!=""){
        $("input[type='checkbox']").attr("checked", true);
    }
}); 
//获得cookie
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
    }
    return "";
}

//设置cookie
function setCookie(name, value) {  
    var exp = new Date();  
    exp.setTime(exp.getTime() + 30 * 24* 60 * 60 * 1000);  
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";path=/";  
} 

//删除cookies  
function delCookie(name) {  
    var exp = new Date();  
    exp.setTime(exp.getTime() - 30 * 24* 60 * 60 * 1000);  
    var value = getCookie(name);  
    if (value != null)  
        document.cookie = name + "=" + value + ";expires=" + exp.toGMTString() + ";path=/";  
}