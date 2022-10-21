var apiclient = (function(){
    return{
        addPlayer: function(newName){
            var player = JSON.stringify({nickname:newName});
            console.log(player)
            return new Promise((resolve) => {
                resolve($.ajax({
                    type:"POST",
                    url:'player/',
                    data:player,
                    contentType: "application/json"
                }))
            })
        }
    }

})();