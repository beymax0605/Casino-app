export class FetchImageWorker {
  public async handle(url: string) {
    const worker = FetchImageWorker.initiateWorker();
    const workerUrl =  await this.getImageUrl(worker, url)
    worker.terminate();
    return workerUrl;
  }

  private static initiateWorker() {
      const blob = new Blob([`(${fetchImage.toString()})()`], {type: 'text/javascript'});
      let blobUrl = URL.createObjectURL(blob);
      return new Worker(blobUrl);
  }

  private getImageUrl(worker: Worker, url: string): Promise<string> {
    return new Promise( (resolve, rejectionFunc) => {
      worker.onmessage = (event) => {
        resolve(URL.createObjectURL(event.data));
      };
      worker.postMessage(url);
    });
  }
}

function fetchImage() {
  /* eslint-disable-next-line no-restricted-globals */
  addEventListener("message", (event) => {
    fetch(event.data)
      .then(r => r.blob())
      .then(data => {
        // @ts-ignore
        postMessage(data);
      });
  });
}
