var gameApiclient = (function(){
  return {
    addSoldier:function(nickname, quant){
        var player = JSON.stringify({nickname:newName});
            console.log(player)
            return new Promise((resolve) => {
                resolve($.ajax({
                    type:"POST",
                    url: nickname + "/soldiers",
                    data:quant,
                    contentType: "application/json"
                }))
            })
    }
  }  
})