"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatsType = exports.version = void 0;
exports.version = {
    date: new Date("2021-11-10"),
};
var StatsType;
(function (StatsType) {
    StatsType["codec"] = "codec";
    StatsType["inboundRtp"] = "inbound-rtp";
    StatsType["outboundRtp"] = "outbound-rtp";
    StatsType["remoteInboundRtp"] = "remote-inbound-rtp";
    StatsType["remoteOutboundRtp"] = "remote-outbound-rtp";
    StatsType["mediaSource"] = "media-source";
    StatsType["csrc"] = "csrc";
    StatsType["peerConnection"] = "peer-connection";
    StatsType["dataChannel"] = "data-channel";
    StatsType["stream"] = "stream";
    StatsType["track"] = "track";
    StatsType["transceiver"] = "transceiver";
    StatsType["sender"] = "sender";
    StatsType["receiver"] = "receiver";
    StatsType["transport"] = "transport";
    StatsType["sctpTransport"] = "sctp-transport";
    StatsType["candidatePair"] = "candidate-pair";
    StatsType["localCandidate"] = "local-candidate";
    StatsType["remoteCandidate"] = "remote-candidate";
    StatsType["certificate"] = "certificate";
    StatsType["iceServer"] = "ice-server";
})(StatsType = exports.StatsType || (exports.StatsType = {}));
;
