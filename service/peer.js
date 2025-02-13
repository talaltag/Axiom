import { useEffect, useState } from "react";

class PeerService {
  constructor() {
    this.peer = null;
  }

  async initPeer() {
    if (typeof window !== "undefined" && !this.peer) {
      this.peer = new RTCPeerConnection({
        iceServers: [
          {
            urls: [
              "stun:stun.l.google.com:19302",
              "stun:global.stun.twilio.com:3478",
            ],
          },
        ],
      });
    }
  }

  async getAnswer(offer) {
    if (this.peer) {
      try {
        await this.peer.setRemoteDescription(new RTCSessionDescription(offer));
        const answer = await this.peer.createAnswer();
        await this.peer.setLocalDescription(answer);
        return answer;
      } catch (error) {
        console.error("Error creating answer:", error);
        throw error;
      }
    }
  }

  async setLocalDescription(ans) {
    if (this.peer) {
      try {
        if (this.peer.signalingState === "stable" || this.peer.signalingState === "have-local-offer") {
          await this.peer.setRemoteDescription(new RTCSessionDescription(ans));
        }
      } catch (error) {
        console.error("Error setting remote description:", error);
        throw error;
      }
    }
  }

  async getOffer() {
    if (this.peer) {
      const offer = await this.peer.createOffer();
      await this.peer.setLocalDescription(new RTCSessionDescription(offer));
      return offer;
    }
  }
}

const peerService = new PeerService();

export default function usePeerService() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      await peerService.initPeer();
      setIsReady(true);
    };

    init();
  }, []);

  return isReady ? peerService : null;
}
