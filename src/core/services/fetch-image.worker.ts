export class FetchImageWorker {
  private static worker: Worker;
  public handle(url: string): Promise<MessageEvent> {
    const worker = FetchImageWorker.initiateWorker();
    const channel = new MessageChannel();
    worker.postMessage(url, [channel.port1]);
    return new Promise((res, rej)=>{
      channel.port2.onmessage=res;
    });
  }

  private static initiateWorker() {
    if(!FetchImageWorker.worker) {
      const blob = new Blob([`(${fetchImage.toString()})()`], {type: 'text/javascript'});
      let blobUrl = URL.createObjectURL(blob);
      FetchImageWorker.worker = new Worker(blobUrl);
    }
    return FetchImageWorker.worker;
  }
}

function fetchImage() {
  /* eslint-disable-next-line no-restricted-globals */
  addEventListener("message", (e) => {
   const port = e.ports[0]; // this is where we will respond
    fetch(e.data)
      .then(r => r.blob())
      .then(data => {
        port.postMessage(data);
      });
  });
}
