import Response from './response';

class DataResponse extends Response {

  constructor(data) {
    super(true)
    this.data = data;
  }
}

export default DataResponse;