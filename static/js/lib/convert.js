// 关于本地存储的相关代码

// 保存数据到本地存储
function saveToLocalStorage(key, value) {
    localStorage.setItem(key, value);
  }
  // 从本地存储中获取数据
  function getFromLocalStorage(key) {
    var value = localStorage.getItem(key);
    if (value) {
      return value;
    }
    return null;
  }
  
  // 从本地存储中移除数据
  function removeFromLocalStorage(key) {
    localStorage.removeItem(key);
  }
  
  // 清空本地存储中的所有数据
  function clearLocalStorage() {
    localStorage.clear();
  }

function generateRandomString(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    // 生成一个随机索引，范围是0到charactersLength-1
    const randomIndex = Math.floor(Math.random() * charactersLength);

    // 将对应索引位置的字符添加到结果字符串中
    result += characters.charAt(randomIndex);
  }

  return result;
}

//
function getFileExtension(magicNumber) {
  switch (magicNumber) {
    case "89504E47":
      return "png";
    case "47494638":
      return "gif";
    case "FFD8FFDB":
    case "FFD8FFE0":
    case "FFD8FFE1":
      return "jpg";
    case "25504446":
      return "pdf";
    case "504B0304":
    case "504B0506":
    case "504B0708":
      return "zip";
    case "52617221":
      return "rar";
    // 添加其他文件类型的判断
    default: {
      $("#convert_status").text("Unknown file type");
      if (confirm("不是常用的文件格式，确定继续下载吗？")) {
        return "bin";
      } else {
        console.log("取消操作");
        return;
      }
    //   return "bin";
    }
  }
}


// 判断是否为base64
function isBase64(input) {
  const base64Regex = /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{4}|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)$/;
  return base64Regex.test(input);
}

document.addEventListener("DOMContentLoaded", function () {
    
  var downloadButton = document.getElementById("downloadButton");
  downloadButton.addEventListener("click", function () {
    var base64Input = document.getElementById("base64Input");
    var base64Data = base64Input.value.trim();
    
    // alert(base64Data);
    if (base64Data) {
      if(isBase64(base64Data)){
        downloadFile(base64Data);
        return
      }
      alert("输入不是base64编码");
      return
      // $("#convert_status").text("不是base64编码");
    } else {
      alert("Base64输入为空");
      // $("#convert_status").text("Base64输入为空");
      // console.log("Base64 input is empty");
    }
  });
});
function showDate(){
  var now = new Date();
  var year = now.getFullYear(); //得到年份
  var month = now.getMonth()+1;//得到月份
  var date = now.getDate();//得到日期
  // var day = now.getDay();//得到周几
  var hour= now.getHours();//得到小时数
  var minute= now.getMinutes();//得到分钟数
  var second= now.getSeconds();//得到秒数
  return hour.toString()+"-"+minute.toString()+"-"+second.toString();   
  // setTimeout(show,1000);//定时器一直调用show()函数
  // return "";
  }
document.addEventListener("DOMContentLoaded", function () {
  var downloadButton = document.getElementById("convert-empty");
  downloadButton.addEventListener("click", function () {
        removeFromLocalStorage("convert_input");
    $("#base64Input").val("");
    // alert(showDate());
    $("#convert_status").text("请在上方文本框中输入Base64编码。");
  });
});




function downloadFile(base64Data) {
  var fileName = "flee-" + generateRandomString(8);
  var byteCharacters = atob(base64Data);
  var byteNumbers = new Array(byteCharacters.length);
  for (var i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  var byteArray = new Uint8Array(byteNumbers);
  // 读取魔术数字
  var magicNumber = byteNumbers
    .slice(0, 4)
    .map(function (byte) {
      return byte.toString(16).toUpperCase().padStart(2, "0");
    })
    .join("");
  var extension = getFileExtension(magicNumber);
  if (!extension) {
    console.log("Unknown file type");

    return;
  }
  var blob = new Blob([byteArray], { type: "" });

  var url = URL.createObjectURL(blob);

  var link = document.createElement("a");
  link.href = url;
  link.download = fileName +"-"+showDate()+ "." + extension;
  link.click();

  URL.revokeObjectURL(url);
}

// function listen_base_convert_by_1() {
  
//   const selectedValue = $('input[type="radio"][name="Base-Convert-1"]').val();
//   $('input[type="radio"][name="Base-Convert-1"]').val([selectedValue]);
//   // const selectedValue = $(this).val();
//   alert(selectedValue);
//   if (selectedValue === '2') {
//     $('#Base-Convert-2').val('2');
//   } else if (selectedValue === '8') {
//     $('#Base-Convert-2').val('16');
//   } else if (selectedValue === '16') {
//     $('#Base-Convert-2').val('16');
//   } else if (selectedValue === '16') {
//     $('#Base-Convert-2').val('16');
//   }
//   const selectedValue2 = $('input[type="radio"][name="Base-Convert-1"]').val();
//   alert(selectedValue2);
//   // $("#Base-Convert-2").val(value);
//   // alert($("#Base-Convert-2").val());
  
// }
// function listen_base_convert_by_2() {
//   var value = $("#Base-Convert-2").val();
//   alert(value);
//   // 选中值为 "option2" 的单选框
// $('input[name="Base-Convert-1"][value="2"]').prop('checked', true);
//   // $("input[name='Base-Convert-1']").val(value);
// }

$(document).ready(function () {

    var base64_input = getFromLocalStorage("convert_input");
    $("#base64Input").val(base64_input);
    $("#base64Input").change(saveInput);
    // 
    // $("input[name='Base-Convert-1']").change(listen_base_convert_by_1);
    // $("#Base-Convert-2").change(listen_base_convert_by_2);
})


function saveInput(){
    var base64Input = document.getElementById("base64Input");
    var base64Data = base64Input.value.trim()
    saveToLocalStorage("convert_input",base64Data);
}



function base_calcute(){
  const base_type_in =  $('#numberSelect').val();
  const base_type_out =   $('#numberSelect2').val();
  const base_convert_input =   $('#convert_input').val();
  if (validateNumberFormat(base_convert_input,base_type_in) === false) {
    
    return $("#convert_output").val("输入数据不正确！");

  }
  // alert(validateNumberFormat(base_convert_input,base_type_in));
  // alert(base_in);
  // alert(base_convert_input);
  const result = convertNumber(base_convert_input, base_type_in, base_type_out);
  // alert(result);
  $("#convert_output").val(result);

}

function convertNumber(number, fromBase_string, toBase_string) {
  const fromBase = parseInt(fromBase_string);

  if (isNaN(fromBase)) {
    return NaN;
  }
  const toBase = parseInt(toBase_string);

  if (isNaN(toBase)) {
    return NaN;
  }
  var decimalNumber;
  // return number;
  // 将输入的数字从输入进制转换为十进制
  if (fromBase === 16){
    // 修复科学计数法
    decimalNumber = BigInt("0x"+number)
  }else{
     decimalNumber = parseint(number, fromBase);
  }

  // 将十进制数字转换为输出进制
  let convertedNumber;
  if (toBase === 2) {
    convertedNumber = decimalNumber.toString(2); // 转换为二进制
  } else if (toBase === 8) {
    convertedNumber = decimalNumber.toString(8); // 转换为八进制
  } else if (toBase === 10) {
    // function hexToDecimal(hex) {
      // alert(decimalNumber);
    // var decimal = new Big(decimalNumber).toString(10);
      // return decimal;
    // }
    convertedNumber = decimalNumber.toString(); // 转换为十进制
    // alert(convertedNumber);
  } else if (toBase === 16) {
    convertedNumber = decimalNumber.toString(16); // 转换为十六进制
  }

  return convertedNumber;
}

// 判断输入进制数是否正确
function validateNumberFormat(number, base_string) {
  const base = parseInt(base_string);

  if (isNaN(base)) {
    return NaN;
  }
  const numberRegex = {
    2: /^[01]+$/,         // 二进制
    8: /^[0-7]+$/,        // 八进制
    10: /^\d+$/,          // 十进制
    16: /^[0-9A-Fa-f]+$/  // 十六进制
  };

  if (numberRegex.hasOwnProperty(base)) {
    return numberRegex[base].test(number);
  }
  alert( (numberRegex.hasOwnProperty(base)) );
  return NaN;
}


$(document).ready(function() {
  // 监听单选框改变事件
  $('input[type="radio"][name="numberSystem"]').change(function() {
    const selectedValue = $(this).val();
    if (selectedValue === '2') {
      $('#numberSelect').val('2');
    } else if (selectedValue === '8') {
      $('#numberSelect').val('8');
    }else if (selectedValue === '10') {
      $('#numberSelect').val('10');
    }else if (selectedValue === '16') {
      $('#numberSelect').val('16');
    }
    base_calcute();
  });

  // 监听选择框改变事件
  $('#numberSelect').change(function() {
    const selectedValue = $(this).val();
    if (selectedValue === '2') {
      $('input[type="radio"][name="numberSystem"]').val(['2']);
    } else if (selectedValue === '8') {
      $('input[type="radio"][name="numberSystem"]').val(['8']);
    }else if (selectedValue === '10') {
      $('input[type="radio"][name="numberSystem"]').val(['10']);
    }else if (selectedValue === '16') {
      $('input[type="radio"][name="numberSystem"]').val(['16']);
    }
    base_calcute();
  });
});

$(document).ready(function() {
  // 监听进制输入框改变事件
  $("#convert_input").on("input", function () {
    // var inputData = $(this).val(); // 获取输入框的值
    // 执行你的函数，例如：
    // alert("hello world");
    base_calcute();
  });
  // $('#convert_input').change(base_calcute);
  // 监听单选框改变事件
  $('input[type="radio"][name="numberSystem2"]').change(function() {
    const selectedValue = $(this).val();
    if (selectedValue === '2') {
      $('#numberSelect2').val('2');
    } else if (selectedValue === '8') {
      $('#numberSelect2').val('8');
    }else if (selectedValue === '10') {
      $('#numberSelect2').val('10');
    }else if (selectedValue === '16') {
      $('#numberSelect2').val('16');
    }
    base_calcute();
  });

  // 监听选择框改变事件
  $('#numberSelect2').change(function() {
    const selectedValue = $(this).val();
    if (selectedValue === '2') {
      $('input[type="radio"][name="numberSystem2"]').val(['2']);
    } else if (selectedValue === '8') {
      $('input[type="radio"][name="numberSystem2"]').val(['8']);
    }else if (selectedValue === '10') {
      $('input[type="radio"][name="numberSystem2"]').val(['10']);
    }else if (selectedValue === '16') {
      $('input[type="radio"][name="numberSystem2"]').val(['16']);
    }
    base_calcute();
  });
});

