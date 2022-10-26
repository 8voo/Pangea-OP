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

    addNation:function(nickname,nation){
      return new Promise((resolve) => {
        resolve($.ajax({
          type:"PUT",
          url: "../player/" + nickname + "/nations",
          data:nation,
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

    substractSoldiers:function(nickname, subsoldiers){
      var subSoldiers = JSON.stringify(subsoldiers);
      return new Promise((resolve) => {
        resolve($.ajax({
          type : "PUT",
          url : "../player/" + nickname + "/subsoldiers",
          data: subSoldiers,
          contentType : "application/json"
        }))
      })
    },

    setSoldiers:function(nation, newSoldiers){
      console.log("nation " + nation + " newSoldiers " + newSoldiers);
      var newSoldiers = JSON.stringify(newSoldiers);
      return new Promise((resolve) => {
        resolve($.ajax({
          type : "PUT",
          url : "../nation/" + nation + "/soldiers",
          data: newSoldiers,
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
    },

    getNationsByNickname: function(nickname){
      return JSON.parse($.ajax({
        type:'GET',
        url:"../player/" + nickname + "/nations",
        async:false
      }).responseText)
    }
    
  }  
})();