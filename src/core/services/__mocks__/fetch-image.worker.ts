export class FetchImageWorker {
  public async handle(url: string) {
    return new Promise( (resolve, rejectionFunc) => {
        resolve(url);
    });
  }
}
