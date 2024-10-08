class PacketParser {
  constructor(props) {
    this.logsEnabled = props.logsEnabled || false;
    this.messageLength = 0;
    this.messageType = '';
    this.messageLength = 0;
    this.partialMessage = '';
    this.onMessageRecieved = props.onMessageRecieved;
  }

  parseMessage(msgString) {
    while (msgString.length > 0) {
      if (this.messageLength === 0) {
        const delimit = msgString.indexOf('\n');
        if (delimit === -1) {
          console.log("[Sleeper] Message header not found, throwing out message.");
          return;
        }

        const header = msgString.substring(0, delimit);
        try {
          const headerObject = JSON.parse(header);
          this.messageType = headerObject.type;
          this.messageLength = headerObject.size;
        } catch (e) {
          console.log("[Sleeper] Message header malformed, throwing out message.");
          this.messageLength = 0;
          this.messageType = '';
          return;
        }

        msgString = msgString.substring(delimit + 1);
      }

      const partialLength = this.messageLength - this.partialMessage.length;
      if (partialLength < 0) {
        // We need to wait for more data
        this.partialMessage += msgString;
        return;
      }

      const remainingLength = msgString.length - partialLength;
      if (remainingLength === 0) {
        // We have the full message
        this.partialMessage += msgString;
        msgString = '';
        if (this.logsEnabled) console.log("[Sleeper] Message built.", this.partialMessage.length);
        
      } else {
        // We have more than the full message
        this.partialMessage += msgString.substring(0, partialLength);
        msgString = msgString.substring(partialLength);

        if (remainingLength <= 0) {
          // We have less than the full message
          if (this.logsEnabled) console.log("[Sleeper] Building message: ", this.partialMessage.length, this.messageLength, remainingLength);
          return;
        }
      }

      try {
        const json = JSON.parse(this.partialMessage);
        this.partialMessage = '';
        this.messageLength = 0;

        this.onMessageRecieved({
          type: this.messageType,
          data: json,
        });
      } catch (e) {
        console.log("[Sleeper] Failed to parse message: ", e);
        return;
      }
    }
  }

};

module.exports = PacketParser;
