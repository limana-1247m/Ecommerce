import { v4 as uuidv4 } from "uuid";

class Produto {
  constructor(title, description, value) {
    (this.id = uuidv4()),
      (this.title = title),
      (this.description = description),
      (this.value = value);
  }
}

export default Produto;