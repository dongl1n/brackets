function getDublicate(bracketsConfig){
  let arr=[];
  for(key in bracketsConfig) 
  if(bracketsConfig[key][0]===bracketsConfig[key][1])  arr.push(bracketsConfig[key][0]);
  return arr;
}
 
function getArrOpen(bracketsConfig){
  let arr=[];
  for(key in bracketsConfig) arr.push(bracketsConfig[key][0]);
  return arr;
}

function getArrClose(bracketsConfig){
  let arr=[];
  for(key in bracketsConfig) arr.push(bracketsConfig[key][1]);
  return arr;
}
 
module.exports = function check(str, bracketsConfig) {
  let arrOpen = getArrOpen(bracketsConfig);
  let arrClose = getArrClose(bracketsConfig);
  let arrDublicate=getDublicate(bracketsConfig);
  let isFirst=0;
  let stack = [];
  for(let i=0; i<str.length; i++){
    if(arrDublicate.length && arrDublicate.includes(str[i])){
      isFirst=!isFirst;
      if(str[i]===str[i+1]){ i++; continue; }
      else{
        if(isFirst){stack.push(str[i]); continue;}
        else if(str[i]===stack[stack.length-1]){stack.pop(); continue;}
        if(!stack.length) return true;
      }
    }
    
    if(arrOpen.includes(str[i])) stack.push(str[i]);
    else{
      for(let j=0; j<arrClose.length; j++){
        if(arrDublicate.length && !isFirst && str[i]===str[i-1]){stack.pop(); continue;}
        if(str[i]===arrClose[j])
         if(arrOpen[j]!==stack.pop()) return false;
      }
    }
  }
  return stack.length===0;
}
