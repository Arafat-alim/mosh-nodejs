//callback approach
getCustomer(id, callback){
    setTimeout(() => {
        callback({id: id, name: "Arafat", isGold: yes})
    }, 2000);
}