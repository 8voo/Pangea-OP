var gameApiclient = (function(){
  return {
    addSoldier:function(nickname, quant){
        var quantity = JSON.stringify({quant});
            return new Promise((resolve) => {
                resolve($.ajax({
                    type:"PUT",
                    url: "../player/" + nickname + "/soldiers",
                    data:quantity,
                    contentType: "application/json"
                }))
            })
    },

    changeColor:function(nation, color){
      return new Promise((resolve) => {
        resolve($.ajax({
          type:"PUt",
          url: "../nation/" + nation,
          data: color,
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

    getNations:function(){
      return JSON.parse($.ajax({
        type:'GET',
        url: "../nation", 
        async:false
      }).responseText); 
    }
    
  }  
})();