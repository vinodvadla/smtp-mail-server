const SMTPServer = require("smtp-server").SMTPServer;
const server = new SMTPServer({
  allowInsecureAuth: true,
  authOptional: true,
  onConnect(session, cb) {
    console.log("session", session.id);
    cb();
  },
  onMailFrom(address, session, cb) {
    console.log("mailFrom", address.address);
    console.log("session", session.id);
    cb();
  },

  onRcptTo(address, session, cb) {
    console.log("rcptTo", address.address);
    console.log("session", session.id);
    cb();
  },
  onData(stream, session, cb) {
    console.log("session", session.id);
    // stream.pipe(process.stdout);
    stream.on("data", (data) => {
      console.log(data.toString());
      stream.on("end", () => {
        console.log("stream end");
        cb();
      });
    });
    cb();
  },
});

server.listen(25, () => {
  console.log("SMTP Server listening on port 25");
});
