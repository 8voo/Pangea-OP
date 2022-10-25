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
          type:"PUT",
          url: "../nation/" + nation,
          data: color,
          contentType: "application/json"
        }))
      })
    },

    changeBlock:function(nation, block){
      console.log(nation.id);
      var boolean = JSON.stringify(block);
      return new Promise((resolve) => {
        resolve($.ajax({
          type:"PUT",
          url: "../nation/" + nation.id + "/block",
          data: boolean,
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
    },

    getNationById:function(id){
      return JSON.parse($.ajax({
        type:'GET',
        url: "../nation/" + id, 
        async:false
      }).responseText); 
    }
    
  }  
})();