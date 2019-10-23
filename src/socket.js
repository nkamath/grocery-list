let io;

module.exports = {
    // init must be called before emit in this module. 
    // init will generally be called when the app is launched. 
    init(server){
        io = require('socket.io').listen(server);
     },
     emit(event){
        // Emit the event to all connected clients 
         io.emit(event);
     }
};