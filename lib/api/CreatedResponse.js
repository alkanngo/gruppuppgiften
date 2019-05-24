import Response from './response';

class CreatedResponse extends Response {
  constructor(id, message) {
    super(true)
    this.id = id;
    this.message = message;
  }
}

export default CreatedResponse;