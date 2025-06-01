"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatsType = exports.version = void 0;
exports.version = {
    date: new Date("2024-11-07"),
};
var StatsType;
(function (StatsType) {
    StatsType["codec"] = "codec";
    StatsType["inboundRtp"] = "inbound-rtp";
    StatsType["outboundRtp"] = "outbound-rtp";
    StatsType["remoteInboundRtp"] = "remote-inbound-rtp";
    StatsType["remoteOutboundRtp"] = "remote-outbound-rtp";
    StatsType["mediaSource"] = "media-source";
    StatsType["mediaPlayout"] = "media-playout";
    StatsType["peerConnection"] = "peer-connection";
    StatsType["dataChannel"] = "data-channel";
    StatsType["transport"] = "transport";
    StatsType["candidatePair"] = "candidate-pair";
    StatsType["localCandidate"] = "local-candidate";
    StatsType["remoteCandidate"] = "remote-candidate";
    StatsType["certificate"] = "certificate";
    // Deprecated 2021
    // -----------------
    StatsType["stream"] = "stream";
    StatsType["track"] = "track";
    // Deprecated 2022-09-21
    // ----------------------
    StatsType["transceiver"] = "transceiver";
    StatsType["csrc"] = "csrc";
    StatsType["sender"] = "sender";
    StatsType["receiver"] = "receiver";
    StatsType["sctpTransport"] = "sctp-transport";
    StatsType["iceServer"] = "ice-server";
})(StatsType = exports.StatsType || (exports.StatsType = {}));
