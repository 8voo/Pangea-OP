var gameApiclient = (function(){
  return {
    addSoldier:function(nickname, quant){
        var quantity = JSON.stringify({quant});
            console.log(quantity)
            return new Promise((resolve) => {
                resolve($.ajax({
                    type:"PUT",
                    url: "../player/" + nickname + "/soldiers",
                    data:quantity,
                    contentType: "application/json"
                }))
            })
    },
    getSoldiers:function(nickname){
      return JSON.parse($.ajax({
        type:'GET',
        url: "../player/" + nickname + "/soldierQuantity", 
        async:false
      }).responseText); 
    },
    
  }  
})();