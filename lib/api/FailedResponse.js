import Response from './response';

class FailedResponse extends Response {

  constructor(message) {
    super(false)
    this.message = message;
  }
}

export default FailedResponse;